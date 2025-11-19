// This is app-data.js (BETA 4.0 - Step 7 - 40 new entries added)

// =================================================================
// START: (ใหม่) ฐานข้อมูลกลาง (Central Activity Log)
// =================================================================
let activityLogData = [
    
    // --- (VS-Done: 20 รายการ) ---
    {
        entry_id: "E-001", order_no: "ORD-001", acc_no: "VS-001", activity_type: "Vital Signs", status: "Done",
        effective_time: "31 Dec 2025, 17:00:00", target_time: null, order_note: "",
        parameters: { Temp: '100.5', RR: '22', HR: '95', BP: '140/90', Pulse: '92', CRT: '<2', FBS: '150', MM: 'Pale', Lung: 'Crackles', Heart: 'Murmur', Pulse_Quality: 'Weak', LOC: 'E3V4M5', Pain: '7', Cyanosis: 'Yes', Seizure: 'Yes', Arrest: 'No', Note: 'Post-seizure.' },
        recorded_by: "User A (Tech)", recorded_on: "31 Dec 2025, 17:01:15", dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "User A (Tech)", last_updated_on: "31 Dec 2025, 17:01:15", disable_remark: ""
    },
    {
        entry_id: "E-006", order_no: "ORD-005", acc_no: "VS-003", activity_type: "Vital Signs", status: "Done",
        effective_time: "30 Dec 2025, 21:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.2', RR: '16', HR: null, BP: '116/78', Pulse: '68', CRT: '<2', FBS: '105', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '3', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: 'Sleeping.' },
        recorded_by: "User A (Tech)", recorded_on: "30 Dec 2025, 21:00:30", dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "User A (Tech)", last_updated_on: "30 Dec 2025, 21:00:30", disable_remark: ""
    },
    {
        entry_id: "E-007", order_no: "ORD-006", acc_no: "VS-004", activity_type: "Vital Signs", status: "Done",
        effective_time: "29 Dec 2025, 17:00:00", target_time: null, order_note: "",
        parameters: { Temp: '99.1', RR: '20', HR: '80', BP: '130/85', Pulse: '80', CRT: '2', FBS: '120', MM: 'Dry', Lung: 'Rhonchi', Heart: 'Normal', Pulse_Quality: 'Bounding', LOC: 'E3V4M5', Pain: '5', Cyanosis: 'Yes', Seizure: 'No', Arrest: 'No', Note: 'Episode of SOB.' },
        recorded_by: "User B (Nurse)", recorded_on: "29 Dec 2025, 17:02:00", dvm: "Dr. BBB", department: "201 ฉุกเฉิน",
        last_updated_by: "User B (Nurse)", last_updated_on: "29 Dec 2025, 17:02:00", disable_remark: ""
    },
    {
        entry_id: "E-008", order_no: "ORD-007", acc_no: "VS-005", activity_type: "Vital Signs", status: "Done",
        effective_time: "29 Dec 2025, 09:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.5', RR: '18', HR: '72', BP: '118/79', Pulse: '70', CRT: '<2', FBS: '110', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '3', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: 'Post-meal.' },
        recorded_by: "User C (Tech)", recorded_on: "29 Dec 2025, 09:01:30", dvm: "Dr. CCC", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "29 Dec 2025, 09:01:30", disable_remark: ""
    },
    {
        entry_id: "E-009", order_no: "ORD-008", acc_no: "VS-006", activity_type: "Vital Signs", status: "Done",
        effective_time: "28 Dec 2025, 17:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.6', RR: '18', HR: '72', BP: '120/80', Pulse: '72', CRT: '<2', FBS: '100', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '3', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: '' },
        recorded_by: "User A (Tech)", recorded_on: "28 Dec 2025, 17:00:50", dvm: null, department: "101 อายุรกรรม",
        last_updated_by: "User A (Tech)", last_updated_on: "28 Dec 2025, 17:00:50", disable_remark: ""
    },
    {
        entry_id: "E-010", order_no: "ORD-009", acc_no: "VS-007", activity_type: "Vital Signs", status: "Done",
        effective_time: "28 Dec 2025, 13:00:00", target_time: null, order_note: "",
        parameters: { Temp: '99.0', RR: '18', HR: '80', BP: '124/82', Pulse: '76', CRT: '<2', FBS: '98', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: '', LOC: 'E4V5M6', Pain: '4', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: 'Agitated.' },
        recorded_by: "User B (Nurse)", recorded_on: "28 Dec 2025, 13:01:00", dvm: "Dr. BBB", department: "201 ฉุกเฉิน",
        last_updated_by: "User B (Nurse)", last_updated_on: "28 Dec 2025, 13:01:00", disable_remark: ""
    },
    {
        entry_id: "E-011", order_no: "ORD-010", acc_no: "VS-008", activity_type: "Vital Signs", status: "Done",
        effective_time: "28 Dec 2025, 09:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.6', RR: '18', HR: '72', BP: '120/80', Pulse: '72', CRT: '<2', FBS: '112', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '3', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: '' },
        recorded_by: "User C (Tech)", recorded_on: "28 Dec 2025, 09:02:10", dvm: "Dr. CCC", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "28 Dec 2025, 09:02:10", disable_remark: ""
    },
    {
        entry_id: "E-012", order_no: "ORD-011", acc_no: "VS-009", activity_type: "Vital Signs", status: "Done",
        effective_time: "27 Dec 2025, 21:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.4', RR: '18', HR: null, BP: '118/78', Pulse: null, CRT: '<2', FBS: '108', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '3', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: '' },
        recorded_by: "User A (Tech)", recorded_on: "27 Dec 2025, 21:01:00", dvm: null, department: "101 อายุรกรรม",
        last_updated_by: "User A (Tech)", last_updated_on: "27 Dec 2025, 21:01:00", disable_remark: ""
    },
    {
        entry_id: "E-013", order_no: "ORD-012", acc_no: "VS-010", activity_type: "Vital Signs", status: "Done",
        effective_time: "27 Dec 2025, 13:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.6', RR: '18', HR: '75', BP: '122/80', Pulse: '74', CRT: '<2', FBS: null, MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '4', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: '' },
        recorded_by: "User B (Nurse)", recorded_on: "27 Dec 2025, 13:00:30", dvm: "Dr. BBB", department: "201 ฉุกเฉิน",
        last_updated_by: "User B (Nurse)", last_updated_on: "27 Dec 2025, 13:00:30", disable_remark: ""
    },
    {
        entry_id: "E-014", order_no: "ORD-013", acc_no: "VS-011", activity_type: "Vital Signs", status: "Done",
        effective_time: "27 Dec 2025, 09:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.8', RR: '18', HR: '70', BP: '120/80', Pulse: '70', CRT: '<2', FBS: '100', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '3', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: 'Admit' },
        recorded_by: "User C (Tech)", recorded_on: "27 Dec 2025, 09:01:00", dvm: "Dr. CCC", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "27 Dec 2025, 09:01:00", disable_remark: ""
    },
    {
        entry_id: "E-101", order_no: "ORD-101", acc_no: "VS-101", activity_type: "Vital Signs", status: "Done",
        effective_time: "26 Dec 2025, 17:00:00", target_time: null, order_note: "",
        parameters: { Temp: '99.2', RR: '20', HR: '80', BP: '130/85', Pulse: '80', CRT: '<2', FBS: '115', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '2', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: 'Pre-check' },
        recorded_by: "User A (Tech)", recorded_on: "26 Dec 2025, 17:01:00", dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "User A (Tech)", last_updated_on: "26 Dec 2025, 17:01:00", disable_remark: ""
    },
    {
        entry_id: "E-102", order_no: "ORD-102", acc_no: "VS-102", activity_type: "Vital Signs", status: "Done",
        effective_time: "26 Dec 2025, 13:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.7', RR: '18', HR: '75', BP: '125/80', Pulse: '75', CRT: '<2', FBS: '105', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '3', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: '' },
        recorded_by: "User B (Nurse)", recorded_on: "26 Dec 2025, 13:01:00", dvm: "Dr. BBB", department: "201 ฉุกเฉิน",
        last_updated_by: "User B (Nurse)", last_updated_on: "26 Dec 2025, 13:01:00", disable_remark: ""
    },
    {
        entry_id: "E-103", order_no: "ORD-103", acc_no: "VS-103", activity_type: "Vital Signs", status: "Done",
        effective_time: "26 Dec 2025, 09:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.4', RR: '16', HR: '70', BP: '120/78', Pulse: '70', CRT: '<2', FBS: '102', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '2', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: '' },
        recorded_by: "User C (Tech)", recorded_on: "26 Dec 2025, 09:01:00", dvm: "Dr. CCC", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "26 Dec 2025, 09:01:00", disable_remark: ""
    },
    {
        entry_id: "E-104", order_no: "ORD-104", acc_no: "VS-104", activity_type: "Vital Signs", status: "Done",
        effective_time: "25 Dec 2025, 17:00:00", target_time: null, order_note: "",
        parameters: { Temp: '99.0', RR: '20', HR: '85', BP: '130/82', Pulse: '85', CRT: '<2', FBS: '110', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '3', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: 'Anxious' },
        recorded_by: "User A (Tech)", recorded_on: "25 Dec 2025, 17:01:00", dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "User A (Tech)", last_updated_on: "25 Dec 2025, 17:01:00", disable_remark: ""
    },
    {
        entry_id: "E-105", order_no: "ORD-105", acc_no: "VS-105", activity_type: "Vital Signs", status: "Done",
        effective_time: "25 Dec 2025, 13:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.8', RR: '18', HR: '78', BP: '122/80', Pulse: '78', CRT: '<2', FBS: '100', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '2', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: '' },
        recorded_by: "User B (Nurse)", recorded_on: "25 Dec 2025, 13:01:00", dvm: "Dr. BBB", department: "201 ฉุกเฉิน",
        last_updated_by: "User B (Nurse)", last_updated_on: "25 Dec 2025, 13:01:00", disable_remark: ""
    },
    {
        entry_id: "E-106", order_no: "ORD-106", acc_no: "VS-106", activity_type: "Vital Signs", status: "Done",
        effective_time: "25 Dec 2025, 09:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.6', RR: '18', HR: '74', BP: '120/80', Pulse: '74', CRT: '<2', FBS: '103', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '2', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: '' },
        recorded_by: "User C (Tech)", recorded_on: "25 Dec 2025, 09:01:00", dvm: "Dr. CCC", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "25 Dec 2025, 09:01:00", disable_remark: ""
    },
    {
        entry_id: "E-107", order_no: "ORD-107", acc_no: "VS-107", activity_type: "Vital Signs", status: "Done",
        effective_time: "24 Dec 2025, 17:00:00", target_time: null, order_note: "",
        parameters: { Temp: '99.5', RR: '22', HR: '90', BP: '135/88', Pulse: '90', CRT: '<2', FBS: '120', MM: 'Normal', Lung: 'Normal', Heart: 'Murmur G2', Pulse_Quality: 'Bounding', LOC: 'E4V5M6', Pain: '4', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: 'Excited' },
        recorded_by: "User A (Tech)", recorded_on: "24 Dec 2025, 17:01:00", dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "User A (Tech)", last_updated_on: "24 Dec 2025, 17:01:00", disable_remark: ""
    },
    {
        entry_id: "E-108", order_no: "ORD-108", acc_no: "VS-108", activity_type: "Vital Signs", status: "Done",
        effective_time: "24 Dec 2025, 13:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.9', RR: '18', HR: '80', BP: '124/80', Pulse: '80', CRT: '<2', FBS: '108', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '3', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: '' },
        recorded_by: "User B (Nurse)", recorded_on: "24 Dec 2025, 13:01:00", dvm: "Dr. BBB", department: "201 ฉุกเฉิน",
        last_updated_by: "User B (Nurse)", last_updated_on: "24 Dec 2025, 13:01:00", disable_remark: ""
    },
    {
        entry_id: "E-109", order_no: "ORD-109", acc_no: "VS-109", activity_type: "Vital Signs", status: "Done",
        effective_time: "24 Dec 2025, 09:00:00", target_time: null, order_note: "",
        parameters: { Temp: '98.6', RR: '18', HR: '76', BP: '120/80', Pulse: '76', CRT: '<2', FBS: '105', MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '2', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: '' },
        recorded_by: "User C (Tech)", recorded_on: "24 Dec 2025, 09:01:00", dvm: "Dr. CCC", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "24 Dec 2025, 09:01:00", disable_remark: ""
    },
    {
        entry_id: "E-110", order_no: "ORD-110", acc_no: "VS-110", activity_type: "Vital Signs", status: "Done",
        effective_time: "23 Dec 2025, 17:00:00", target_time: null, order_note: "",
        parameters: { Temp: '101.0', RR: '24', HR: '100', BP: '140/90', Pulse: '100', CRT: '<2', FBS: '130', MM: 'Tacky', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '5', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: 'Slightly febrile' },
        recorded_by: "User A (Tech)", recorded_on: "23 Dec 2025, 17:01:00", dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "User A (Tech)", last_updated_on: "23 Dec 2025, 17:01:00", disable_remark: ""
    },

    // --- (VS-Cancelled: 2 รายการ) ---
    {
        entry_id: "E-002", order_no: "ORD-002", acc_no: "VS-002", activity_type: "Vital Signs", status: "Cancelled",
        effective_time: "31 Dec 2025, 13:00:00", target_time: null, order_note: "",
        parameters: { Temp: '97.0', RR: '28', HR: '120', BP: '100/60', Pulse: '120', CRT: '>2', FBS: '80', MM: 'Blue', Lung: 'Wheeze', Heart: 'Normal', Pulse_Quality: 'Thready', LOC: 'E1V1M1', Pain: '10', Cyanosis: 'Yes', Seizure: 'No', Arrest: 'Yes', Note: 'Code Blue.' },
        recorded_by: "User B (Nurse)", recorded_on: "31 Dec 2025, 13:05:00", dvm: "Dr. BBB", department: "201 ฉุกเฉิน",
        last_updated_by: "Dr. BBB", last_updated_on: "31 Dec 2025, 13:05:00", disable_remark: "บันทึกผิด (Wrong patient)"
    },
    {
        entry_id: "E-015", order_no: "ORD-014", acc_no: "VS-012", activity_type: "Vital Signs", status: "Cancelled",
        effective_time: "26 Dec 2025, 10:00:00", target_time: null, order_note: "",
        parameters: { Temp: '99.0', RR: '20', HR: '80', BP: '130/80', Pulse: '80', CRT: '<2', FBS: null, MM: 'Normal', Lung: 'Normal', Heart: 'Normal', Pulse_Quality: 'Strong', LOC: 'E4V5M6', Pain: '4', Cyanosis: 'No', Seizure: 'No', Arrest: 'No', Note: 'Test Cancel' },
        recorded_by: "User A (Tech)", recorded_on: "26 Dec 2025, 10:05:00", dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "Dr. AAA", last_updated_on: "26 Dec 2025, 10:05:00", disable_remark: "DVM request cancel."
    },

    // --- (VS-Order: 3 รายการ) ---
    {
        entry_id: "E-003", order_no: "ORD-003", acc_no: null, activity_type: "Vital Signs", status: "Order",
        effective_time: null, target_time: "31 Dec 2025, 18:00:00", order_note: "Monitor Q4H (Start 18:00)",
        parameters: {}, recorded_by: "Dr. CCC (DVM)", recorded_on: "31 Dec 2025, 16:00:00", dvm: "Dr. CCC", department: "301 คลินิกพิเศษ",
        last_updated_by: "Dr. CCC (DVM)", last_updated_on: "31 Dec 2025, 16:00:00", disable_remark: ""
    },
    {
        entry_id: "E-016", order_no: "ORD-015", acc_no: null, activity_type: "Vital Signs", status: "Order",
        effective_time: null, target_time: "31 Dec 2025, 22:00:00", order_note: "Monitor Q4H",
        parameters: {}, recorded_by: "Dr. CCC (DVM)", recorded_on: "31 Dec 2025, 16:00:10", dvm: "Dr. CCC", department: "301 คลินิกพิเศษ",
        last_updated_by: "Dr. CCC (DVM)", last_updated_on: "31 Dec 2025, 16:00:10", disable_remark: ""
    },
    {
        entry_id: "E-017", order_no: "ORD-016", acc_no: null, activity_type: "Vital Signs", status: "Accept",
        effective_time: null, target_time: "01 Jan 2026, 02:00:00", order_note: "Monitor Q4H",
        parameters: {}, recorded_by: "Dr. CCC (DVM)", recorded_on: "31 Dec 2025, 16:05:00", dvm: "Dr. CCC", department: "301 คลินิกพิเศษ",
        last_updated_by: "User A (Tech)", last_updated_on: "31 Dec 2025, 16:05:00", disable_remark: ""
    },
    
    // --- (Eye-Done: 5 รายการ - ข้อมูลเกือบเต็ม) ---
    {
        entry_id: "E-004", order_no: "ORD-004", acc_no: "EYE-001", activity_type: "Eye Exam", status: "Done",
        effective_time: "31 Dec 2025, 09:00:00", target_time: null, order_note: "",
        parameters: { plr_od: '+', plr_os: '+', palpebral_od: '+', palpebral_os: '+', dazzle_od: '+', dazzle_os: '+', menace_od: '+', menace_os: '+', stt_od: 15, stt_os: 14, iop_od: 18, iop_os: 19, fluorescein_od: 'Neg', fluorescein_os: 'Neg', Note: "ตรวจตาประจำปี" },
        recorded_by: "User C (Tech)", recorded_on: "31 Dec 2025, 09:05:00", dvm: "Dr. Eye", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "31 Dec 2025, 09:05:00", disable_remark: ""
    },
    {
        entry_id: "E-020", order_no: "ORD-019", acc_no: "EYE-002", activity_type: "Eye Exam", status: "Done",
        effective_time: "30 Dec 2025, 14:00:00", target_time: null, order_note: "",
        parameters: { plr_od: 'Sluggish', plr_os: '+', palpebral_od: '+', palpebral_os: '+', dazzle_od: '+', dazzle_os: '+', menace_od: '-', menace_os: '+', stt_od: 10, stt_os: 12, iop_od: 22, iop_os: 20, fluorescein_od: 'Positive', fluorescein_os: 'Neg', Note: 'OD Ulcer' },
        recorded_by: "User C (Tech)", recorded_on: "30 Dec 2025, 14:03:00", dvm: "Dr. Eye", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "30 Dec 2025, 14:03:00", disable_remark: ""
    },
    {
        entry_id: "E-021", order_no: "ORD-020", acc_no: "EYE-003", activity_type: "Eye Exam", status: "Done",
        effective_time: "29 Dec 2025, 11:00:00", target_time: null, order_note: "",
        parameters: { plr_od: '+', plr_os: '+', palpebral_od: '+', palpebral_os: '+', dazzle_od: null, dazzle_os: null, menace_od: '+', menace_os: '+', stt_od: 17, stt_os: 16, iop_od: 17, iop_os: 17, fluorescein_od: 'Neg', fluorescein_os: 'Neg', Note: 'IOP follow up' },
        recorded_by: "User C (Tech)", recorded_on: "29 Dec 2025, 11:02:00", dvm: "Dr. Eye", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "29 Dec 2025, 11:02:00", disable_remark: ""
    },
    {
        entry_id: "E-022", order_no: "ORD-021", acc_no: "EYE-004", activity_type: "Eye Exam", status: "Done",
        effective_time: "28 Dec 2025, 16:00:00", target_time: null, order_note: "",
        parameters: { plr_od: '-', plr_os: 'Sluggish', palpebral_od: '+', palpebral_os: '+', dazzle_od: '-', dazzle_os: 'Sluggish', menace_od: '-', menace_os: '-', stt_od: 5, stt_os: 8, iop_od: 45, iop_os: 25, fluorescein_od: 'Neg', fluorescein_os: 'Neg', Note: 'Glaucoma OD' },
        recorded_by: "User C (Tech)", recorded_on: "28 Dec 2025, 16:01:00", dvm: "Dr. Eye", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "28 Dec 2025, 16:01:00", disable_remark: ""
    },
    {
        entry_id: "E-023", order_no: "ORD-022", acc_no: "EYE-005", activity_type: "Eye Exam", status: "Done",
        effective_time: "27 Dec 2025, 10:00:00", target_time: null, order_note: "",
        parameters: { plr_od: '+', plr_os: '+', palpebral_od: '+', palpebral_os: '+', dazzle_od: '+', dazzle_os: '+', menace_od: '+', menace_os: '+', stt_od: 16, stt_os: 15, iop_od: 19, iop_os: 19, fluorescein_od: 'Neg', fluorescein_os: 'Neg', Note: 'Pre-op check' },
        recorded_by: "User C (Tech)", recorded_on: "27 Dec 2025, 10:03:00", dvm: "Dr. Eye", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "27 Dec 2025, 10:03:00", disable_remark: ""
    },

    // --- (Eye-Order: 3 รายการ) ---
    {
        entry_id: "E-005", order_no: "ORD-003", acc_no: null, activity_type: "Eye Exam", status: "Order",
        effective_time: null, target_time: "31 Dec 2025, 18:00:00", order_note: "Check IOP OD only",
        parameters: {}, recorded_by: "Dr. CCC (DVM)", recorded_on: "31 Dec 2025, 16:00:00", dvm: "Dr. CCC", department: "301 คลินิกพิเศษ",
        last_updated_by: "Dr. CCC (DVM)", last_updated_on: "31 Dec 2025, 16:00:00", disable_remark: ""
    },
    {
        entry_id: "E-024", order_no: "ORD-023", acc_no: null, activity_type: "Eye Exam", status: "Order",
        effective_time: null, target_time: "01 Jan 2026, 09:00:00", order_note: "F/U Ulcer OD",
        parameters: {}, recorded_by: "Dr. Eye", recorded_on: "31 Dec 2025, 16:30:00", dvm: "Dr. Eye", department: "301 คลินิกพิเศษ",
        last_updated_by: "Dr. Eye", last_updated_on: "31 Dec 2025, 16:30:00", disable_remark: ""
    },
    {
        entry_id: "E-025", order_no: "ORD-024", acc_no: null, activity_type: "Eye Exam", status: "Accept",
        effective_time: null, target_time: "01 Jan 2026, 14:00:00", order_note: "STT OU",
        parameters: {}, recorded_by: "Dr. Eye", recorded_on: "31 Dec 2025, 17:00:00", dvm: "Dr. Eye", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "31 Dec 2025, 17:00:00", disable_remark: ""
    },

    // ***** START: BETA 4.0 (Step 7) - 20 LIS Entries *****
    {
        entry_id: "E-200", order_no: "ORD-200", acc_no: "LIS-001", activity_type: "LIS", status: "Done",
        effective_time: "31 Dec 2025, 10:00:00", target_time: null, order_note: "",
        parameters: { tests: ["CBC", "BUN", "CRE"], note: "ตรวจสุขภาพ S" },
        recorded_by: "User A (Tech)", recorded_on: "31 Dec 2025, 10:01:00", dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "User A (Tech)", last_updated_on: "31 Dec 2025, 10:01:00", disable_remark: ""
    },
    {
        entry_id: "E-201", order_no: "ORD-201", acc_no: "LIS-002", activity_type: "LIS", status: "Done",
        effective_time: "30 Dec 2025, 11:00:00", target_time: null, order_note: "",
        parameters: { tests: ["CBC", "BP", "ALT", "UA"], note: "ตรวจสุขภาพ L" },
        recorded_by: "User B (Nurse)", recorded_on: "30 Dec 2025, 11:01:00", dvm: "Dr. BBB", department: "201 ฉุกเฉิน",
        last_updated_by: "User B (Nurse)", last_updated_on: "30 Dec 2025, 11:01:00", disable_remark: ""
    },
    {
        entry_id: "E-202", order_no: "ORD-202", acc_no: "LIS-003", activity_type: "LIS", status: "Pending",
        effective_time: "29 Dec 2025, 14:00:00", target_time: null, order_note: "รอผล UA",
        parameters: { tests: ["CBC", "UA"], note: "ตรวจเช็ค FUS" },
        recorded_by: "User C (Tech)", recorded_on: "29 Dec 2025, 14:01:00", dvm: "Dr. CCC", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: "29 Dec 2025, 14:01:00", disable_remark: ""
    },
    {
        entry_id: "E-203", order_no: "ORD-203", acc_no: "LIS-004", activity_type: "LIS", status: "Cancelled",
        effective_time: "28 Dec 2025, 15:00:00", target_time: null, order_note: "",
        parameters: { tests: ["CBC"], note: "ตรวจซ้ำ" },
        recorded_by: "User A (Tech)", recorded_on: "28 Dec 2025, 15:01:00", dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "Dr. AAA", last_updated_on: "28 Dec 2025, 15:05:00", disable_remark: "Duplicate Order"
    },
    {
        entry_id: "E-204", order_no: "ORD-204", acc_no: "LIS-005", activity_type: "LIS", status: "Done",
        effective_time: "27 Dec 2025, 16:00:00", target_time: null, order_note: "",
        parameters: { tests: ["BUN", "CRE"], note: "F/U ไต" },
        recorded_by: "User B (Nurse)", recorded_on: "27 Dec 2025, 16:01:00", dvm: "Dr. BBB", department: "201 ฉุกเฉิน",
        last_updated_by: "User B (Nurse)", last_updated_on: "27 Dec 2025, 16:01:00", disable_remark: ""
    },
    // (Add 15 more LIS)
    ...Array.from({ length: 15 }, (_, i) => ({
        entry_id: `E-2${String(i + 5).padStart(2, '0')}`, order_no: `ORD-2${String(i + 5).padStart(2, '0')}`, acc_no: `LIS-0${String(i + 6).padStart(2, '0')}`,
        activity_type: "LIS", status: (i % 4 === 0) ? "Pending" : "Done",
        effective_time: `2${6 - i} Dec 2025, 10:00:00`, target_time: null, order_note: "",
        parameters: { tests: ["CBC"], note: `Routine check ${i + 1}` },
        recorded_by: "User A (Tech)", recorded_on: `2${6 - i} Dec 2025, 10:01:00`, dvm: "Dr. AAA", department: "101 อายุรกรรม",
        last_updated_by: "User A (Tech)", last_updated_on: `2${6 - i} Dec 2025, 10:01:00`, disable_remark: (i === 8) ? "Lab note" : ""
    })),
    // ***** END: BETA 4.0 (Step 7) - 20 LIS Entries *****

    // ***** START: BETA 4.0 (Step 7) - 20 (extra) Eye Entries *****
    ...Array.from({ length: 20 }, (_, i) => ({
        entry_id: `E-3${String(i).padStart(2, '0')}`, order_no: `ORD-3${String(i).padStart(2, '0')}`, acc_no: `EYE-0${String(i + 6).padStart(2, '0')}`,
        activity_type: "Eye Exam", status: (i % 5 === 0) ? "Pending" : "Done",
        effective_time: `1${9 - i} Dec 2025, 14:00:00`, target_time: null, order_note: (i % 5 === 0) ? "Check IOP" : "",
        parameters: {
            plr_od: (i % 3 === 0) ? 'Sluggish' : '+', plr_os: '+',
            palpebral_od: '+', palpebral_os: '+',
            dazzle_od: '+', dazzle_os: '+',
            menace_od: (i % 2 === 0) ? '-' : '+', menace_os: '+',
            stt_od: 15 + i, stt_os: 16 + i,
            iop_od: 20 + i, iop_os: 20,
            fluorescein_od: (i === 10) ? 'Positive' : 'Neg', fluorescein_os: 'Neg',
            Note: `Follow up ${i + 1}`
        },
        recorded_by: "User C (Tech)", recorded_on: `1${9 - i} Dec 2025, 14:01:00`, dvm: "Dr. Eye", department: "301 คลินิกพิเศษ",
        last_updated_by: "User C (Tech)", last_updated_on: `1${9 - i} Dec 2025, 14:01:00`, disable_remark: (i === 10) ? "OD Ulcer" : ""
    }))
    // ***** END: BETA 4.0 (Step 7) - 20 (extra) Eye Entries *****
    
];
// =================================================================
// END: (ใหม่) ฐานข้อมูลกลาง
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
// START: MASTER DATA - SERVICE CATALOG (STANDARD HL7/LOINC)
// Ref: HL7 Table 0074 (Diagnostic Service Section ID)
// Ref: LOINC (Logical Observation Identifiers Names and Codes)
// =================================================================

// =================================================================
// START: MASTER DATA - SERVICE CATALOG (UPDATED BETA 4.1)
// Standards: HL7, LOINC, SNOMED CT, ISO 15189 (Container)
// =================================================================

// =================================================================
// START: MASTER DATA - SERVICE CATALOG (UPDATED BETA 4.2)
// Standards: HL7 Table 0074, LOINC, SNOMED CT, ISO 15189 (Container)
// =================================================================

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
        icon: "file-text", // ใช้ไอคอน File Text แทน Scalpel ไปก่อน (กันพัง)
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