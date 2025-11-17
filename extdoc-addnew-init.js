// This is extdoc-addnew-init.js
// ทำหน้าที่ "เริ่มต้นการทำงาน" (Initialize) ของหน้า Ext Doc Add New

function initializeExtDocAddNewPage() {

    // --- 1. Logic สำหรับ Dropdown (จาก Extdoc_Module_Addnew.html) ---
    
    // (เรียกใช้ฟังก์ชันจาก extdoc-logic.js)
    styleExtDocDropdowns(); 

    const dropdowns = document.querySelectorAll('#emr-content-placeholder select[required]');
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

    // --- 2. Logic ปุ่ม Clear All (จาก Extdoc_Module_Addnew.html) ---
    const clearButton = document.getElementById('clear-filters-btn');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            // (เรียกใช้ฟังก์ชันจาก extdoc-logic.js)
            // นี่คือเวอร์ชันที่เคลียร์ทุกอย่างเป็น "" (ว่างเปล่า)
            clearExtDocFilters(); 
        });
    }

    // --- 3. Logic ใหม่: เปิด Lightbox แบบอัลบั้ม (ตามที่คุณต้องการ) ---
    
    // 3a. รวบรวมรูปภาพทั้งหมดในหน้านี้
    const images = document.querySelectorAll('.clickable-img');
    const gallerySources = [];
    images.forEach(img => {
        gallerySources.push(img.src);
    });

    // 3b. แปลงเป็น JSON string เพื่อส่งให้ฟังก์ชัน
    const galleryData = JSON.stringify(gallerySources);

    // 3c. ผูก Event Click ให้รูปภาพแต่ละรูป
    images.forEach((image, index) => {
        image.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // (เรียกใช้ฟังก์ชันจาก extdoc-logic.js)
            openLightbox(galleryData); 
            
            // (เรียกใช้ฟังก์ชันจาก extdoc-logic.js)
            // บอก Lightbox ให้เริ่มแสดงรูปที่ index นี้
            showImage(index); 
        });
    });

    // --- 4. เรียก Lucide ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}