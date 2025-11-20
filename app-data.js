// This is app-data.js (BETA 5.2 - Data Structure Upgrade for Order Plan System)

// =================================================================
// START: ฐานข้อมูลกลาง (Central Activity Log) - Updated Schema
// =================================================================
// New Fields:
// - order_status: "Pending" (Plan), "Done" (Confirm), "Disable" (Cancel)
// - lis_process_status: "Waiting", "Accepted", "Completed", "Reported", "Cancel" (For LIS)
// - Timestamps: order_create_date, order_update_date, request_date
// - Patient Info: hn, pet_name, owner_name
// =================================================================

let activityLogData = [
    
    // --- [GROUP 1] VITAL SIGNS (ยังคงใช้โครงสร้างเดิมบางส่วน แต่เพิ่ม Field ใหม่ให้ครบ) ---
    {
        entry_id: "E-VS001", order_no: "ORD-VS001", acc_no: null, // VS ไม่มี Acc No
        activity_type: "Vital Signs", 
        order_status: "Done", lis_process_status: null, // VS ไม่ส่ง LIS
        
        hn: "52039575", pet_name: "คุณส้มจี๊ด(จี๊ดจ๊าด)", owner_name: "คุณพ่อส้มจี๊ด",
        
        effective_time: "31 Dec 2025, 17:00:00", 
        order_create_date: "31 Dec 2025, 17:01:15", order_update_date: "31 Dec 2025, 17:01:15", request_date: null,
        
        order_note: "",
        parameters: { Temp: '100.5', RR: '22', HR: '95', BP: '140/90', Pulse: '92', CRT: '<2', FBS: '150', MM: 'Pale', Lung: 'Crackles', Heart: 'Murmur', Pulse_Quality: 'Weak', LOC: 'E3V4M5', Pain: '7', Cyanosis: 'Yes', Seizure: 'Yes', Arrest: 'No', Note: 'Post-seizure.' },
        
        recorded_by: "User A (Tech)", dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "User A (Tech)", last_updated_on: "31 Dec 2025, 17:01:15", disable_remark: ""
    },
    {
        entry_id: "E-VS002", order_no: "ORD-VS002", acc_no: null,
        activity_type: "Vital Signs", 
        order_status: "Done", lis_process_status: null,
        
        hn: "52039575", pet_name: "คุณส้มจี๊ด(จี๊ดจ๊าด)", owner_name: "คุณพ่อส้มจี๊ด",

        effective_time: "30 Dec 2025, 09:00:00",
        order_create_date: "30 Dec 2025, 09:05:00", order_update_date: "30 Dec 2025, 09:05:00", request_date: null,

        order_note: "",
        parameters: { Temp: '98.5', RR: '20', HR: '88', BP: '120/80', Pulse: '88', CRT: '<2', FBS: '90', Note: 'Routine Check' },

        recorded_by: "User B (Nurse)", dvm: "Dr. BBB", department: "201 ฉุกเฉิน",
        last_updated_by: "User B (Nurse)", last_updated_on: "30 Dec 2025, 09:05:00", disable_remark: ""
    },


    // --- [GROUP 2] LAB ORDERS (LIS) - แสดงสถานะต่างๆ ---

    // 2.1 สถานะ DONE (ส่งแล้ว) -> มี Acc No, มี Request Date, มี LIS Status
    {
        entry_id: "E-LAB001", order_no: "ORD-LAB001", acc_no: "LIS-6801001", 
        activity_type: "LIS", 
        order_status: "Done", lis_process_status: "Completed", // ผลออกแล้ว
        
        hn: "52039575", pet_name: "คุณส้มจี๊ด(จี๊ดจ๊าด)", owner_name: "คุณพ่อส้มจี๊ด",

        effective_time: "31 Dec 2025, 10:00:00", // เวลาเก็บตัวอย่าง
        order_create_date: "31 Dec 2025, 09:50:00", // เวลาหมอกดสั่ง
        order_update_date: "31 Dec 2025, 10:05:00", // เวลาส่ง Lab
        request_date: "31 Dec 2025, 10:05:00",      // เวลาเกิด Acc No

        order_note: "",
        parameters: { tests: ["CBC", "BUN", "CRE"], note: "Pre-op check" },

        recorded_by: "Dr. AAA", dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "User A (Tech)", last_updated_on: "31 Dec 2025, 10:05:00", disable_remark: ""
    },
    {
        entry_id: "E-LAB002", order_no: "ORD-LAB002", acc_no: "LIS-6801002", 
        activity_type: "LIS", 
        order_status: "Done", lis_process_status: "Accepted", // Lab รับเรื่องแล้ว กำลังตรวจ
        
        hn: "52039575", pet_name: "คุณส้มจี๊ด(จี๊ดจ๊าด)", owner_name: "คุณพ่อส้มจี๊ด",

        effective_time: "31 Dec 2025, 14:00:00",
        order_create_date: "31 Dec 2025, 13:55:00",
        order_update_date: "31 Dec 2025, 14:10:00", 
        request_date: "31 Dec 2025, 14:10:00",

        order_note: "STAT Request",
        parameters: { tests: ["ELECTROLYTES", "LACTATE"], note: "Emergency" },

        recorded_by: "Dr. BBB", dvm: "Dr. BBB", department: "201 ฉุกเฉิน",
        last_updated_by: "User B (Nurse)", last_updated_on: "31 Dec 2025, 14:10:00", disable_remark: ""
    },

    // 2.2 สถานะ PENDING (PLAN) -> ยังไม่ส่ง, ไม่มี Acc No, แก้ไขได้
    {
        entry_id: "E-LAB003", order_no: "ORD-LAB003", acc_no: null, 
        activity_type: "LIS", 
        order_status: "Pending", lis_process_status: null,
        
        hn: "52039575", pet_name: "คุณส้มจี๊ด(จี๊ดจ๊าด)", owner_name: "คุณพ่อส้มจี๊ด",

        effective_time: "01 Jan 2026, 08:00:00", // Plan ไว้พรุ่งนี้เช้า
        order_create_date: "31 Dec 2025, 20:00:00", 
        order_update_date: "31 Dec 2025, 20:00:00", 
        request_date: null,

        order_note: "งดน้ำอาหารหลังเที่ยงคืน", // Note เตือนความจำ
        parameters: { tests: ["GLU", "LIPID_PROFILE"], note: "Fasting Blood Sugar" },

        recorded_by: "Dr. CCC", dvm: "Dr. CCC", department: "301 คลินิกพิเศษ",
        last_updated_by: "Dr. CCC", last_updated_on: "31 Dec 2025, 20:00:00", disable_remark: ""
    },

    // 2.3 สถานะ DISABLE (ยกเลิก Plan) -> ไม่มี Acc No, ขีดฆ่า
    {
        entry_id: "E-LAB004", order_no: "ORD-LAB004", acc_no: null, 
        activity_type: "LIS", 
        order_status: "Disable", lis_process_status: null,
        
        hn: "52039575", pet_name: "คุณส้มจี๊ด(จี๊ดจ๊าด)", owner_name: "คุณพ่อส้มจี๊ด",

        effective_time: "30 Dec 2025, 10:00:00",
        order_create_date: "30 Dec 2025, 09:00:00",
        order_update_date: "30 Dec 2025, 09:30:00", // เวลาที่กดยกเลิก
        request_date: null,

        order_note: "เจ้าของไม่สะดวกตรวจ",
        parameters: { tests: ["URINALYSIS"], note: "" },

        recorded_by: "Dr. AAA", dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "Dr. AAA", last_updated_on: "30 Dec 2025, 09:30:00", disable_remark: "Client refused"
    },


    // --- [GROUP 3] PATHOLOGY ORDERS (PATH) ---

    // 3.1 Path Done
    {
        entry_id: "E-PATH001", order_no: "ORD-PATH001", acc_no: "PATH-680050", 
        activity_type: "Pathology", 
        order_status: "Done", lis_process_status: "Waiting", // รอผลนาน
        
        hn: "52039575", pet_name: "คุณส้มจี๊ด(จี๊ดจ๊าด)", owner_name: "คุณพ่อส้มจี๊ด",

        effective_time: "29 Dec 2025, 15:30:00",
        order_create_date: "29 Dec 2025, 15:00:00",
        order_update_date: "29 Dec 2025, 15:35:00",
        request_date: "29 Dec 2025, 15:35:00",

        order_note: "",
        parameters: { 
            items: [{ name: "Biopsy - Small", price: 1200, site: "Skin mass left leg", history: "Growing for 2 months" }] 
        },

        recorded_by: "Dr. Surg", dvm: "Dr. Surg", department: "102 ศัลยกรรม",
        last_updated_by: "User Nurse", last_updated_on: "29 Dec 2025, 15:35:00", disable_remark: ""
    },

    // 3.2 Path Pending (Plan)
    {
        entry_id: "E-PATH002", order_no: "ORD-PATH002", acc_no: null, 
        activity_type: "Pathology", 
        order_status: "Pending", lis_process_status: null,
        
        hn: "52039575", pet_name: "คุณส้มจี๊ด(จี๊ดจ๊าด)", owner_name: "คุณพ่อส้มจี๊ด",

        effective_time: "05 Jan 2026, 10:00:00", // Plan ผ่าตัดอาทิตย์หน้า
        order_create_date: "31 Dec 2025, 11:00:00",
        order_update_date: "31 Dec 2025, 11:00:00",
        request_date: null,

        order_note: "เตรียมส่งชิ้นเนื้อหลังผ่าตัด",
        parameters: { 
            items: [{ name: "Biopsy - Whole Organ", price: 2500, site: "Spleen", history: "Splenic mass suspect Hemangiosarcoma" }] 
        },

        recorded_by: "Dr. Surg", dvm: "Dr. Surg", department: "102 ศัลยกรรม",
        last_updated_by: "Dr. Surg", last_updated_on: "31 Dec 2025, 11:00:00", disable_remark: ""
    }

];

// =================================================================
// END: ฐานข้อมูลกลาง
// =================================================================


// --- (คงไว้) Problem List Modal (Tagging Section - Global Data) ---
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


// --- (คงไว้) Assessment History Table Sort (Dynamic Content) ---
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

// =================================================================
// START: MASTER DATA - SERVICE CATALOG (FINAL PROD)
// Standards: HL7 Table 0074, LOINC, SNOMED CT, ISO 15189
// =================================================================

// 1. CLINICAL LABORATORY (LIS) - "Order Lab"
const labServiceCatalog = {
    "HEM": {
        name: "Hematology (โลหิตวิทยา)",
        icon: "droplet",
        items: [
            { id: "CBC", name: "Complete Blood Count (CBC)", loinc: "58410-2", snomed: "26604007", container: "Lavender (EDTA)", price: 350, type: "Panel" },
            { id: "BLP", name: "Blood Parasite Smear", loinc: "33360-9", snomed: "104237002", container: "Lavender (EDTA)", price: 150, type: "Test" },
            { id: "RETIC", name: "Reticulocyte Count", loinc: "14196-0", snomed: "250284001", container: "Lavender (EDTA)", price: 200, type: "Test" },
            { id: "PLT-MAN", name: "Platelet Count (Manual)", loinc: "777-3", snomed: "302484000", container: "Lavender (EDTA)", price: 150, type: "Test" },
            { id: "COAG", name: "Coagulation (PT/APTT)", loinc: "34528-9", snomed: "386053000", container: "Light Blue (Citrate)", price: 850, type: "Panel" },
            { id: "FIB", name: "Fibrinogen", loinc: "3255-7", snomed: "72844007", container: "Light Blue (Citrate)", price: 400, type: "Test" },
            { id: "XM", name: "Crossmatch (Major/Minor)", loinc: "34532-1", snomed: "112273007", container: "Red (Clot) + EDTA", price: 600, type: "Test" },
            { id: "COOMBS", name: "Coombs Test (Direct)", loinc: "1007-4", snomed: "165748006", container: "Lavender (EDTA)", price: 500, type: "Test" }
        ]
    },
    "CHEM": {
        name: "Clinical Chemistry (เคมีคลินิก)",
        icon: "flask-conical",
        items: [
            // --- Profiles ---
            { id: "PREOP", name: "Pre-anesthetic Panel (Liver/Renal/Glu/TP)", loinc: "24320-4", container: "Red/SST (Serum)", price: 650, type: "Panel" },
            { id: "COMP", name: "Comprehensive Panel (Full Organ)", loinc: "24323-8", container: "Red/SST (Serum)", price: 1400, type: "Panel" },
            { id: "LIVER", name: "Liver Panel (ALT/AST/ALP/GGT/Bili)", loinc: "24324-6", container: "Red/SST (Serum)", price: 550, type: "Panel" },
            { id: "RENAL", name: "Renal Panel (BUN/Creat/Phos/Elec)", loinc: "24325-3", container: "Red/SST (Serum)", price: 500, type: "Panel" },
            { id: "ELEC", name: "Electrolytes (Na/K/Cl)", loinc: "55418-8", container: "Red/SST (Serum)", price: 350, type: "Panel" },
            // --- Individual Tests ---
            { id: "ALB", name: "Albumin", loinc: "1751-7", snomed: "363787002", container: "Red/SST (Serum)", price: 100, type: "Test" },
            { id: "ALP", name: "Alkaline Phosphatase (ALP)", loinc: "6768-6", snomed: "104268008", container: "Red/SST (Serum)", price: 100, type: "Test" },
            { id: "ALT", name: "ALT (SGPT)", loinc: "1742-6", snomed: "104262002", container: "Red/SST (Serum)", price: 100, type: "Test" },
            { id: "AMYL", name: "Amylase", loinc: "1798-8", snomed: "104284007", container: "Red/SST (Serum)", price: 150, type: "Test" },
            { id: "AST", name: "AST (SGOT)", loinc: "1920-8", snomed: "104263007", container: "Red/SST (Serum)", price: 100, type: "Test" },
            { id: "BILI-T", name: "Bilirubin, Total", loinc: "1975-2", snomed: "302766008", container: "Red/SST (Serum)", price: 100, type: "Test" },
            { id: "BUN", name: "BUN (Blood Urea Nitrogen)", loinc: "3094-0", snomed: "365758003", container: "Red/SST (Serum)", price: 100, type: "Test" },
            { id: "CA", name: "Calcium, Total", loinc: "17861-6", snomed: "104639006", container: "Red/SST (Serum)", price: 120, type: "Test" },
            { id: "CHOL", name: "Cholesterol", loinc: "2093-3", snomed: "104295003", container: "Red/SST (Serum)", price: 120, type: "Test" },
            { id: "CK", name: "Creatine Kinase (CK)", loinc: "2157-6", snomed: "302495002", container: "Red/SST (Serum)", price: 150, type: "Test" },
            { id: "CREAT", name: "Creatinine", loinc: "2160-0", snomed: "70901006", container: "Red/SST (Serum)", price: 100, type: "Test" },
            { id: "GGT", name: "GGT", loinc: "2324-2", snomed: "42843000", container: "Red/SST (Serum)", price: 120, type: "Test" },
            { id: "GLOB", name: "Globulin", loinc: "2336-6", snomed: "365779005", container: "Red/SST (Serum)", price: 100, type: "Test" },
            { id: "GLU", name: "Glucose", loinc: "2345-7", snomed: "434912009", container: "Grey/Red", price: 100, type: "Test" },
            { id: "LIPA", name: "Lipase", loinc: "3040-3", snomed: "104285008", container: "Red/SST (Serum)", price: 200, type: "Test" },
            { id: "PHOS", name: "Phosphorus", loinc: "2777-1", snomed: "104642005", container: "Red/SST (Serum)", price: 120, type: "Test" },
            { id: "TP", name: "Total Protein", loinc: "2885-2", snomed: "104987003", container: "Red/SST (Serum)", price: 100, type: "Test" },
            { id: "TRIG", name: "Triglycerides", loinc: "2571-8", snomed: "104302007", container: "Red/SST (Serum)", price: 150, type: "Test" },
            { id: "BA", name: "Bile Acids (Pre/Post)", loinc: "14627-4", snomed: "29260002", container: "Red/SST (Serum)", price: 800, type: "Test" }
        ]
    },
    "SPEC": {
        name: "Special Chem & Biomarkers",
        icon: "star",
        items: [
            { id: "SDMA", name: "SDMA (Early Kidney)", loinc: "88729-9", snomed: "703638009", container: "Red/SST (Serum)", price: 600, type: "Test" },
            { id: "FRUC", name: "Fructosamine (Diabetes)", loinc: "15069-8", snomed: "104327001", container: "Red/SST (Serum)", price: 600, type: "Test" },
            { id: "CPL", name: "Spec cPL (Pancreatitis)", loinc: "N/A", snomed: "445283005", container: "Red/SST (Serum)", price: 800, type: "Test" },
            { id: "AMM", name: "Ammonia", loinc: "1634-5", snomed: "104286009", container: "Green (Heparin) *ICE*", price: 500, type: "Test" },
            { id: "LACT", name: "Lactate", loinc: "2524-7", snomed: "302782009", container: "Grey (Fluoride)", price: 400, type: "Test" },
            { id: "BNP", name: "NT-proBNP (Cardiac)", loinc: "47335-5", snomed: "414962008", container: "Red/SST (Serum)", price: 1500, type: "Test" },
            { id: "TROP", name: "Troponin I (Cardiac)", loinc: "42757-5", snomed: "391137006", container: "Red/SST (Serum)", price: 1200, type: "Test" }
        ]
    },
    "ENDO": {
        name: "Endocrine / Hormones",
        icon: "activity",
        items: [
            { id: "T4", name: "Total T4 (Thyroid)", loinc: "3026-2", snomed: "363887008", container: "Red/SST (Serum)", price: 600, type: "Test" },
            { id: "FT4", name: "Free T4", loinc: "3024-7", snomed: "104482002", container: "Red/SST (Serum)", price: 900, type: "Test" },
            { id: "TSH", name: "cTSH (Canine TSH)", loinc: "3016-3", snomed: "363886004", container: "Red/SST (Serum)", price: 800, type: "Test" },
            { id: "CORT", name: "Cortisol (Baseline)", loinc: "2143-6", snomed: "390762006", container: "Red/SST (Serum)", price: 800, type: "Test" },
            { id: "PROG", name: "Progesterone", loinc: "2660-0", snomed: "104442006", container: "Red (Serum) NO GEL", price: 1200, type: "Test" },
            { id: "INS", name: "Insulin", loinc: "2496-5", snomed: "365799003", container: "Red/SST (Serum)", price: 1000, type: "Test" }
        ]
    },
    "DRUG": {
        name: "Therapeutic Drug Level",
        icon: "pill",
        items: [
            { id: "PHENO", name: "Phenobarbital Level", loinc: "3948-7", snomed: "390688003", container: "Red (Serum) NO GEL", price: 1000, type: "Test" },
            { id: "KBR", name: "Bromide (KBr) Level", loinc: "3383-2", snomed: "390690009", container: "Red (Serum)", price: 1500, type: "Send-out" },
            { id: "DIGOX", name: "Digoxin Level", loinc: "3562-6", snomed: "390710006", container: "Red (Serum)", price: 1200, type: "Test" }
        ]
    },
    "IMM": {
        name: "Immunology / Serology (ภูมิคุ้มกัน)",
        icon: "shield-check",
        items: [
            { id: "4DX", name: "4Dx Plus (HW/E.canis/Lyme/Ana)", loinc: "55436-0", container: "Lavender/Red", price: 950, type: "Rapid" },
            { id: "HW-AG", name: "Heartworm Antigen", loinc: "25331-0", snomed: "52732006", container: "Lavender/Red", price: 450, type: "Rapid" },
            { id: "E-CANIS", name: "E.canis Antibody", loinc: "47988-1", snomed: "25213006", container: "Lavender/Red", price: 500, type: "Rapid" },
            { id: "PARVO", name: "Canine Parvovirus Ag (CPV)", loinc: "6313-5", snomed: "115269002", container: "Feces Swab", price: 500, type: "Rapid" },
            { id: "CDV-AG", name: "Canine Distemper Ag (CDV)", loinc: "6310-1", snomed: "5301005", container: "Conjunctival Swab", price: 500, type: "Rapid" },
            { id: "CCV-AG", name: "Canine Coronavirus Ag", loinc: "6307-7", snomed: "28142008", container: "Feces Swab", price: 500, type: "Rapid" },
            { id: "FIVFELV", name: "FIV Ab / FeLV Ag Combo", loinc: "55435-2", snomed: "406200008", container: "Lavender/Red", price: 750, type: "Rapid" },
            { id: "FPV-AG", name: "Feline Panleukopenia Ag", loinc: "74422-7", snomed: "17673004", container: "Feces Swab", price: 500, type: "Rapid" },
            { id: "LEPTO", name: "Leptospirosis IgM (Rapid)", loinc: "6464-6", snomed: "54996000", container: "Red/SST (Serum)", price: 600, type: "Rapid" },
            { id: "GIARDIA", name: "Giardia Antigen", loinc: "22289-3", snomed: "12184005", container: "Feces", price: 500, type: "Rapid" },
            { id: "RABIES", name: "Rabies Titer (FAVN)", loinc: "6540-3", snomed: "14150003", container: "Red (Serum) NO GEL", price: 3500, type: "Send-out" }
        ]
    },
    "URN": {
        name: "Urinalysis (ปัสสาวะ)",
        icon: "test-tube",
        items: [
            { id: "UA", name: "Urinalysis (Complete)", loinc: "24356-8", snomed: "27171005", container: "Sterile Cup", price: 250, type: "Panel" },
            { id: "UPC", name: "Urine Protein:Creatinine Ratio", loinc: "2889-4", snomed: "444108006", container: "Sterile Cup", price: 400, type: "Test" },
            { id: "U-CULT", name: "Urine Culture (Aerobic)", loinc: "630-4", snomed: "443571007", container: "Sterile Cup/Tube", price: 800, type: "Send-out" }
        ]
    }
};

// 2. ANATOMIC PATHOLOGY ("Order Pathology")
const pathologyServiceCatalog = {
    "CY": {
        name: "Cytology (เซลล์วิทยา)",
        icon: "microscope",
        items: [
            { id: "CY01", name: "Cytology - 1 Site (FNA/Impression)", loinc: "11529-5", snomed: "1287000", price: 400, req_site: true },
            { id: "CY02", name: "Cytology - 2 Sites", loinc: "11529-5", snomed: "1287000", price: 700, req_site: true },
            { id: "CY03", name: "Cytology - >2 Sites", loinc: "11529-5", snomed: "1287000", price: 1000, req_site: true },
            { id: "CY-FL", name: "Fluid Analysis (Body Fluid)", loinc: "33716-2", snomed: "118234000", price: 600, req_site: true },
            { id: "CY-EAR", name: "Ear Swab Cytology", loinc: "47528-5", snomed: "447958003", price: 300, req_site: false }
        ]
    },
    "SP": {
        name: "Biopsy / Histopath (ชิ้นเนื้อ)",
        icon: "file-text", 
        items: [
            { id: "SP-S", name: "Biopsy - Small / Routine (< 5 cm)", loinc: "22636-5", snomed: "39142007", price: 1200, req_site: true },
            { id: "SP-L", name: "Biopsy - Large / Complex (> 5 cm)", loinc: "22633-2", snomed: "39142007", price: 1800, req_site: true },
            { id: "SP-ORG", name: "Biopsy - Whole Organ / Limb", loinc: "22639-9", snomed: "39142007", price: 2500, req_site: true },
            { id: "SP-REV", name: "Histopathology Review (2nd Opinion)", loinc: "22638-1", snomed: "183746001", price: 1500, req_site: true }
        ]
    },
    "MB": {
        name: "Microbiology (เพาะเชื้อ)",
        icon: "bug",
        items: [
            { id: "CULT-AER", name: "Aerobic Culture & Sensitivity", loinc: "600-7", snomed: "443463007", price: 800, req_site: true },
            { id: "CULT-ANA", name: "Anaerobic Culture", loinc: "635-3", snomed: "443464001", price: 1000, req_site: true },
            { id: "CULT-FUNG", name: "Fungal Culture (Dermatophyte)", loinc: "580-1", snomed: "104246007", price: 600, req_site: true },
            { id: "HEMO", name: "Hemoculture (Blood Culture)", loinc: "606-4", snomed: "30088009", price: 1200, req_site: false },
            { id: "ST-GRAM", name: "Gram Stain", loinc: "664-3", snomed: "104229005", price: 150, req_site: true }
        ]
    },
    "MOL": {
        name: "Molecular / PCR",
        icon: "dna",
        items: [
            { id: "PCR-BLP", name: "PCR Blood Parasite Panel", loinc: "23833-7", price: 2500, req_site: false },
            { id: "PCR-RESP", name: "PCR Respiratory Panel (Cat/Dog)", loinc: "95212-7", price: 2200, req_site: false },
            { id: "PCR-LEPTO", name: "PCR Leptospirosis", loinc: "20969-2", price: 1500, req_site: false },
            { id: "PCR-FIP", name: "PCR FIP (Feline Coronavirus)", loinc: "30247-1", price: 2800, req_site: true }
        ]
    }
};