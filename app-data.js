// This is app-data.js

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


// --- Problem List Modal (Tagging Section - Global Data) ---
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


// --- Assessment History Table Sort (Dynamic Content) ---
// (ย้ายมาจาก initializeAssessmentScripts)
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