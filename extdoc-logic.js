// This is extdoc-logic.js
// เก็บฟังก์ชันการทำงานหลักทั้งหมดของโมดูล Ext Doc

// --- ตัวแปรสำหรับ Lightbox Album ---
let currentGallery = [];
let currentIndex = 0;

// --- ฟังก์ชันสำหรับตาราง (Table Functions) ---

function formatDateTime(date) {
    const d = String(date.getDate()).padStart(2, '0');
    const m = monthNames[date.getMonth()]; // (monthNames มาจาก extdoc-data.js)
    const y = date.getFullYear();
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${d} ${m} ${y} ${h}:${min}`; 
}

function renderTable(data) {
    const extDocTbody = document.getElementById("ext-doc-tbody");
    if (!extDocTbody) return;

    let newRowsHTML = "";
    data.forEach(item => {
        const statusHTML = item.status === "Disable" 
            ? `<span class="bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">Disable</span>`
            : "";

        let dateTimeLink = "";
        if (item.images && item.images.length > 0) {
            // เราจะใช้ JSON.stringify ใน data-gallery เพื่อเก็บ Array ของรูปภาพ
            const galleryJson = JSON.stringify(item.images);
            dateTimeLink = `<a href="#" class="text-blue-600 dark:text-[--color-primary-500] hover:underline open-album-link" data-gallery='${galleryJson}'>${item.datetimeStr}</a>`;
        } else {
            dateTimeLink = `<span class="text-gray-900 dark:text-[--color-text-base]">${item.datetimeStr}</span>`;
        }

        newRowsHTML += `
            <tr class="hover:bg-gray-50 dark:hover:bg-[var(--color-bg-secondary)]">
                <td class="p-3 sticky-col">${dateTimeLink}</td>
                <td class="p-3">${item.docType}</td>
                <td class="p-3"><a href="#" class="text-gray-900 dark:text-[--color-text-base] hover:underline">${item.img}</a></td>
                <td class="p-3"><a href="#" class="text-gray-900 dark:text-[--color-text-base] hover:underline">${item.pdf}</a></td>
                <td class="p-3"><a href="#" class="text-gray-900 dark:text-[--color-text-base] hover:underline">${item.note}</a></td>
                <td class="p-3">${item.dvm}</td>
                <td class="p-3">${item.department}</td>
                <td class="p-3">User สิทธิ์</td>
                <td class="p-3">${item.datetimeStr}</td> <td class="p-3">${item.datetimeStr}</td> <td class="p-3">User สิทธิ์</td>
                <td class="p-3">${statusHTML}</td>
                <td class="p-3">
                    <button class="text-gray-500 hover:text-gray-700 dark:text-[--color-text-muted] dark:hover:text-[--color-text-base]"><i data-lucide="more-vertical" class="w-4 h-4"></i></button>
                </td>
            </tr>
        `;
    });
    extDocTbody.innerHTML = newRowsHTML;
}

function sortData(tableData, column, direction) {
    tableData.sort((a, b) => {
        let valA = a[column];
        let valB = b[column];
        
        let comparison = 0;
        if (valA > valB) {
            comparison = 1;
        } else if (valA < valB) {
            comparison = -1;
        }
        return direction === 'asc' ? comparison : comparison * -1;
    });
}

function updateSortUI(activeHeader) {
    const extDocTable = document.getElementById("ext-doc-table");
    if (!extDocTable) return;

    const allHeaders = extDocTable.querySelectorAll('th[data-sort]');
    allHeaders.forEach(header => {
        header.classList.remove('sort-active');
        const icon = header.querySelector('.sort-icon');
        if (icon) icon.setAttribute('data-lucide', 'arrow-up-down'); // Reset icon
    });
    activeHeader.classList.add('sort-active');
    const activeIcon = activeHeader.querySelector('.sort-icon');
    if (activeIcon) {
        activeIcon.setAttribute('data-lucide', activeHeader.dataset.direction === 'asc' ? 'arrow-up' : 'arrow-down');
    }
    lucide.createIcons(); // Re-render icons
}


// --- ฟังก์ชันสำหรับ Lightbox Album (จาก Extdoc_Module_Date_Default.html) ---

function showImage(index) {
    const lightboxImage = document.getElementById('lightbox-album-image');
    const counterText = document.getElementById('lightbox-album-counter');
    const prevBtn = document.getElementById('lightbox-album-prev');
    const nextBtn = document.getElementById('lightbox-album-next');

    if (!currentGallery || currentGallery.length === 0 || !lightboxImage || !counterText || !prevBtn || !nextBtn) return;
    
    currentIndex = (index + currentGallery.length) % currentGallery.length;
    lightboxImage.src = currentGallery[currentIndex];
    counterText.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    
    prevBtn.disabled = currentGallery.length <= 1;
    nextBtn.disabled = currentGallery.length <= 1;
}

function openLightbox(galleryData) {
    const lightboxModal = document.getElementById('lightbox-album-modal');
    if (!lightboxModal) return;

    try {
        currentGallery = JSON.parse(galleryData);
        if (currentGallery && currentGallery.length > 0) {
            currentIndex = 0;
            showImage(currentIndex);
            lightboxModal.classList.remove('hidden');
        }
    } catch (e) {
        console.error("Invalid gallery data:", galleryData, e);
    }
}

function closeLightbox() {
    const lightboxModal = document.getElementById('lightbox-album-modal');
    const lightboxImage = document.getElementById('lightbox-album-image');
    if (!lightboxModal || !lightboxImage) return;

    lightboxModal.classList.add('hidden');
    currentGallery = [];
    lightboxImage.src = "https://placehold.co/800x600/000000/ffffff?text=Loading..."; 
}


// --- ฟังก์ชันสำหรับ Filter (จาก Extdoc_Module_Filter.html) ---

function styleExtDocDropdowns() {
    // หา Dropdowns ที่อยู่ใน #ext-doc-sub-content เท่านั้น
    const dropdowns = document.querySelectorAll('#ext-doc-sub-content select[required]');
    dropdowns.forEach(select => {
        if (select.value === "") {
            select.classList.add('text-gray-500');
            select.classList.add('dark:text-[--color-text-muted]');
        } else {
            select.classList.remove('text-gray-500');
            select.classList.remove('dark:text-[--color-text-muted]');
        }
        
        // (เราจะผูก Event ใน extdoc-init.js)
    });
}

function clearExtDocFilters() {
    const docTypeSelect = document.getElementById('doc-type-select');
    const dvmSelect = document.getElementById('dvm-select');
    const deptSelect = document.getElementById('dept-select');

    const selectsToClear = [docTypeSelect, dvmSelect, deptSelect];

    selectsToClear.forEach(select => {
        if (select) {
            select.value = ""; // Reset to default "Select..."
            // Manually trigger visual update
            select.classList.add('text-gray-500');
            select.classList.add('dark:text-[--color-text-muted]');
        }
    });
    
    // (หมายเหตุ: ในไฟล์ต้นฉบับ Extdoc_Module_Filter.html มี Logic พิเศษที่ตั้งค่า docTypeSelect เป็น "1"
    // เราจะย้าย Logic นั้นไปไว้ใน extdoc-init.js เพื่อให้มันทำงานเมื่อปุ่มถูกคลิก)
}