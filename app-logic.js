// This is app-logic.js (BETA 4.0 - Final Step 10 - Eye Exam Table Logic Update)

// ***** START: EYE EXAM HISTORY FUNCTIONS (MODIFIED) *****
function renderEyeExamHistoryTable(data) {
    const tableBody = document.getElementById('eyeHistoryTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    
    if (data.length === 0) {
        // (Table has 21 columns now)
        tableBody.innerHTML = `<tr><td colspan="21" class="p-4 text-center text-[var(--color-text-muted)]">No eye exam history found.</td></tr>`;
        return;
    }

    data.forEach(item => {
        const row = document.createElement('tr');
        row.classList.add('hover:bg-gray-50', 'dark:hover:bg-[--color-bg-secondary]/50');
        
        // (MODIFIED) เปลี่ยน N/A เป็น '' และใช้ eyeexam.png
        const imageUrl = item.imageUrl 
            ? `<img src="${item.imageUrl}" alt="Exam" class="history-thumbnail" data-full-src="${item.imageUrl}">`
            : ''; 
            
        row.innerHTML = `
            <td class="p-3 sticky left-0 bg-white dark:bg-[var(--color-bg-content)] text-[var(--color-text-base)]">${item.datetime}</td>
            
            <td class="p-3 text-[var(--color-text-base)]">${item.plr_od || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.plr_os || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.palpebral_od || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.palpebral_os || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.dazzle_od || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.dazzle_os || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.menace_od || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.menace_os || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.stt_od || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.stt_os || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.fluorescein_od || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.fluorescein_os || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.iop_od || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.iop_os || ''}</td>
            <td class="p-3">${imageUrl}</td>
            
            <td class="p-3 text-[var(--color-text-base)]">${item.dvm || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.department || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.recorded_by || ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.recorded_on ? item.recorded_on.split(',')[0] : ''}</td>
            <td class="p-3 text-[var(--color-text-base)]">${item.last_updated_on ? item.last_updated_on.split(',')[0] : ''}</td>

            <td class="p-3">
                <button class="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-primary-500)]" title="View/Edit">
                    <i data-lucide="more-vertical" class="w-4 h-4"></i>
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
// ***** END: EYE EXAM HISTORY FUNCTIONS (MODIFIED) *****


// +++ START: EMR Tab Switching Logic +++

async function loadModuleContent(contentFile) {
    const contentPlaceholder = document.getElementById('emr-content-placeholder');
    if (!contentPlaceholder) {
        console.error('Error: emr-content-placeholder not found.');
        return;
    }
    
    if (!contentFile || contentFile === 'undefined' || contentFile === '#') {
        contentPlaceholder.innerHTML = ''; 
        return;
    }

    // --- Block 1: Fetching Content ---
    let html = '';
    try {
        const response = await fetch('./' + contentFile); 
        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`Module content not found: ${contentFile}`);
                contentPlaceholder.innerHTML = `<div class="p-4"><p class="text-gray-700 dark:text-[--color-text-base]">Module content not found (404): ${contentFile}</p></div>`;
            } else {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return; 
        }
        html = await response.text();
        contentPlaceholder.innerHTML = html;

    } catch (error) {
        console.error('Error during FETCH:', error);
        contentPlaceholder.innerHTML = `<p class="p-4 text-red-600">Error: Could not FETCH module (${contentFile}). Check network or file path.</p>`;
        return; 
    }

    // --- Block 2: Initializing Scripts for the Content ---
    try {
        if (contentFile === 'assessment_content.html') {
            initializeAssessmentScripts(); 
        } else if (contentFile === 'ext_doc_content.html') {
            initializeExtDocScripts();
        } else if (contentFile === 'extdoc_page_addnew.html') {
            initializeExtDocAddNewPage();
        } else if (contentFile === 'order_pe_content.html') {
            initializeOrderPEScripts();
        }
        else if (contentFile === 'order_lis_content.html') {
            initializeLisScripts(); 
        } else if (contentFile === 'order_path_content.html') {
            initializePathologyScripts(); 
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (initError) {
        console.error(`Error during INITIALIZATION of ${contentFile}:`, initError);
        contentPlaceholder.innerHTML += `<p class="p-4 text-yellow-100 bg-yellow-100 rounded-b-lg border-t border-yellow-200">Warning: Module loaded, but its scripts failed to initialize. Error: ${initError.message}</p>`;
    }
}

function initializeTabSwitching() {
    const emrTabs = document.querySelectorAll('.emr-tab');
    
    emrTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetFile = this.dataset.target;

            loadModuleContent(targetFile);

            document.querySelectorAll('.emr-tab').forEach(t => {
                t.classList.remove('tab-active', 'dark:text-[--color-primary-500]', 'dark:border-[--color-primary-500]');
                t.classList.add('tab-inactive', 'dark:text-[--color-text-muted]');
            });
            
            this.classList.remove('tab-inactive', 'dark:text-[--color-text-muted]');
            this.classList.add('tab-active', 'dark:text-[--color-primary-500]', 'dark:border-[--color-primary-500]');
        });
    });
}
// +++ END: EMR Tab Switching Logic +++

// +++ START: Assessment-related Functions +++
function initializeAssessmentScripts() {
    
    // --- Problem List Modal (Dynamic Content) ---
    const openProblemListBtn = document.getElementById('open-problem-list-modal');
    const problemListModal = document.getElementById('problem-list-modal'); 
    const closeProblemListBtnX = document.getElementById('problem-list-popup-close-x'); 
    const cancelProblemListBtn = document.getElementById('problem-list-popup-cancel'); 
    
    const showProblemListPopup = () => { if (problemListModal) problemListModal.classList.remove('hidden'); };
    const hideProblemListPopup = () => { if (problemListModal) problemListModal.classList.add('hidden'); };
    
    if (openProblemListBtn) openProblemListBtn.addEventListener('click', showProblemListPopup);
    
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
    const copyProblemBtn = document.getElementById('copy-problem-list-btn');
    const problemContent = document.getElementById('problem-list-content');
    const copyDiagnosisBtn = document.getElementById('copy-diagnosis-btn');
    const diagnosisContent = document.getElementById('diagnosis-content');

    if (copyAssessmentBtn && assessmentContent) {
        copyAssessmentBtn.addEventListener('click', () => {
            const textToCopy = assessmentContent.innerText || assessmentContent.textContent;
            if (copyToClipboard(textToCopy)) {
                showSparkleCopyEffect(copyAssessmentBtn);
            }
        });
    }
    if (copyProblemBtn && problemContent) {
        copyProblemBtn.addEventListener('click', () => {
            const textToCopy = problemContent.innerText || problemContent.textContent;
            if (copyToClipboard(textToCopy)) {
                showSparkleCopyEffect(copyProblemBtn);
            }
        });
    }
    if (copyDiagnosisBtn && diagnosisContent) {
        copyDiagnosisBtn.addEventListener('click', () => {
            const textToCopy = diagnosisContent.innerText || diagnosisContent.textContent;
            if (copyToClipboard(textToCopy)) {
                showSparkleCopyEffect(copyDiagnosisBtn);
            }
        });
    }

    // --- Assessment History Table Sort (Dynamic Content) ---
    const assessmentHistoryTableBody = document.getElementById('assessment-history-table-body');
    const assessmentHistoryHeaders = document.querySelectorAll('#assessment-history-table th[data-sort]');
    
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
} 
// +++ END: Assessment-related Functions +++