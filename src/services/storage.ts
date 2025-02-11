import { ULTRA_DEEPSEEK_GLOBAL_STORAGE } from "../constants/storage";

export class StorageService {
    static async getStorageData(): Promise<any> {
        return new Promise((resolve) => {
            chrome.storage.local.get(ULTRA_DEEPSEEK_GLOBAL_STORAGE, (data) => {
                resolve(data.ULTRA_DEEPSEEK_GLOBAL_STORAGE);
            });
        });
    }
}