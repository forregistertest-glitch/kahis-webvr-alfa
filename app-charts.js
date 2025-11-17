// This is app-charts.js

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