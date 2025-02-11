export class TabService {
    static sendMessageToActiveTab(action: string): void {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            if (tab?.id) {
                chrome.tabs.sendMessage(tab.id, { action });
            }
        });
    }

    static async getActiveTabUrl(): Promise<string | undefined> {
        return new Promise((resolve) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                resolve(tabs[0]?.url);
            });
        });
    }
}
