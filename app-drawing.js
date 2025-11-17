// This is app-drawing.js

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