chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.clear(() => {
        console.log("[ULTRA DEEPSEEK] Storage limpo após atualização da extensão!");
    });
});