import { DELETE_BUTTON_ID } from "../constants/element-ids";
import { TabService } from "./tab";

export class UIService {
    static getDeleteButton(): HTMLElement | null {
        return document.getElementById(DELETE_BUTTON_ID);
    }

    static changeDeleteButtonToDefaultState(deleteButton: HTMLElement): void {
        deleteButton.setAttribute("data-test-id", "default_state");
        deleteButton.innerText = "Delete";
    }

    static changeDeleteButtonToWaitingState(deleteButton: HTMLElement): void {
        deleteButton.setAttribute("data-test-id", "waiting_state");
        deleteButton.innerText = "Cancel";
    }

    static changeDeleteButtonToCoutingState(deleteButton: HTMLElement, count: number): void {
        deleteButton.setAttribute("data-test-id", "selecting_state");
        deleteButton.innerText = `Delete ${count} Selected Chats`;
    }

    static changeDeleteButtonToLoadingState(deleteButton: HTMLElement): void {
        deleteButton.setAttribute("data-test-id", "loading_state");
        deleteButton.innerText = `Loading...`;
    }

    static setupDeleteButton(deleteButton: HTMLElement): void {
        deleteButton.addEventListener("click", () => {
            const testId = deleteButton.getAttribute("data-test-id");

            if (testId === "default_state") {
                TabService.sendMessageToActiveTab("add_checkbox_in_chats");
                UIService.changeDeleteButtonToWaitingState(deleteButton);
            } else if (testId === "selecting_state") {
                TabService.sendMessageToActiveTab("delete_selected_chats");
                UIService.changeDeleteButtonToLoadingState(deleteButton);
                (deleteButton as HTMLButtonElement).disabled = true;
            } else {
                TabService.sendMessageToActiveTab("remove_checkbox_in_chats");
                UIService.changeDeleteButtonToDefaultState(deleteButton);
            }
        });
    }
}