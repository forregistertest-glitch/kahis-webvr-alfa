// This is app-init.js
// It contains all the logic formerly inside app.js's DOMContentLoaded listener

function initializeApp() {
    
    // +++ START: EMR Tab Loading Logic (NEW) +++
    initializeTabSwitching();
    
    // Load the initial content (Assessment)
    const activeTab = document.querySelector('.emr-tab.tab-active');
    const initialContent = activeTab ? activeTab.dataset.target : 'assessment_content.html';
    loadModuleContent(initialContent || 'assessment_content.html');
    // +++ END: EMR Tab Loading Logic (NEW) +++
    
    // --- Dark Mode ---
    const toggle = document.getElementById('darkmode-toggle');
    const htmlRoot = document.documentElement; 
    const preference = localStorage.getItem('theme');

    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlRoot.classList.add('dark'); 
            if(toggle) toggle.checked = true;
        } else {
            htmlRoot.classList.remove('dark'); 
            if(toggle) toggle.checked = false;
        }
    }
    applyTheme(preference);
    if (toggle) {
        toggle.addEventListener('change', () => {
            const newTheme = toggle.checked ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- Modal: DF ---
    const openButton = document.getElementById('open-df-popup');
    const modal = document.getElementById('df-popup-modal');
    const closeButtonX = document.getElementById('df-popup-close-x');
    const cancelButton = document.getElementById('df-popup-cancel');
    const showPopup = () => { if (modal) modal.classList.remove('hidden'); };
    const hidePopup = () => { if (modal) modal.classList.add('hidden'); };
    if (openButton) openButton.addEventListener('click', showPopup);
    if (closeButtonX) closeButtonX.addEventListener('click', hidePopup);
    if (cancelButton) cancelButton.addEventListener('click', hidePopup);
    if (modal) { modal.addEventListener('click', (event) => { if (event.target === modal) hidePopup(); }); }

    // --- Modal: TF ---
    const openButtonTF = document.getElementById('open-tf-popup');
    const modalTF = document.getElementById('tf-popup-modal');
    const closeButtonXTF = document.getElementById('tf-popup-close-x');
    const cancelButtonTF = document.getElementById('tf-popup-cancel');
    const showPopupTF = () => { if (modalTF) modalTF.classList.remove('hidden'); };
    const hidePopupTF = () => { if (modalTF) modalTF.classList.add('hidden'); };
    if (openButtonTF) openButtonTF.addEventListener('click', showPopupTF);
    if (closeButtonXTF) closeButtonXTF.addEventListener('click', hidePopupTF);
    if (cancelButtonTF) cancelButtonTF.addEventListener('click', hidePopupTF);
    if (modalTF) { modalTF.addEventListener('click', (event) => { if (event.target === modalTF) hidePopupTF(); }); }

    // --- Modal: Vital Signs ---
    const openVitalsButton = document.getElementById('open-vitals-popup');
    const vitalsModal = document.getElementById('vitals-popup-modal');
    const closeVitalsX = document.getElementById('close-vitals-popup-x');
    const closeVitalsCancel = document.getElementById('close-vitals-popup-cancel');
    const vitalsTabLinks = vitalsModal.querySelectorAll('.vitals-tab-link');
    const vitalsTabContents = vitalsModal.querySelectorAll('.vitals-tab-content');

    const showVitalsPopup = () => { 
        if (vitalsModal) vitalsModal.classList.remove('hidden'); 
        if (typeof lucide !== 'undefined') {
            lucide.createIcons(); 
        }
        // Load history data on open
        renderVsHistoryTable(vsHistoryData);
    };
    const hideVitalsPopup = () => { if (vitalsModal) vitalsModal.classList.add('hidden'); };

    if (openVitalsButton) openVitalsButton.addEventListener('click', showVitalsPopup);
    if (closeVitalsX) closeVitalsX.addEventListener('click', hideVitalsPopup);
    if (closeVitalsCancel) closeVitalsCancel.addEventListener('click', hideVitalsPopup);
    if (vitalsModal) { 
        vitalsModal.addEventListener('click', (event) => { 
            if (event.target === vitalsModal) hideVitalsPopup(); 
        }); 
    }
    
    // --- Modal: Eye Exam (NEW) ---
    const openEyeButton = document.getElementById('open-eye-popup');
    const eyeModal = document.getElementById('eye-exam-modal');
    const closeEyeX = document.getElementById('close-eye-popup-x');
    const closeEyeCancel = document.getElementById('close-eye-popup-cancel');
    const eyeTabLinks = eyeModal.querySelectorAll('.eye-tab-link');
    const eyeTabContents = eyeModal.querySelectorAll('.eye-tab-content');
    const openDrawingBtn = document.getElementById('open-drawing-tool'); // <-- Find the single button

    const showEyePopup = () => { 
        if (eyeModal) eyeModal.classList.remove('hidden'); 
        renderEyeExamHistoryTable(eyeExamHistoryData); // โหลดข้อมูล History เมื่อเปิด
        if (typeof lucide !== 'undefined') {
            lucide.createIcons(); 
        }
    };
    const hideEyePopup = () => { if (eyeModal) eyeModal.classList.add('hidden'); };
    
    if (openEyeButton) openEyeButton.addEventListener('click', showEyePopup);
    if (closeEyeX) closeEyeX.addEventListener('click', hideEyePopup);
    if (closeEyeCancel) closeEyeCancel.addEventListener('click', hideEyePopup);
    
    // --- Modal: Drawing Demo (NEW) ---
    const drawingModal = document.getElementById('drawing-demo-modal');
    const closeDrawingX = document.getElementById('close-drawing-demo-x');
    const cancelDrawingBtn = document.getElementById('drawing-demo-cancel');
    const saveDrawingBtn = document.getElementById('drawing-demo-save');
    const drawingResultImg = document.getElementById('drawing-result-image');
    
    const showDrawingPopup = () => {
        if (drawingModal) drawingModal.classList.remove('hidden');
        // Load local file 'eyeexam.png'
        initializeDrawingDemo('eyeexam.png'); 
        if (typeof lucide !== 'undefined') {
            lucide.createIcons(); // Render icons in drawing modal
        }
    }
    const hideDrawingPopup = () => { if (drawingModal) drawingModal.classList.add('hidden'); }

    if (openDrawingBtn) openDrawingBtn.addEventListener('click', showDrawingPopup);
    if (closeDrawingX) closeDrawingX.addEventListener('click', hideDrawingPopup);
    if (cancelDrawingBtn) cancelDrawingBtn.addEventListener('click', hideDrawingPopup);
    
    // "Fake Save" logic
    if (saveDrawingBtn) {
        saveDrawingBtn.addEventListener('click', () => {
            if (fabricCanvas) {
                const dataURL = fabricCanvas.toDataURL({ format: 'png', quality: 0.8 });
                drawingResultImg.src = dataURL;
                hideDrawingPopup(); // ซ่อนหน้าต่างวาดภาพ
            }
        });
    }

    // --- Modal: Image Viewer (NEW) ---
    const imageViewerModal = document.getElementById('image-viewer-modal');
    const closeImageViewerX = document.getElementById('close-image-viewer-x');
    const fullImageViewerSrc = document.getElementById('full-image-viewer-src');
    const eyeHistoryTableBody = document.getElementById('eyeHistoryTableBody');

    const hideImageViewer = () => { if (imageViewerModal) imageViewerModal.classList.add('hidden'); };
    
    if (eyeHistoryTableBody) {
        eyeHistoryTableBody.addEventListener('click', function(event) {
            // เช็คว่ากดที่รูป thumbnail (ที่มี class 'history-thumbnail')
            if (event.target.classList.contains('history-thumbnail')) {
                fullImageViewerSrc.src = event.target.dataset.fullSrc; // ใช้ data-full-src
                imageViewerModal.classList.remove('hidden'); // แสดง modal
            }
        });
    }
    if (closeImageViewerX) closeImageViewerX.addEventListener('click', hideImageViewer);
    if (imageViewerModal) imageViewerModal.addEventListener('click', (event) => {
        if (event.target === imageViewerModal) hideImageViewer(); // ปิดเมื่อคลิกพื้นหลัง
    });

    // --- (NEW) Numpad Modal Logic ---
    const numpadModal = document.getElementById('numpad-modal');
    const numpadTargetInput = document.getElementById('numpad-target-id');
    const numpadInputs = document.querySelectorAll('input[data-numpad="true"]');

    numpadInputs.forEach(input => {
        input.addEventListener('click', (e) => {
            numpadTargetInput.value = e.target.id; // เก็บ id ของ input ที่ถูกคลิก
            numpadModal.classList.remove('hidden');
        });
    });

    if (numpadModal) {
        numpadModal.addEventListener('click', (e) => {
            const target = e.target.closest('.numpad-btn'); // หปุ่มที่ถูกคลิก
            if (!target) {
                 // ถ้าคลิกนอกปุ่ม (แต่ยังอยู่ใน modal) ไม่ต้องทำอะไร
                 if (e.target === numpadModal) {
                     // คลิกพื้นหลัง modal (ซ่อน)
                     numpadModal.classList.add('hidden');
                 }
                 return;
            }

            const value = target.dataset.value;
            const targetInput = document.getElementById(numpadTargetInput.value);
            if (!targetInput) return;

            switch(value) {
                case 'close':
                    numpadModal.classList.add('hidden');
                    break;
                case 'clear':
                    targetInput.value = '';
                    break;
                case 'backspace':
                    targetInput.value = targetInput.value.slice(0, -1);
                    break;
                case '.':
                    if (!targetInput.value.includes('.')) {
                        targetInput.value += value;
                    }
                    break;
                default: // 0-9
                    targetInput.value += value;
                    break;
            }
        });
    }

    // --- Tab Switching Logic (Vital Signs) ---
    vitalsTabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.dataset.tab; // e.g. "vitals-history"
            vitalsTabLinks.forEach(tab => {
                tab.classList.remove('tab-active');
                tab.classList.add('tab-inactive');
            });
            link.classList.remove('tab-inactive');
            link.classList.add('tab-active');
            vitalsTabContents.forEach(content => {
                content.classList.add('hidden');
            });
            vitalsModal.querySelector(`#content-${tabId}`).classList.remove('hidden');
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
// --- Tab Switching Logic (Eye Exam) (NEW) ---
    eyeTabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.dataset.tab; // e.g., "eye-history"
            eyeTabLinks.forEach(tab => {
                tab.classList.remove('tab-active');
                tab.classList.add('tab-inactive');
            });
            link.classList.remove('tab-inactive');
            link.classList.add('tab-active');
            eyeTabContents.forEach(content => {
                content.classList.add('hidden');
            });
            eyeModal.querySelector(`#content-${tabId}`).classList.remove('hidden');
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });

    // --- Problem List Modal (Tagging Section) ---
    // (ย้าย Logic เข้ามาใน DOMContentLoaded เพราะ Element อยู่ใน index.html)
    const categoryList = document.getElementById('category-list');
    const categoryItems = categoryList ? categoryList.querySelectorAll('li[data-category-id]') : [];
    const resultTableBody = document.getElementById('result-table-body');
    const resultHeader = document.getElementById('result-header'); 

    function updateSelectedCount() {
        if (!resultTableBody || !resultHeader) return;
        const selectedCount = resultTableBody.querySelectorAll('input[type="checkbox"]:checked').length;
        resultHeader.textContent = `Result (${selectedCount} selected)`;
    }

    function renderResultTable(categoryId) {
        if (!resultTableBody || !categoryData[categoryId]) return;
        const data = categoryData[categoryId];
        resultTableBody.innerHTML = ''; 
        if (data.length === 0) {
            resultTableBody.innerHTML = `<tr><td colspan="3" class="p-3 text-center text-gray-500 dark:text-[--color-text-muted]">No items in this category.</td></tr>`;
        } else {
            data.forEach(item => {
                const row = document.createElement('tr');
                row.classList.add('hover:bg-gray-50', 'dark:hover:bg-[--color-bg-secondary]/50');
                row.innerHTML = `
                    <td class="p-3"><input type="checkbox"></td>
                    <td class="p-3">${item.term}</td>
                    <td class="p-3 text-xs text-gray-600 dark:text-[--color-text-muted]">${item.tags}</td>
                `;
                resultTableBody.appendChild(row);
            });
        }
        updateSelectedCount(); 
    }

    if (categoryList && categoryItems.length > 0 && resultTableBody) {
        resultTableBody.addEventListener('click', (event) => {
            if (event.target.type === 'checkbox') {
                updateSelectedCount();
            }
        });
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                const categoryId = item.dataset.categoryId;
                categoryItems.forEach(li => {
                    li.classList.remove('bg-gray-100', 'dark:bg-[rgba(139,125,107,0.15)]', 'font-semibold');
                    li.classList.add('hover:bg-gray-50', 'dark:hover:bg-[--color-bg-secondary]/50');
                });
                item.classList.add('bg-gray-100', 'dark:bg-[rgba(139,125,107,0.15)]', 'font-semibold');
                item.classList.remove('hover:bg-gray-50', 'dark:hover:bg-[--color-bg-secondary]/50');
                renderResultTable(categoryId);
            });
        });
        // Render 'common' category by default when modal is opened (or on page load)
        renderResultTable('common');
    }
    
    
    // **** START: Vital Signs Internal Script (Merged) ****
    // This logic is for elements *inside* the modal, so it can be initialized once.
    
    // --- History Table Logic (Vital Signs) (MODIFIED) ---
    // (*** 'vsHistoryData' ถูกย้ายไป app-data.js แล้ว ***)

    const vsTableBody = document.getElementById('historyTableBody');
    const vsNoHistoryMessage = document.getElementById('noHistoryMessage');
    const vsHistoryHeaders = document.querySelectorAll('#historyTable .history-sort-header'); 

    let vsCurrentSort = {
        column: 'datetimeSort',
        direction: 'desc'
    };

    function renderVsHistoryTable(data) {
        if (!vsTableBody) return; 
        vsTableBody.innerHTML = ''; 

        if (data.length === 0) {
            if (vsNoHistoryMessage) vsNoHistoryMessage.classList.remove('hidden');
            if (vsTableBody.parentNode) vsTableBody.parentNode.classList.add('hidden');
            return;
        }
        
        if (vsNoHistoryMessage) vsNoHistoryMessage.classList.add('hidden');
        if (vsTableBody.parentNode) vsTableBody.parentNode.classList.remove('hidden');

        data.forEach(item => {
            const cyanosisText = item.cyanosis ? '<span class="font-semibold text-[var(--color-danger)]">Yes</span>' : '<span class="text-[var(--color-text-muted)]">No</span>';
            const seizureText = item.seizure ? '<span class="font-semibold text-[var(--color-danger)]">Yes</span>' : '<span class="text-[var(--color-text-muted)]">No</span>';
            const arrestText = item.arrest ? '<span class="font-semibold text-[var(--color-danger)]">Yes</span>' : '<span class="text-[var(--color-text-muted)]">No</span>';
            const noteSnippet = (item.note && item.note.length > 20) ? item.note.substring(0, 20) + '...' : (item.note || '');

            const row = `
                <tr>
                    <td class="text-[var(--color-text-base)] sticky left-0">${item.datetime}</td>
                    <td class="text-[var(--color-text-base)]">${item.temp || ''}</td>
                    <td class="text-[var(--color-text-base)]">${item.rr || ''}</td>
                    <td class="text-[var(--color-text-base)]">${item.hr || ''}</td>
                    <td class="text-[var(--color-text-base)]">${item.bp || ''}</td>
                    <td class="text-[var(--color-text-base)]">${item.pulse || ''}</td>
                    <td class="text-[var(--color-text-base)]">${item.crt || ''}</td>
                    <td class="text-[var(--color-text-base)]">${item.fbs || ''}</td>
                    <td class="text-[var(--color-text-base)]">${item.mucous || ''}</td>
                    <td class="text-[var(--color-text-base)]">${item.lung || ''}</td>
                    <td class="text-[var(--color-text-base)]">${item.heart || ''}</td>
                    <td class="text-[var(--color-text-base)]">${item.pulse_quality || ''}</td>
                    <td class="text-[var(--color-text-base)]">${item.loc || ''}</td>
                    <td class="text-[var(--color-text-base)]">${item.pain || ''}</td>
                    <td class="text-center">${cyanosisText}</td>
                    <td class="text-center">${seizureText}</td>
                    <td class="text-center">${arrestText}</td>
                    <td class="text-[var(--color-text-muted)]" title="${item.note || ''}">${noteSnippet}</td>
                    <td class="text-[var(--color-text-base)]">
                        <button class="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-primary-500)]" title="View/Edit">
                            <i data-lucide="more-vertical" class="w-4 h-4"></i>
                        </button>
                    </td>
                </tr>
            `;
            const rowElement = document.createElement('tr');
            rowElement.innerHTML = row;
            const firstTd = rowElement.querySelector('td:first-child');
            firstTd.style.backgroundColor = 'var(--color-bg-content)';
            
            rowElement.addEventListener('mouseenter', () => firstTd.style.backgroundColor = 'var(--color-bg-secondary)');
            rowElement.addEventListener('mouseleave', () => firstTd.style.backgroundColor = 'var(--color-bg-content)');
            
            vsTableBody.appendChild(rowElement);
        });
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    function sortVsData(column, direction) {
        vsHistoryData.sort((a, b) => {
            let valA = a[column];
            let valB = b[column];

            if (column === 'datetime') {
                valA = a['datetimeSort'];
                valB = b['datetimeSort'];
                return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }
            if (['pulse', 'hr', 'rr', 'temp', 'pain', 'fbs'].includes(column)) {
                // Handle nulls for numeric sort
                valA = valA === null ? (direction === 'asc' ? Infinity : -Infinity) : valA;
                valB = valB === null ? (direction === 'asc' ? Infinity : -Infinity) : valB;
                return direction === 'asc' ? valA - valB : valB - valA;
            }
            if (['cyanosis', 'seizure', 'arrest'].includes(column)) {
                 return direction === 'asc' ? (valA === valB ? 0 : valA ? 1 : -1) : (valA === valB ? 0 : valA ? -1 : 1);
            }
            // Handle nulls for string sort
            valA = valA === null ? '' : String(valA).toLowerCase();
            valB = valB === null ? '' : String(valB).toLowerCase();

            if (column === 'crt') {
                valA = valA.toString().replace('<', '0').replace('>', '9');
                valB = valB.toString().replace('<', '0').replace('>', '9');
            }
            if (valA < valB) {
                return direction === 'asc' ? -1 : 1;
            }
            if (valA > valB) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    function updateVsSortUI(activeHeader) {
        vsHistoryHeaders.forEach(header => {
            const iconWrapper = header.querySelector('.sort-icon');
            if (iconWrapper) {
                iconWrapper.innerHTML = '<i data-lucide="minus" class="w-4 h-4"></i>';
                iconWrapper.classList.remove('asc', 'desc');
            }
        });
        const activeIconWrapper = activeHeader.querySelector('.sort-icon');
        if (activeIconWrapper) {
            activeIconWrapper.classList.add(vsCurrentSort.direction);
            activeIconWrapper.innerHTML = `<i data-lucide="${vsCurrentSort.direction === 'asc' ? 'arrow-up' : 'arrow-down'}" class="w-4 h-4"></i>`;
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons(); 
        }
    }

    if (vsHistoryHeaders.length > 0) {
        vsHistoryHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const sortColumn = header.dataset.sort;
                if (!sortColumn) return; 

                if (vsCurrentSort.column === sortColumn) {
                    vsCurrentSort.direction = vsCurrentSort.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    vsCurrentSort.column = sortColumn;
                    vsCurrentSort.direction = sortColumn === 'datetime' ? 'desc' : 'asc';
                }
                
                sortVsData(sortColumn === 'datetime' ? 'datetimeSort' : sortColumn, vsCurrentSort.direction);
                renderVsHistoryTable(vsHistoryData);
                updateVsSortUI(header);
            });
        });

        // Initial render
        sortVsData(vsCurrentSort.column, vsCurrentSort.direction); 
        renderVsHistoryTable(vsHistoryData);
        vsHistoryHeaders.forEach(header => {
            if (header.dataset.sort === 'datetime') { 
                 updateVsSortUI(header);
            }
        });
    }

    const bpChartBtn = document.getElementById('bp-chart-btn');
    const vitalsChartBtn = document.getElementById('vitals-chart-btn');

    if (bpChartBtn) {
        bpChartBtn.addEventListener('click', () => {
            openBpChart(vsHistoryData);
        });
    }
    if (vitalsChartBtn) {
        vitalsChartBtn.addEventListener('click', () => {
            openVitalsChart(vsHistoryData);
        });
    }
    
    // **** END: Vital Signs Internal Script (Merged) ****


    // --- Initialize Lucide Icons (Final call on initial load) ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}