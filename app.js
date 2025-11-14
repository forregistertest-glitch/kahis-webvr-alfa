// This is app.js (ฉบับแก้ไขสมบูรณ์ - ตัวเต็ม)

// ***** START: DRAWING DEMO FUNCTIONS *****
let fabricCanvas = null;
let drawingHistory = []; // สำหรับ Undo
let drawingLock = false; // ป้องกันการ Undo/Clear ระหว่างทำงาน

function saveDrawingState() {
    if (drawingLock) return;
    // บันทึกสถานะปัจจุบันของ canvas
    drawingHistory.push(JSON.stringify(fabricCanvas.toJSON()));
}

function initializeDrawingDemo(templateUrl) {
    if (fabricCanvas) {
        fabricCanvas.dispose(); // ล้าง canvas เก่า (ถ้ามี)
    }
    drawingHistory = []; // ล้างประวัติ Undo

    const canvasElement = document.getElementById('drawing-canvas');
    const container = canvasElement.parentElement;
    if (!container) return; 

    // สร้าง canvas
    fabricCanvas = new fabric.Canvas('drawing-canvas', {
        width: container.clientWidth,
        height: container.clientWidth, // เริ่มต้นด้วยสี่เหลี่ยมจัตุรัส (จะถูกปรับขนาดเมื่อโหลดภาพ)
        isDrawingMode: true,
    });
    
    // ตั้งค่าปากกาเริ่มต้น
    fabricCanvas.freeDrawingBrush.color = '#E11D48'; // สีแดง
    fabricCanvas.freeDrawingBrush.width = 3;

    // โหลดภาพพื้นหลัง (จาก 'eyeexam.png')
    fabric.Image.fromURL(templateUrl, function(img) {
        if (!img) {
             console.error("Could not load image: " + templateUrl);
             // (Optional) อาจจะตั้งค่าพื้นหลังสีขาวถ้าโหลดไม่สำเร็จ
             fabricCanvas.setBackgroundColor('#FFFFFF', fabricCanvas.renderAll.bind(fabricCanvas));
             saveDrawingState(); // บันทึกสถานะเริ่มต้น (ว่างเปล่า)
             return;
        }
        // ตั้งขนาด Canvas ตามอัตราส่วนของภาพ
        fabricCanvas.setHeight(container.clientWidth * (img.height / img.width));
        
        fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas), {
            scaleX: fabricCanvas.width / img.width,
            scaleY: fabricCanvas.height / img.height
        });
        
        // บันทึกสถานะเริ่มต้น (ภาพเปล่า) สำหรับ Undo
        saveDrawingState();
        
    }, { crossOrigin: 'anonymous' }); // Need crossOrigin for local file loading demo in some setups

    // --- ผูก Event ปุ่มเครื่องมือวาดภาพ ---
    const penBtn = document.getElementById('drawing-mode-btn');
    const textBtn = document.getElementById('text-mode-btn');
    const colorPicker = document.getElementById('drawing-color-picker');
    const undoBtn = document.getElementById('drawing-undo-btn');
    const clearBtn = document.getElementById('drawing-clear-btn');

    if (penBtn) penBtn.onclick = () => {
        fabricCanvas.isDrawingMode = true;
        penBtn.classList.add('bg-blue-600', 'text-white');
        textBtn.classList.remove('bg-blue-600', 'text-white');
        textBtn.classList.add('bg-gray-200', 'dark:bg-[--color-bg-secondary]');
    };
    
    if (textBtn) textBtn.onclick = () => {
        fabricCanvas.isDrawingMode = false;
        textBtn.classList.add('bg-blue-600', 'text-white');
        penBtn.classList.remove('bg-blue-600', 'text-white');
        penBtn.classList.add('bg-gray-200', 'dark:bg-[--color-bg-secondary]');
    };

    if (colorPicker) colorPicker.onchange = () => {
        const color = colorPicker.value;
        fabricCanvas.freeDrawingBrush.color = color;
        const activeObject = fabricCanvas.getActiveObject();
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.set('fill', color);
            fabricCanvas.renderAll();
        }
    };
    
    // -- (NEW) Undo/Clear Logic --
    if (undoBtn) undoBtn.onclick = () => {
        if (drawingHistory.length > 1) { // ต้องมีสถานะเริ่มต้น + สถานะปัจจุบัน
            drawingLock = true;
            drawingHistory.pop(); // ลบสถานะล่าสุด
            const prevState = drawingHistory[drawingHistory.length - 1]; // โหลดสถานะก่อนหน้า
            fabricCanvas.loadFromJSON(prevState, () => {
                fabricCanvas.renderAll();
                drawingLock = false;
            });
        }
    };
    
    if (clearBtn) clearBtn.onclick = () => {
        if (drawingHistory.length > 0) {
            drawingLock = true;
            const initialState = drawingHistory[0]; // กลับไปสถานะแรกสุด (ภาพเปล่า)
            drawingHistory = [initialState]; // รีเซ็ตประวัติ
            fabricCanvas.loadFromJSON(initialState, () => {
                fabricCanvas.renderAll();
                drawingLock = false;
            });
        }
    };

    // --- Listeners สำหรับการวาดและพิมพ์ ---
    fabricCanvas.on('mouse:down', function(options) {
        if (!fabricCanvas.isDrawingMode && (!options.target || options.target.type !== 'i-text')) {
            const pointer = fabricCanvas.getPointer(options.e);
            const text = new fabric.IText('Tap to edit', {
                left: pointer.x,
                top: pointer.y,
                fill: colorPicker.value,
                fontSize: 20,
                originX: 'center',
                originY: 'center'
            });
            fabricCanvas.add(text);
            fabricCanvas.setActiveObject(text);
            text.enterEditing();
        }
    });

    // บันทึกสถานะทุกครั้งที่วาด/แก้ไขเสร็จ
    fabricCanvas.on('object:added', saveDrawingState);
    fabricCanvas.on('object:modified', saveDrawingState);

}
// ***** END: DRAWING DEMO FUNCTIONS *****


// ฟังก์ชันสำหรับเปิดหน้าต่าง BP Chart
function openBpChart(historyData) {
    const chartWindow = window.open("", "_blank");
    if (!chartWindow) {
        alert("Please allow popups for this website to view charts.");
        return;
    }

    const sortedData = [...historyData].sort((a, b) => a.datetimeSort.localeCompare(b.datetimeSort));
    const labels = sortedData.map(d => d.datetime);
    const systolicData = sortedData.map(d => d.bp.split('/')[0] ? parseInt(d.bp.split('/')[0], 10) : null);
    const diastolicData = sortedData.map(d => d.bp.split('/')[1] ? parseInt(d.bp.split('/')[1], 10) : null);
    const pulseData = sortedData.map(d => d.pulse);

    const content = `
        <!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <title>BP Chart</title>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
            <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns"><\/script>
            <style>
                body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f4f4f4; margin: 0; }
                #chart-container { width: 90%; max-width: 1200px; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            </style>
        </head>
        <body>
            <div id="chart-container">
                <canvas id="bpChart"></canvas>
            </div>
            <script>
                new Chart(document.getElementById('bpChart'), {
                    type: 'bar',
                    data: {
                        labels: ${JSON.stringify(labels)},
                        datasets: [
                            {
                                type: 'bar',
                                label: 'Systolic (mmHg)',
                                data: ${JSON.stringify(systolicData)},
                                backgroundColor: 'rgba(156, 163, 175, 0.7)',
                                borderColor: 'rgba(156, 163, 175, 1)',
                                borderWidth: 1,
                                yAxisID: 'yBP'
                            },
                            {
                                type: 'bar',
                                label: 'Diastolic (mmHg)',
                                data: ${JSON.stringify(diastolicData)},
                                backgroundColor: 'rgba(239, 68, 68, 0.7)',
                                borderColor: 'rgba(239, 68, 68, 1)',
                                borderWidth: 1,
                                yAxisID: 'yBP'
                            },
                            {
                                type: 'line',
                                label: 'Pulse (bpm)',
                                data: ${JSON.stringify(pulseData)},
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                borderColor: 'rgba(59, 130, 246, 1)',
                                borderWidth: 2,
                                fill: false,
                                tension: 0.1,
                                yAxisID: 'yPulse'
                            }
                        ]
                    },
                    options: {
                        plugins: { title: { display: true, text: 'BP & Pulse Chart' } },
                        scales: {
                            x: { title: { display: true, text: 'Date/Time' } },
                            yBP: {
                                type: 'linear',
                                position: 'left',
                                title: { display: true, text: 'Blood Pressure (mmHg)' },
                                min: 0
                            },
                            yPulse: {
                                type: 'linear',
                                position: 'right',
                                title: { display: true, text: 'Pulse (bpm)' },
                                grid: { drawOnChartArea: false },
                                min: 0
                            }
                        }
                    }
                });
            <\/script>
        </body>
        </html>
    `;
    
    chartWindow.document.open();
    chartWindow.document.write(content);
    chartWindow.document.close();
}

// ฟังก์ชันสำหรับเปิดหน้าต่าง Vital Signs Chart
function openVitalsChart(historyData) {
    const chartWindow = window.open("", "_blank");
    if (!chartWindow) {
        alert("Please allow popups for this website to view charts.");
        return;
    }

    const sortedData = [...historyData].sort((a, b) => a.datetimeSort.localeCompare(b.datetimeSort));
    const labels = sortedData.map(d => d.datetime);
    const pulseData = sortedData.map(d => d.pulse);
    const hrData = sortedData.map(d => d.hr); 
    const rrData = sortedData.map(d => d.rr);
    const tempData = sortedData.map(d => d.temp);
    const fbsData = sortedData.map(d => d.fbs);

    const content = `
        <!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <title>Vital Signs Chart</title>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
            <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns"><\/script>
            <style>
                body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f4f4f4; margin: 0; }
                #chart-container { width: 90%; max-width: 1200px; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            </style>
        </head>
        <body>
            <div id="chart-container">
                <canvas id="vitalsChart"></canvas>
            </div>
            <script>
                new Chart(document.getElementById('vitalsChart'), {
                    type: 'line',
                    data: {
                        labels: ${JSON.stringify(labels)},
                        datasets: [
                            {
                                label: 'Pulse (bpm)',
                                data: ${JSON.stringify(pulseData)},
                                borderColor: 'rgba(59, 130, 246, 1)', // Blue
                                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                                tension: 0.1,
                                yAxisID: 'yPrimary'
                            },
                            {
                                label: 'HR (bpm)',
                                data: ${JSON.stringify(hrData)},
                                borderColor: 'rgba(239, 68, 68, 1)', // Red
                                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                                tension: 0.1,
                                yAxisID: 'yPrimary'
                            },
                            {
                                label: 'RR (rpm)',
                                data: ${JSON.stringify(rrData)},
                                borderColor: 'rgba(16, 185, 129, 1)', // Green
                                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                                tension: 0.1,
                                yAxisID: 'yPrimary'
                            },
                            {
                                label: 'Temp (°F)',
                                data: ${JSON.stringify(tempData)},
                                borderColor: 'rgba(249, 115, 22, 1)', // Orange
                                backgroundColor: 'rgba(249, 115, 22, 0.2)',
                                tension: 0.1,
                                yAxisID: 'yPrimary'
                            },
                            {
                                label: 'FBS (mg/dL)',
                                data: ${JSON.stringify(fbsData)},
                                borderColor: 'rgba(139, 92, 246, 1)', // Purple
                                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                                tension: 0.1,
                                yAxisID: 'yFBS'
                            }
                        ]
                    },
                    options: {
                        plugins: { title: { display: true, text: 'Vital Signs Chart' } },
                        scales: {
                            x: { title: { display: true, text: 'Date/Time' } },
                            yPrimary: {
                                type: 'linear',
                                position: 'left',
                                title: { display: true, text: 'Pulse, HR, RR, Temp' },
                                min: 0
                            },
                            yFBS: {
                                type: 'linear',
                                position: 'right',
                                title: { display: true, text: 'FBS (mg/dL)' },
                                grid: { drawOnChartArea: false },
                                min: 0
                            }
                        }
                    }
                });
            <\/script>
        </body>
        </html>
    `;

    chartWindow.document.open();
    chartWindow.document.write(content);
    chartWindow.document.close();
}

// ***** START: EYE EXAM HISTORY DATA (MODIFIED) *****
const eyeExamHistoryData = [
    { datetimeSort: '2025-12-31T09:00:00', datetime: '31 Dec 2025 09:00', dvm: 'Dr. Eye', plr_od: '+', plr_os: '+', palpebral_od: '+', palpebral_os: '+', dazzle_od: '+', dazzle_os: '+', menace_od: '+', menace_os: '+', stt_od: 15, stt_os: 14, iop_od: 18, iop_os: 19, fluorescein_od: 'Neg', fluorescein_os: 'Neg', imageUrl: 'eyeexam.png' },
    { datetimeSort: '2025-12-30T14:00:00', datetime: '30 Dec 2025 14:00', dvm: 'Dr. See', plr_od: 'Sluggish', plr_os: '+', palpebral_od: '+', palpebral_os: '+', dazzle_od: '+', dazzle_os: '+', menace_od: '-', menace_os: '+', stt_od: 10, stt_os: 12, iop_od: 22, iop_os: 20, fluorescein_od: 'Positive', fluorescein_os: 'Neg', imageUrl: 'eyeexam.png' },
    { datetimeSort: '2025-12-29T11:00:00', datetime: '29 Dec 2025 11:00', dvm: 'Dr. Eye', plr_od: '+', plr_os: '+', palpebral_od: '+', palpebral_os: '+', dazzle_od: null, dazzle_os: null, menace_od: '+', menace_os: '+', stt_od: null, stt_os: null, iop_od: 17, iop_os: 17, fluorescein_od: 'Neg', fluorescein_os: 'Neg', imageUrl: null },
    { datetimeSort: '2025-12-28T16:00:00', datetime: '28 Dec 2025 16:00', dvm: 'Dr. See', plr_od: '-', plr_os: 'Sluggish', palpebral_od: '+', palpebral_os: '+', dazzle_od: '-', dazzle_os: 'Sluggish', menace_od: '-', menace_os: '-', stt_od: 5, stt_os: 8, iop_od: 45, iop_os: 25, fluorescein_od: 'Neg', fluorescein_os: 'Neg', imageUrl: 'eyeexam.png' },
    { datetimeSort: '2025-12-27T10:00:00', datetime: '27 Dec 2025 10:00', dvm: 'Dr. Eye', plr_od: '+', plr_os: '+', palpebral_od: '+', palpebral_os: '+', dazzle_od: '+', dazzle_os: '+', menace_od: '+', menace_os: '+', stt_od: 16, stt_os: 15, iop_od: 19, iop_os: 19, fluorescein_od: 'Neg', fluorescein_os: 'Neg', imageUrl: 'eyeexam.png' },
    { datetimeSort: '2025-12-26T15:00:00', datetime: '26 Dec 2025 15:00', dvm: 'Dr. See', plr_od: '+', plr_os: '+', palpebral_od: '+', palpebral_os: '+', dazzle_od: null, dazzle_os: null, menace_od: null, menace_os: null, stt_od: 14, stt_os: 15, iop_od: 20, iop_os: 20, fluorescein_od: 'Neg', fluorescein_os: 'Neg', imageUrl: null }
];
// ***** END: EYE EXAM HISTORY DATA (MODIFIED) *****

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



// --- Main DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    
    // --- (DEMO) Load assessment_content.html into main placeholder ---
    const contentPlaceholder = document.getElementById('emr-content-placeholder');
    if (contentPlaceholder) {
        fetch('assessment_content.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                contentPlaceholder.innerHTML = html;
                initializeAssessmentScripts(); // <--- This function is crucial
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            })
            .catch(error => {
                console.error('Error loading assessment content:', error);
                contentPlaceholder.innerHTML = '<p class="p-4 text-red-600">Error: Could not load assessment module content.</p>';
            });
    }

    
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

    // --- Copy to Clipboard Function ---
    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed'; 
        textarea.style.opacity = 0;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            return true;
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }

    function showCopyMessage(msgElement) {
        if (msgElement) {
            msgElement.classList.remove('hidden');
            setTimeout(() => {
                msgElement.classList.add('hidden');
            }, 1500); 
        }
    }

    // --- Initialization function for dynamically loaded content ---
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
        let assessmentHistoryData = [
            { datetime: '2025-12-31 20:00', datetimeStr: '31 Dec 2025 20:00', dvm: 'AAA', department: '201' },
            { datetime: '2025-12-31 19:00', datetimeStr: '31 Dec 2025 19:00', dvm: 'BBB', department: '201' },
            { datetime: '2025-12-31 18:00', datetimeStr: '31 Dec 2025 18:00', dvm: 'CCC', department: '201' },
            { datetime: '2025-12-31 09:00', datetimeStr: '31 Dec 2025 09:00', dvm: 'AAA', department: '101' },
            { datetime: '2025-12-30 20:00', datetimeStr: '30 Dec 2025 20:00', dvm: 'AAA', department: '201' },
            { datetime: '2025-12-25 16:00', datetimeStr: '25 Dec 2025 16:00', dvm: 'CCC', department: '101' },
            { datetime: '2025-12-20 19:00', datetimeStr: '20 Dec 2025 19:00', dvm: 'BBB', department: '201' },
            { datetime: '2025-12-20 13:00', datetimeStr: '20 Dec 2025 13:00', dvm: 'CCC', department: '101' },
            { datetime: '2025-12-10 11:00', datetimeStr: '10 Dec 2025 11:00', dvm: 'AAA', department: '101' },
            { datetime: '2025-12-04 14:00', datetimeStr: '04 Dec 2025 14:00', dvm: 'AAA', department: '101' }
        ];
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
    

    // --- Problem List Modal (Tagging Section) ---
    const categoryData = {
        "common": [ { term: "Depressed", tags: "TAG A, TAG B" }, { term: "Loss of appetile", tags: "TAG A, TAG C" }, { term: "Acute Vomitting", tags: "TAG B, TAG D" }, { term: "Chronic Vomitting", tags: "TAG B, TAG E" }, { term: "Respiratory distress", tags: "TAG F" }, { term: "Lameness", tags: "TAG G" }, { term: "Dental tartar", tags: "TAG H" } ],
        "eye": [ { term: "Corneal ulcer", tags: "Eye, Trauma" }, { term: "Glaucoma", tags: "Eye, Chronic" }, { term: "Uveitis", tags: "Eye, Inflammation" }, { term: "Cataract", tags: "Eye, Age" } ],
        "ear": [ { term: "Otitis externa", tags: "Ear, Infection" }, { term: "Ear mites", tags: "Ear, Parasite" }, { term: "Aural hematoma", tags: "Ear, Trauma" } ],
        "nose": [ { term: "Nasal discharge", tags: "Nose, Symptom" }, { term: "Sneezing", tags: "Nose, Symptom" } ],
        "throat": [ { term: "Coughing", tags: "Throat, Symptom" }, { term: "Pharyngitis", tags: "Throat, Inflammation" } ],
        "abdomen": [ { term: "Abdominal pain", tags: "Abdomen, Symptom" }, { term: "Diarrhea", tags: "Abdomen, GI" }, { term: "Foreign body", tags: "Abdomen, GI" } ],
        "trauma": [ { term: "Laceration", tags: "Trauma, Skin" }, { term: "Hit by car", tags: "Trauma, HBC" } ],
        "bone": [ { term: "Fracture", tags: "Bone, Trauma" }, { term: "Arthritis", tags: "Bone, Chronic" } ],
        "behavier": [ { term: "Aggression", tags: "Behavior" }, { term: "Anxiety", tags: "Behavior" } ]
    };

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
        renderResultTable('common');
    }
    
    
    // **** START: Vital Signs Internal Script (Merged) ****
    // This logic is for elements *inside* the modal, so it can be initialized once.
    
    // --- History Table Logic (Vital Signs) (MODIFIED) ---
    const vsHistoryData = [
        { id: 1, datetimeSort: '2025-12-31T17:00:00', datetime: '31 Dec 2025 17:00', bp: '140/90', pulse: 92, hr: 95, rr: 22, temp: 100.5, fbs: 150, crt: '<2', mucous: 'Pale', pulse_quality: 'Weak', lung: 'Crackles', heart: 'Murmur', loc: 'E3V4M5', pain: 7, cyanosis: false, seizure: true, arrest: false, note: 'Post-seizure.' },
        { id: 2, datetimeSort: '2025-12-31T13:00:00', datetime: '31 Dec 2025 13:00', bp: '100/60', pulse: 120, hr: 120, rr: 28, temp: 97.0, fbs: 80, crt: '>2', mucous: 'Blue', pulse_quality: 'Thready', lung: 'Wheeze', heart: 'Normal', loc: 'E1V1M1', pain: 10, cyanosis: true, seizure: false, arrest: true, note: 'Code Blue.' },
        { id: 3, datetimeSort: '2025-12-31T09:00:00', datetime: '31 Dec 2025 09:00', bp: '118/79', pulse: 70, hr: 72, rr: 18, temp: 98.5, fbs: 110, crt: '<2', mucous: 'Normal', pulse_quality: 'Strong', lung: 'Normal', heart: 'Normal', loc: 'E4V5M6', pain: 3, cyanosis: false, seizure: false, arrest: false, note: 'Post-meal.' },
        { id: 4, datetimeSort: '2025-12-30T21:00:00', datetime: '30 Dec 2025 21:00', bp: '116/78', pulse: 68, hr: null, rr: 16, temp: 98.2, fbs: 105, crt: '<2', mucous: 'Normal', pulse_quality: 'Strong', lung: 'Normal', heart: 'Normal', loc: 'E4V5M6', pain: 3, cyanosis: false, seizure: false, arrest: false, note: 'Sleeping.' },
        { id: 5, datetimeSort: '2025-12-30T17:00:00', datetime: '30 Dec 2025 17:00', bp: '120/80', pulse: 72, hr: 72, rr: 18, temp: 98.6, fbs: 100, crt: '<2', mucous: 'Normal', pulse_quality: 'Strong', lung: 'Normal', heart: 'Normal', loc: 'E4V5M6', pain: 3, cyanosis: false, seizure: false, arrest: false, note: '' },
        { id: 6, datetimeSort: '2025-12-30T13:00:00', datetime: '30 Dec 2025 13:00', bp: '124/82', pulse: 76, hr: 80, rr: 18, temp: 99.0, fbs: 98, crt: '<2', mucous: 'Normal', pulse_quality: '', lung: 'Normal', heart: 'Normal', loc: 'E4V5M6', pain: 4, cyanosis: false, seizure: false, arrest: false, note: 'Agitated.' },
        { id: 7, datetimeSort: '2025-12-30T09:00:00', datetime: '30 Dec 2025 09:00', bp: '120/80', pulse: 72, hr: 72, rr: 18, temp: 98.6, fbs: 112, crt: '<2', mucous: 'Normal', pulse_quality: 'Strong', lung: 'Normal', heart: 'Normal', loc: 'E4V5M6', pain: 3, cyanosis: false, seizure: false, arrest: false, note: '' },
        { id: 8, datetimeSort: '2025-12-29T21:00:00', datetime: '29 Dec 2025 21:00', bp: '118/78', pulse: null, hr: null, rr: 18, temp: 98.4, fbs: 108, crt: '<2', mucous: 'Normal', pulse_quality: 'Strong', lung: 'Normal', heart: 'Normal', loc: 'E4V5M6', pain: 3, cyanosis: false, seizure: false, arrest: false, note: '' },
        { id: 9, datetimeSort: '2025-12-29T17:00:00', datetime: '29 Dec 2025 17:00', bp: '130/85', pulse: 80, hr: 80, rr: 20, temp: 99.1, fbs: 120, crt: '2', mucous: 'Dry', pulse_quality: 'Bounding', lung: 'Rhonchi', heart: 'Normal', loc: 'E3V4M5', pain: 5, cyanosis: true, seizure: false, arrest: false, note: 'Episode of SOB.' },
        { id: 10, datetimeSort: '2025-12-29T13:00:00', datetime: '29 Dec 2025 13:00', bp: '122/80', pulse: 74, hr: 75, rr: 18, temp: 98.6, fbs: null, crt: '<2', mucous: 'Normal', pulse_quality: 'Strong', lung: 'Normal', heart: 'Normal', loc: 'E4V5M6', pain: 4, cyanosis: false, seizure: false, arrest: false, note: '' },
    ];

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
});