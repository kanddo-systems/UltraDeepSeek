import { StorageService } from "./services/storage";
import { TabService } from "./services/tab";
import { UIService } from "./services/ui";

class Extension {
    static async init(): Promise<void> {
        console.log("[ULTRA DEEPSEEK] Popup script is running!");
        const wrongpageText = document.getElementById("wrong_page_text");
        const buttonContainer = document.getElementById("button_container");
        const openTheMenuText = document.getElementById("open_the_menu_text");

        const currentUrl = await TabService.getActiveTabUrl();
        if (!currentUrl?.includes("https://chat.deepseek.com")) {
            wrongpageText?.classList.remove("hidden");
            return;
        }

        const state = await StorageService.getStorageData();

        if (state.DEEPSEEK_IS_OPEN_NAVNAB) {
            buttonContainer?.classList.remove("hidden");
        } else {
            openTheMenuText?.classList.remove("hidden");
        }

        const deleteButton = UIService.getDeleteButton();
        if (deleteButton) {
            if (state.ULTRA_DEEPSEEK_HAS_CHECKBOX) {
                UIService.changeDeleteButtonToWaitingState(deleteButton);
            }
            if (state.ULTRA_DEEPSEEK_QUANTITY) {
                UIService.changeDeleteButtonToCoutingState(deleteButton, state.ULTRA_DEEPSEEK_QUANTITY);
            }
            UIService.setupDeleteButton(deleteButton);
        }
    }
}

Extension.init();
