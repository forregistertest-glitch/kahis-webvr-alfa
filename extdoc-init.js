// This is extdoc-init.js
// ทำหน้าที่ "เริ่มต้นการทำงาน" (Initialize) ของโมดูล Ext Doc

// --- 1. ฟังก์ชันสำหรับโหลดเนื้อหาแท็บย่อย (Date/Filter) ---

async function loadExtDocSubTab(tabHtmlFile) {
    const contentPlaceholder = document.getElementById('ext-doc-sub-content');
    if (!contentPlaceholder) return;

    // โหลด HTML ของแท็บย่อย (เช่น extdoc_tab_date.html)
    try {
        const response = await fetch(tabHtmlFile);
        if (!response.ok) throw new Error(`Could not fetch ${tabHtmlFile}`);
        contentPlaceholder.innerHTML = await response.text();
    } catch (error) {
        console.error("Error loading sub-tab:", error);
        contentPlaceholder.innerHTML = `<p class="p-4 text-red-600">Error loading content: ${tabHtmlFile}</p>`;
        return;
    }

    // --- 2. หลังจากโหลด HTML แล้ว ให้เรียกใช้ Logic ที่ถูกต้อง ---
    
    // (เรียกใช้ฟังก์ชันจาก extdoc-logic.js)
    
    // สร้างข้อมูลดิบ (ใช้สำหรับทั้งสองแท็บ)
    let tableData = [];
    // (baseData, startDate, formatDateTime มาจาก extdoc-data.js และ extdoc-logic.js)
    
    // ตั้งค่าตัวแปรตาราง
    const extDocTable = document.getElementById("ext-doc-table");
    let currentSort = { column: 'datetime', direction: 'desc' };

    // 2a. ถ้าเป็นแท็บ "By Date"
    if (tabHtmlFile === 'extdoc_tab_date.html') {
        // สร้างข้อมูล 50 แถว (จาก Logic ของ Extdoc_Module_Date_Default.html)
        for (let i = 0; i < 50; i++) {
            let currentDate = new Date(startDate.getTime());
            const timeOffsetInMinutes = i * 15;
            const dayOffset = Math.floor(i / 5) * 3;
            const monthOffset = Math.floor(i / 10) * 1;
            currentDate.setMonth(currentDate.getMonth() - monthOffset);
            currentDate.setDate(currentDate.getDate() - dayOffset);
            currentDate.setMinutes(currentDate.getMinutes() - timeOffsetInMinutes);
            
            const data = baseData[i % 10]; // (baseData มาจาก extdoc-data.js)
            tableData.push({
                ...data,
                datetime: currentDate,
                datetimeStr: formatDateTime(currentDate) 
            });
        }
    } 
    // 2b. ถ้าเป็นแท็บ "By Filter"
    else if (tabHtmlFile === 'extdoc_tab_filter.html') {
        // สร้างข้อมูล 20 แถว (จาก Logic ของ Extdoc_Module_Filter.html)
        for (let i = 0; i < 20; i++) {
            let currentDate = new Date(startDate.getTime());
            const timeOffsetInMinutes = i * 15;
            const dayOffset = Math.floor(i / 5) * 3;
            const monthOffset = Math.floor(i / 10) * 1;
            currentDate.setMonth(currentDate.getMonth() - monthOffset);
            currentDate.setDate(currentDate.getDate() - dayOffset);
            currentDate.setMinutes(currentDate.getMinutes() - timeOffsetInMinutes);
            
            const data = baseData[i % 10]; // (baseData มาจาก extdoc-data.js)
            tableData.push({
                ...data,
                datetime: currentDate,
                datetimeStr: formatDateTime(currentDate)
            });
        }
        
        // --- ผูก Event ของ Filter ---
        // (Logic จาก Extdoc_Module_Filter.html)
        styleExtDocDropdowns(); // เรียกใช้จาก extdoc-logic.js
        
        const dropdowns = document.querySelectorAll('#ext-doc-sub-content select[required]');
        dropdowns.forEach(select => {
            select.addEventListener('change', (e) => {
                if (e.target.value === "") {
                    e.target.classList.add('text-gray-500');
                    e.target.classList.add('dark:text-[--color-text-muted]');
                } else {
                    e.target.classList.remove('text-gray-500');
                    e.target.classList.remove('dark:text-[--color-text-muted]');
                }
            });
        });

        const clearButton = document.getElementById('clear-filters-btn');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                clearExtDocFilters(); // เรียกใช้จาก extdoc-logic.js
                
                // Logic พิเศษที่อยู่ใน Extdoc_Module_Filter.html
                const docTypeSelect = document.getElementById('doc-type-select');
                if(docTypeSelect) {
                    docTypeSelect.value = "1"; 
                     docTypeSelect.classList.remove('text-gray-500');
                     docTypeSelect.classList.remove('dark:text-[--color-text-muted]');
                }
            });
        }
    }
    
    // --- (ใหม่) ผูก Event ให้ปุ่ม "New Ext Doc" ---
    const newDocButton = document.getElementById('btn-goto-addnew');
    if (newDocButton) {
        newDocButton.addEventListener('click', () => {
            loadModuleContent('extdoc_page_addnew.html'); // (เรียกฟังก์ชันหลักจาก app-logic.js)
        });
    }

    // --- 3. ผูก Event ให้ตาราง (ใช้ร่วมกันทั้งสองแท็บ) ---
    if (extDocTable) {
        const sortHeaders = extDocTable.querySelectorAll('th[data-sort]');
        sortHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const sortColumn = header.dataset.sort;
                if (currentSort.column === sortColumn) {
                    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    currentSort.column = sortColumn;
                    currentSort.direction = sortColumn === 'datetime' ? 'desc' : 'asc';
                }
                header.dataset.direction = currentSort.direction; // เก็บ state ไว้ใน header
                
                sortData(tableData, currentSort.column, currentSort.direction); // (จาก extdoc-logic.js)
                renderTable(tableData); // (จาก extdoc-logic.js)
                updateSortUI(header); // (จาก extdoc-logic.js)
            });
        });

        // ผูก Event ให้ลิงก์ในตาราง (สำหรับเปิด Lightbox)
        const extDocTbody = document.getElementById("ext-doc-tbody");
        if (extDocTbody) {
            extDocTbody.addEventListener('click', (e) => {
                const link = e.target.closest('a.open-album-link');
                if (link) {
                    e.preventDefault(); 
                    const galleryData = link.getAttribute('data-gallery');
                    openLightbox(galleryData); // (จาก extdoc-logic.js)
                }
            });
        }

        // Render ตารางครั้งแรก
        sortData(tableData, currentSort.column, currentSort.direction);
        renderTable(tableData);
        updateSortUI(extDocTable.querySelector('th[data-sort="datetime"]'));
    }
    
    // --- 4. เรียก Lucide ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}


// --- 5. ฟังก์ชัน "ตัวเริ่มต้นหลัก" ของ Ext Doc ---
// (ฟังก์ชันนี้จะถูกเรียกโดย app-logic.js)

function initializeExtDocScripts() {
    
    // --- 5a. ผูก Event ให้แท็บย่อย (By Date / By Filter) ---
    const tabDate = document.getElementById('extdoc-tab-date');
    const tabFilter = document.getElementById('extdoc-tab-filter');

    if (tabDate) {
        tabDate.addEventListener('click', (e) => {
            e.preventDefault();
            // สลับ Active Class
            tabDate.className = "py-3 px-4 text-sm font-semibold text-blue-600 dark:text-[--color-primary-500] border-b-2 border-blue-600 dark:border-[--color-primary-500]";
            tabFilter.className = "py-3 px-4 text-sm font-medium text-gray-500 dark:text-[--color-text-muted] hover:text-gray-700 dark:hover:text-[--color-text-base]";
            // โหลดเนื้อหาแท็บ
            loadExtDocSubTab('extdoc_tab_date.html');
        });
    }

    if (tabFilter) {
        tabFilter.addEventListener('click', (e) => {
            e.preventDefault();
            // สลับ Active Class
            tabFilter.className = "py-3 px-4 text-sm font-semibold text-blue-600 dark:text-[--color-primary-500] border-b-2 border-blue-600 dark:border-[--color-primary-500]";
            tabDate.className = "py-3 px-4 text-sm font-medium text-gray-500 dark:text-[--color-text-muted] hover:text-gray-700 dark:hover:text-[--color-text-base]";
            // โหลดเนื้อหาแท็บ
            loadExtDocSubTab('extdoc_tab_filter.html');
        });
    }

    // --- 5b. ผูก Event ให้ Lightbox Album (ที่อยู่ใน index.html) ---
    // (Logic นี้ดึงมาจาก Extdoc_Module_Date_Default.html)
    const lightboxModal = document.getElementById('lightbox-album-modal');
    const closeBtn = document.getElementById('lightbox-album-close');
    const prevBtn = document.getElementById('lightbox-album-prev');
    const nextBtn = document.getElementById('lightbox-album-next');
    
    if (lightboxModal) {
        closeBtn.addEventListener('click', closeLightbox); // (จาก extdoc-logic.js)
        
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox(); // (จาก extdoc-logic.js)
            }
        });
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex - 1); // (จาก extdoc-logic.js)
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showImage(currentIndex + 1); // (จาก extdoc-logic.js)
        });
    }

    // --- 5c. โหลดแท็บเริ่มต้น (By Date) ---
    loadExtDocSubTab('extdoc_tab_date.html');
}