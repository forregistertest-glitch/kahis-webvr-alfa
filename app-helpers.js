// This is app-helpers.js

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

// --- Show Copy Message Function ---
function showCopyMessage(msgElement) {
    if (msgElement) {
        msgElement.classList.remove('hidden');
        setTimeout(() => {
            msgElement.classList.add('hidden');
        }, 1500); 
    }
}