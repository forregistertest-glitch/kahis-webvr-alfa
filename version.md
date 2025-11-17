# KAHIS EMR PROTOTYPE - VERSION.MD
(เรียงลำดับจากใหม่ล่าสุดไปเก่าสุด)

## BETA 2.1 VERSION (Ext Doc Fix - "New Ext Doc" Button)
(17 พ.ย. 2025)

### Problem
หลังจากการผนวกรวมโมดูล Ext Doc (BETA 2.0) พบ Bug สำคัญ:
1.  ปุ่ม "New Ext Doc" ในแท็บย่อย (By Date, By Filter) ไม่ทำงาน
2.  การแก้ไขเบื้องต้นโดยใช้ `<a href="Extdoc_Module_Addnew.html">` ทำให้เกิด Error "Cannot GET /Extdoc_Module_Addnew.html"
3.  **สาเหตุ:** เราพยายาม "ลิงก์" (Navigation) ไปยังหน้าใหม่ แทนที่จะ "โหลด" (Module Loading) เข้ามาในโครงสร้าง SPA (Single Page Application) ของ `index.html`

### Solution (The 5-Step Fix)
เราได้ดำเนินการแก้ไข 5 ขั้นตอนเพื่อผนวกรวมหน้า `Extdoc_Module_Addnew.html` เข้ามาในระบบ SPA อย่างถูกต้อง:

1.  **สร้างชิ้นส่วน HTML:** สร้างไฟล์ `extdoc_page_addnew.html` (โดย "ดูด" เนื้อหา `<main>...</main>` มาจาก `Extdoc_Module_Addnew.html`)
2.  **สร้างไฟล์ Logic ใหม่:** สร้างไฟล์ `extdoc-addnew-init.js` เพื่อทำหน้าที่:
    * ผูก Logic ให้กับ Dropdowns และปุ่ม "Clear all" ในหน้า Add New
    * **อัปเกรด Lightbox:** เพิ่ม Logic ให้รูปภาพทั้ง 9 รูปในหน้า Add New สามารถเปิด **Album Lightbox** (ตัวเดียวกับที่ใช้ในตาราง) และกด Next/Previous ได้ (โดยเรียกใช้ฟังก์ชัน `openLightbox` และ `showImage` จาก `extdoc-logic.js`)
3.  **อัปเกรด `app-logic.js`:** "สอน" ฟังก์ชัน `loadModuleContent` ให้รู้จักกับ `extdoc_page_addnew.html` และสั่งให้เรียก `initializeExtDocAddNewPage()` เมื่อโหลดเสร็จ
4.  **อัปเกรด HTML Fragments:** แก้ไข `extdoc_tab_date.html` และ `extdoc_tab_filter.html` โดยเปลี่ยนปุ่ม "New Ext Doc" จาก `<a>` กลับไปเป็น `<button id="btn-goto-addnew">`
5.  **เชื่อมต่อ:**
    * **`extdoc-init.js`:** เพิ่ม Logic ให้ค้นหา `#btn-goto-addnew` และผูก Event Click ให้ไปเรียก `loadModuleContent('extdoc_page_addnew.html')`
    * **`index.html`**: เพิ่ม `<script src="extdoc-addnew-init.js"></script>` เพื่อให้ระบบรู้จักไฟล์ Logic ใหม่นี้

---

## BETA 2.0 VERSION (Ext Doc Integration - Concept)
(17 พ.ย. 2025)

### Concept
แผนการผนวกรวม (Integrate) ฟีเจอร์จากไฟล์ต้นแบบ `Extdoc_Module_...html` เข้ากับโครงสร้าง SPA (BETA 1.0) โดยยึดหลักการ "แยกไฟล์ย่อย" (Modularization) และ "ไม่กระทบของเก่า" (Non-destructive)

### Plan (The 9-Step Plan)
แผนการทำงาน 9 ขั้นตอนที่ใช้ในการผนวกรวมโมดูล Ext Doc:

1.  **สร้าง HTML Fragment:** สร้าง `extdoc_tab_date.html` (จาก `<main>` ของ `Extdoc_Module_Date_Default.html`)
2.  **สร้าง HTML Fragment:** สร้าง `extdoc_tab_filter.html` (จาก `<main>` ของ `Extdoc_Module_Filter.html`)
3.  **อัปเกรด `ext_doc_content.html`**: แก้ไขไฟล์เดิมให้เป็น "Container" ที่มีแท็บย่อย (By Date, By Filter) และมี `<div id="ext-doc-sub-content">`
4.  **อัปเกรด `index.html`**: ย้ายโค้ด HTML ของ **`#lightbox-album-modal`** (เวอร์ชันที่มี Next/Previous) มาไว้ใน `index.html` เพื่อให้เป็น Global Modal
5.  **สร้าง `extdoc-data.js`:** ย้ายข้อมูลดิบ `picsumImages`, `baseData`, `startDate` มาไว้ที่นี่
6.  **สร้าง `extdoc-logic.js`:** ย้ายฟังก์ชันการทำงาน (เช่น `renderTable`, `sortData`, `openLightbox`, `closeLightbox`, `showImage`, `styleExtDocDropdowns`) มาไว้ที่นี่
7.  **สร้าง `extdoc-init.js`:** สร้างฟังก์ชัน `initializeExtDocScripts()` และ `loadExtDocSubTab()` เพื่อควบคุมการโหลดแท็บย่อย, ผูก Event ให้ตาราง, และผูก Event ให้ปุ่ม Lightbox
8.  **อัปเกรด `app-logic.js`:** แก้ไข `loadModuleContent` ให้เรียก `initializeExtDocScripts()` เมื่อโหลด `ext_doc_content.html`
9.  **อัปเกรด `index.html`**: เพิ่มการเรียก `<script>` ใหม่ 3 ไฟล์ (`extdoc-data.js`, `extdoc-logic.js`, `extdoc-init.js`)

---

## BETA 1.0 VERSION (Core Refactor)
(16-17 พ.ย. 2025)

### Problem
ไฟล์ `app.js` ดั้งเดิม (จาก Alpha) มีขนาดใหญ่มาก (เกือบ 1,000 บรรทัด) โค้ดทั้งหมดรวมอยู่ใน Global Scope และ `DOMContentLoaded` ทำให้:
* การส่งโค้ดผ่านแชทล้มเหลวบ่อยครั้ง
* การบำรุงรักษา (Maintenance) และการแก้ไขทำได้ยาก
* Logic ของทุกโมดูลปนกัน

### Solution (The 8-Step Refactor)
ดำเนินการ Refactor (ปรับโครงสร้าง) ครั้งใหญ่ โดยแบ่งไฟล์ `app.js` ออกเป็นไฟล์ย่อยๆ 7 ไฟล์ตามหน้าที่ (Data, Logic, Init)

### File Structure (After Refactor)
โครงสร้างนี้ **ไม่รวม** โมดูล Ext Doc:

* **`app.js` (ไฟล์เดิม)**: ถูกแก้ไขให้สั้นลงเหลือเพียงตัวเรียกใช้ `DOMContentLoaded` ซึ่งจะเรียก `initializeApp()`
* **`app-data.js` (ใหม่):** เก็บข้อมูลดิบ (Hardcoded data) ทั้งหมด (`eyeExamHistoryData`, `categoryData`, `vsHistoryData`, `assessmentHistoryData`)
* **`app-helpers.js` (ใหม่):** เก็บฟังก์ชันช่วยเหลือทั่วไป (เช่น `copyToClipboard`, `showCopyMessage`)
* **`app-drawing.js` (ใหม่):** เก็บ Logic ทั้งหมดที่เกี่ยวกับ Fabric.js (การวาดภาพ Eye Exam)
* **`app-charts.js` (ใหม่):** เก็บ Logic ทั้งหมดที่เกี่ยวกับ Chart.js (ฟังก์ชัน `openBpChart`, `openVitalsChart`)
* **`app-logic.js` (ใหม่):** เก็บ Logic หลักของ SPA (เช่น `loadModuleContent`, `initializeTabSwitching`) และ Logic ของโมดูลที่โหลดแบบไดนามิก (เช่น `initializeAssessmentScripts`)
* **`app-init.js` (ใหม่):** เก็บโค้ดทั้งหมดที่เคยอยู่ใน `DOMContentLoaded` (เช่น การผูก Event ให้ Modals, Numpad, Problem List, Vital Signs)
* **`index.html` (ไฟล์เดิม)**: อัปเดตส่วน `<script>` ด้านล่างให้เรียกไฟล์ 7 ไฟล์นี้ตามลำดับ

---

## END ALPHA VERSION (Initial Analysis)
(16 พ.ย. 2025)

### บทวิเคราะห์โปรเจค (Project Analysis)
นี่คือโปรเจค Front-End สำหรับ **ระบบเวชระเบียนอิเล็กทรอนิกส์ (EMR)** ซึ่งดูเหมือนจะเป็นหน้าจอสำหรับสัตวแพทย์ (DVM) เพื่อบันทึกข้อมูลการตรวจรักษา โดยมีชื่อระบบคือ **KAHIS** โปรเจคนี้เป็นเว็บแอปพลิเคชันแบบหน้าเดียว (Single Page Application - SPA) ที่ใช้การโหลดเนื้อหาแบบไดนามิก

### 1. สถาปัตยกรรมและโครงสร้าง (Architecture)
* **`index.html` (ไฟล์หลัก):** ทำหน้าที่เป็น "Shell" หรือ "เปลือก" ของแอปพลิเคชัน มีโครงสร้างถาวร เช่น Header (เมนู), Pet Info Bar (ข้อมูลสัตว์เลี้ยง), และ Footer (ปุ่ม Vital Signs, Dark Mode)
* **`app.js` (ไฟล์ควบคุม):** นี่คือหัวใจของโปรเจค
* **ไฟล์ `.html` อื่นๆ (Module Content):** ไฟล์เช่น `assessment_content.html`, `subj_content.html`, `plan_content.html` ฯลฯ ไม่ใช่หน้าเว็บที่สมบูรณ์ แต่เป็น "ชิ้นส่วน" ของ HTML ที่จะถูกดึง (fetch) โดย `app.js` และนำมาแสดงในช่องว่าง `#emr-content-placeholder` ใน `index.html`

### 2. เทคโนโลยีหลักที่ใช้ (Technology Stack)
1.  **Tailwind CSS:** ใช้สำหรับจัดสไตล์และ Layout ทั้งหมด
2.  **Alpine.js:** ใช้จัดการ UI เล็กๆ น้อยๆ ที่มีการโต้ตอบ (Interactivity) เช่น การเปิด-ปิด Dropdown Menu ใน Header
3.  **Chart.js:** ใช้สำหรับสร้างกราฟที่แสดงใน Pop-up (เช่น กราฟ BP Chart และ Vital Signs Chart)
4.  **Fabric.js:** ใช้สำหรับทำ "Drawing Tool" (เครื่องมือวาดภาพ/เขียนข้อความ) บน `eyeexam.png`
5.  **Lucide Icons:** ใช้สำหรับไอคอนทั้งหมดในหน้าเว็บ

### 3. ฟีเจอร์หลัก (Key Features)
* **Dark Mode / Theme:** มีระบบสลับ Theme (Light/Dark) ซึ่งถูกกำหนดค่าสีไว้ใน `kahis-theme.css` (โดย Dark Mode เป็นธีมสีเบจ/น้ำตาล)
* **Modals (Pop-ups) ที่ซับซ้อน:** (Vital Signs, Eye Exam, Problem List) ที่มี Logic การทำงานภายในตัวเอง
* **Dynamic History Tables:** ตารางประวัติ (ใน Assessment, Vital Signs, Eye Exam) ถูกสร้างขึ้นด้วย JavaScript และมีระบบ Sort ข้อมูล
* **Client-Side Data:** ข้อมูลประวัติทั้งหมด (`vsHistoryData`, `eyeExamHistoryData`, `categoryData`) ถูกเก็บไว้ในตัวแปร JavaScript (Hardcoded)