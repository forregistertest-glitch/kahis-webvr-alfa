// This is extdoc-data.js
// เก็บข้อมูลดิบสำหรับโมดูล Ext Doc

const picsumImages = [
    'https://picsum.photos/seed/img1/800/600',
    'https://picsum.photos/seed/img2/800/600',
    'https://picsum.photos/seed/img3/800/600',
    'https://picsum.photos/seed/img4/800/600'
];

const baseData = [
    { dvm: "AAA", department: "101", docType: "อายุรกรรม", img: "3", pdf: "1", note: "มีรูป 3 รูป", status: "", images: [picsumImages[0], picsumImages[1], picsumImages[2]] },
    { dvm: "BBB", department: "102", docType: "ตรวจศัลยกรรม", img: "1", pdf: "0", note: "มีรูปเดียว", status: "", images: [picsumImages[1]] },
    { dvm: "CCC", department: "101", docType: "โรคหัวใจ", img: "0", pdf: "1", note: "N/A ไม่มี", status: "Disable", images: [] }, // ไม่มีรูป
    { dvm: "AAA", department: "103", docType: "โรคไต", img: "2", pdf: "2", note: "มี 2 รูป", status: "", images: [picsumImages[2], picsumImages[3]] },
    { dvm: "BBB", department: "101", docType: "ระบบประสาท", img: "1", pdf: "0", note: "99", status: "", images: [picsumImages[3]] },
    { dvm: "CCC", department: "102", docType: "เอกซเรย์", img: "0", pdf: "0", note: "99", status: "", images: [] }, // ไม่มีรูป
    { dvm: "AAA", department: "101", docType: "อัลตราซาวด์", img: "4", pdf: "1", note: "อัลบั้ม 4 รูป", status: "", images: picsumImages },
    { dvm: "BBB", department: "103", docType: "CT-SCAN", img: "1", pdf: "1", note: "99", status: "", images: [picsumImages[0]] },
    { dvm: "CCC", department: "101", docType: "MRI", img: "0", pdf: "0", note: "99", status: "Disable", images: [] }, // ไม่มีรูป
    { dvm: "AAA", department: "102", docType: "RT", img: "2", pdf: "1", note: "99", status: "Disable", images: [picsumImages[1], picsumImages[3]] }
];

const startDate = new Date(2025, 11, 31, 20, 30, 0); 

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];