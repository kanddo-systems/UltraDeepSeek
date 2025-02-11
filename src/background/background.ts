chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.clear(() => {
        console.log("[ULTRA DEEPSEEK] Clean storage after extension update!!");
    });
});
