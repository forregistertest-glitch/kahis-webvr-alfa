// This is app-logic.js

// ***** START: EYE EXAM HISTORY FUNCTIONS (MODIFIED) *****
function renderEyeExamHistoryTable(data) {
    const tableBody = document.getElementById('eyeHistoryTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="18" class="p-4 text-center text-[var(--color-text-muted)]">No eye exam history found.</td></tr>`;
        return;
    }

    data.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('hover:bg-gray-50', 'dark:hover:bg-[--color-bg-secondary]/50');
        
        // (MODIFIED) เปลี่ยน N/A เป็น '' และใช้ eyeexam.png
        const imageUrl = item.imageUrl 
            ? `<img src="${item.imageUrl}" alt="Exam" class="history-thumbnail" data-full-src="${item.imageUrl}">`
            : ''; // <-- เปลี่ยน 'N/A' เป็น ''
            
        row.innerHTML = `
            <td class="p-3 sticky left-0">${item.datetime}</td>
            <td class="p-3">${item.dvm}</td>
            <td class="p-3">${item.plr_od || ''}</td>
            <td class="p-3">${item.plr_os || ''}</td>
            <td class="p-3">${item.palpebral_od || ''}</td>
            <td class="p-3">${item.palpebral_os || ''}</td>
            <td class="p-3">${item.dazzle_od || ''}</td>
            <td class="p-3">${item.dazzle_os || ''}</td>
            <td class="p-3">${item.menace_od || ''}</td>
            <td class="p-3">${item.menace_os || ''}</td>
            <td class="p-3">${item.stt_od || ''}</td>
            <td class="p-3">${item.stt_os || ''}</td>
            <td class="p-3">${item.fluorescein_od || ''}</td>
            <td class="p-3">${item.fluorescein_os || ''}</td>
            <td class="p-3">${item.iop_od || ''}</td>
            <td class="p-3">${item.iop_os || ''}</td>
            <td class="p-3">${imageUrl}</td>
            <td class="p-3">
                <button class="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-primary-500)]" title="View/Edit">
                    <i data-lucide="more-vertical" class="w-4 h-4"></i>
                </button>
            </td>
        `;
        
        const firstTd = row.querySelector('td:first-child');
        firstTd.style.backgroundColor = 'var(--color-bg-content)';
        row.addEventListener('mouseenter', () => firstTd.style.backgroundColor = 'var(--color-bg-secondary)');
        row.addEventListener('mouseleave', () => firstTd.style.backgroundColor = 'var(--color-bg-content)');

        tableBody.appendChild(row);
    });
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
// ***** END: EYE EXAM HISTORY FUNCTIONS (MODIFIED) *****


// +++ START: EMR Tab Switching Logic (NEW - MOVED TO GLOBAL SCOPE) +++

// (นี่คือเวอร์ชันแก้ไขล่าสุด ที่มีการดักจับ Error 2 ชั้น)
async function loadModuleContent(contentFile) {
    const contentPlaceholder = document.getElementById('emr-content-placeholder');
    if (!contentPlaceholder) {
        console.error('Error: emr-content-placeholder not found.');
        return;
    }
    
    // จัดการกรณีที่ data-target ไม่มีค่า (เช่น ลิงก์ Sys Exam ที่เป็น href)
    if (!contentFile || contentFile === 'undefined' || contentFile === '#') {
        contentPlaceholder.innerHTML = ''; // ล้างเนื้อหาถ้า target ไม่ถูกต้อง
        return;
    }

    // --- Block 1: Fetching Content ---
    let html = '';
    try {
        const response = await fetch('./' + contentFile); // (ใช้ './' patch)
        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`Module content not found: ${contentFile}`);
                contentPlaceholder.innerHTML = `<div class="p-4"><p class="text-gray-700 dark:text-[--color-text-base]">Module content not found (404): ${contentFile}</p></div>`;
            } else {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return; // หยุดถ้า fetch ล้มเหลว
        }
        html = await response.text();
        contentPlaceholder.innerHTML = html;

    } catch (error) {
        // --- นี่คือ Error ตอนดึงไฟล์ ---
        console.error('Error during FETCH:', error);
        contentPlaceholder.innerHTML = `<p class="p-4 text-red-600">Error: Could not FETCH module (${contentFile}). Check network or file path.</p>`;
        return; // หยุดถ้า fetch ล้มเหลว
    }

    // --- Block 2: Initializing Scripts for the Content ---
    try {
        // (สำคัญมาก) เรียกใช้สคริปต์สำหรับโมดูลนั้นๆ
        if (contentFile === 'assessment_content.html') {
            initializeAssessmentScripts(); 
        } else if (contentFile === 'ext_doc_content.html') {
            // (ใหม่) เรียกใช้ตัวเริ่มต้นของโมดูล Ext Doc
            initializeExtDocScripts();
        /* VVVV เพิ่มโค้ด 3 บรรทัดนี้เข้าไป VVVV */
        } else if (contentFile === 'extdoc_page_addnew.html') {
            // (ใหม่) เรียกใช้ตัวเริ่มต้นของหน้า Add New Ext Doc
            initializeExtDocAddNewPage();
        /* ^^^^ สิ้นสุดโค้ดที่เพิ่ม ^^^^ */
         
        }
        // ... (เพิ่มเงื่อนไขสำหรับโมดูลอื่นๆ ในอนาคต) ...

        // เรียก Lucide icons ใหม่ทุกครั้งที่เปลี่ยนเนื้อหา
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (initError) {
        // --- นี่คือ Error ตอนรันสคริปต์ (เช่น initializeAssessmentScripts) ---
        console.error(`Error during INITIALIZATION of ${contentFile}:`, initError);
        // แสดง Error ใหม่เป็นสีเหลืองทับลงไป
        contentPlaceholder.innerHTML += `<p class="p-4 text-yellow-100 bg-yellow-100 rounded-b-lg border-t border-yellow-200">Warning: Module loaded, but its scripts failed to initialize. Error: ${initError.message}</p>`;
    }
}

// (ฟังก์ชันนี้ถูกย้ายออกมาอยู่นอก DOMContentLoaded)
function initializeTabSwitching() {
    const emrTabs = document.querySelectorAll('.emr-tab');
    
    emrTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetFile = this.dataset.target;

            // 1. โหลดเนื้อหาใหม่
            loadModuleContent(targetFile);

            // 2. (FIX) อัปเดต UI ของ Tab
            // ลบ active ออกจาก tab อื่นทั้งหมด (รวมถึง non-emr-tab links)
            document.querySelectorAll('.emr-tab').forEach(t => {
                // บังคับสไตล์ inactive
                t.classList.remove('tab-active', 'dark:text-[--color-primary-500]', 'dark:border-[--color-primary-500]');
                t.classList.add('tab-inactive', 'dark:text-[--color-text-muted]');
            });
            
            // เพิ่ม active ให้กับ Tab ที่คลิกเท่านั้น
            this.classList.remove('tab-inactive', 'dark:text-[--color-text-muted]');
            this.classList.add('tab-active', 'dark:text-[--color-primary-500]', 'dark:border-[--color-primary-500]');
        });
    });
}
// +++ END: EMR Tab Switching Logic (NEW - MOVED TO GLOBAL SCOPE) +++

// +++ START: Assessment-related Functions (NEW - MOVED TO GLOBAL SCOPE) +++
// (ฟังก์ชัน 3 ตัวนี้ ถูกย้ายออกมาจาก DOMContentLoaded)

// --- Initialization function for dynamically loaded content (ย้ายออกมา Global) ---
function initializeAssessmentScripts() {
    
    // --- Problem List Modal (Dynamic Content) ---
    const openProblemListBtn = document.getElementById('open-problem-list-modal');
    const problemListModal = document.getElementById('problem-list-modal'); 
    const closeProblemListBtnX = document.getElementById('problem-list-popup-close-x'); 
    const cancelProblemListBtn = document.getElementById('problem-list-popup-cancel'); 
    
    const showProblemListPopup = () => { if (problemListModal) problemListModal.classList.remove('hidden'); };
    const hideProblemListPopup = () => { if (problemListModal) problemListModal.classList.add('hidden'); };
    
    if (openProblemListBtn) openProblemListBtn.addEventListener('click', showProblemListPopup);
    
    // (FIX: เพิ่มการตรวจสอบ dataset.listenerAttached ก่อนเพิ่ม Event)
    if (closeProblemListBtnX && !closeProblemListBtnX.dataset.listenerAttached) {
        closeProblemListBtnX.addEventListener('click', hideProblemListPopup);
        closeProblemListBtnX.dataset.listenerAttached = 'true';
    }
    if (cancelProblemListBtn && !cancelProblemListBtn.dataset.listenerAttached) {
        cancelProblemListBtn.addEventListener('click', hideProblemListPopup);
        cancelProblemListBtn.dataset.listenerAttached = 'true';
    }
    if (problemListModal && !problemListModal.dataset.listenerAttached) {
        problemListModal.addEventListener('click', (event) => { 
            if (event.target === problemListModal) hideProblemListPopup(); 
        });
        problemListModal.dataset.listenerAttached = 'true';
    }

    // --- Copy to Clipboard (Dynamic Content) ---
    const copyAssessmentBtn = document.getElementById('copy-assessment-note-btn');
    const assessmentContent = document.getElementById('assessment-note-content');
    const assessmentMsg = document.getElementById('copy-msg-assessment');
    const copyProblemBtn = document.getElementById('copy-problem-list-btn');
    const problemContent = document.getElementById('problem-list-content');
    const problemMsg = document.getElementById('copy-msg-problem');
    const copyDiagnosisBtn = document.getElementById('copy-diagnosis-btn');
    const diagnosisContent = document.getElementById('diagnosis-content');
    const diagnosisMsg = document.getElementById('copy-msg-diagnosis');

    if (copyAssessmentBtn && assessmentContent) {
        copyAssessmentBtn.addEventListener('click', () => {
            const textToCopy = assessmentContent.innerText || assessmentContent.textContent;
            if (copyToClipboard(textToCopy)) {
                showCopyMessage(assessmentMsg);
            }
        });
    }
    if (copyProblemBtn && problemContent) {
        copyProblemBtn.addEventListener('click', () => {
            const textToCopy = problemContent.innerText || problemContent.textContent;
            if (copyToClipboard(textToCopy)) {
                showCopyMessage(problemMsg);
            }
        });
    }
    if (copyDiagnosisBtn && diagnosisContent) {
        copyDiagnosisBtn.addEventListener('click', () => {
            const textToCopy = diagnosisContent.innerText || diagnosisContent.textContent;
            if (copyToClipboard(textToCopy)) {
                showCopyMessage(diagnosisMsg);
            }
        });
    }

    // --- Assessment History Table Sort (Dynamic Content) ---
    const assessmentHistoryTableBody = document.getElementById('assessment-history-table-body');
    const assessmentHistoryHeaders = document.querySelectorAll('#assessment-history-table th[data-sort]');
    
    // (*** หมายเหตุ: 'assessmentHistoryData' ถูกย้ายไป app-data.js แล้ว ***)
    
    let assessmentCurrentSort = { column: 'datetime', direction: 'desc' }; 

    function renderAssessmentHistoryTable(data) {
        if (!assessmentHistoryTableBody) return;
        assessmentHistoryTableBody.innerHTML = ''; 
        data.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add('hover:bg-gray-50', 'dark:hover:bg-[--color-bg-secondary]/50', 'cursor-pointer');
            if (item.datetime === '2025-12-31 20:00') {
                 row.classList.add('bg-blue-50', 'dark:bg-blue-900/20');
            }
            row.innerHTML = `
                <td class="p-3 ${item.datetime === '2025-12-31 20:00' ? 'text-blue-600 dark:text-[--color-primary-500]' : ''}">${item.datetimeStr}</td>
                <td class="p-3">${item.dvm}</td>
                <td class="p-3">${item.department}</td>
            `;
            assessmentHistoryTableBody.appendChild(row);
        });
    }

    function sortAssessmentData(column, direction) {
        assessmentHistoryData.sort((a, b) => {
            let valA = a[column];
            let valB = b[column];
            if (column === 'datetime') {
                valA = a.datetime;
                valB = b.datetime;
            } else if (column === 'department') {
                valA = parseInt(a.department, 10);
                valB = parseInt(b.department, 10);
            }
            let comparison = 0;
            if (valA > valB) {
                comparison = 1;
            } else if (valA < valB) {
                comparison = -1;
            }
            if (comparison === 0 && column !== 'datetime') {
                 let dateA = a.datetime;
                 let dateB = b.datetime;
                 if (dateA > dateB) comparison = -1;
                 else if (dateA < dateB) comparison = 1;
            }
            return direction === 'asc' ? comparison : comparison * -1;
        });
    }

    function updateAssessmentSortUI(activeHeader) {
        assessmentHistoryHeaders.forEach(header => {
            header.classList.remove('sort-active');
            const icon = header.querySelector('.sort-icon');
            if (icon) icon.setAttribute('data-lucide', 'arrow-up-down'); 
        });
        activeHeader.classList.add('sort-active');
        const activeIcon = activeHeader.querySelector('.sort-icon');
        if (activeIcon) {
            activeIcon.setAttribute('data-lucide', assessmentCurrentSort.direction === 'asc' ? 'arrow-up' : 'arrow-down');
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons(); 
        }
    }

    if (assessmentHistoryHeaders.length > 0) {
        assessmentHistoryHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const sortColumn = header.dataset.sort;
                if (assessmentCurrentSort.column === sortColumn) {
                    assessmentCurrentSort.direction = assessmentCurrentSort.direction === 'asc' ? 'desc' : 'asc';
                } else {
                    assessmentCurrentSort.column = sortColumn;
                    assessmentCurrentSort.direction = sortColumn === 'datetime' ? 'desc' : 'asc';
                }
                sortAssessmentData(assessmentCurrentSort.column, assessmentCurrentSort.direction);
                renderAssessmentHistoryTable(assessmentHistoryData);
                updateAssessmentSortUI(header);
            });
        });
        sortAssessmentData(assessmentCurrentSort.column, assessmentCurrentSort.direction); 
        renderAssessmentHistoryTable(assessmentHistoryData);
        assessmentHistoryHeaders.forEach(header => {
            if (header.dataset.sort === assessmentCurrentSort.column) {
                 updateAssessmentSortUI(header);
            }
        });
    }
} // End of initializeAssessmentScripts()
// +++ END: Assessment-related Functions (NEW - MOVED TO GLOBAL SCOPE) +++