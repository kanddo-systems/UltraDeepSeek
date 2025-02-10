import { DELETE_BUTTON_ID, SELECT_ALL_BUTTON_ID } from './constants/ELEMENT_ID';

export const STORAGE_KEYS = {
    CHECKBOX: "ULTRA_DEEPSEEK_HAS_CHECKBOX",
    QUANTITY: "ULTRA_DEEPSEEK_QUANTITY_KEY"
};

const getDeleteButton = () => document.getElementById(DELETE_BUTTON_ID);
const getSelectAllButton = () => document.getElementById(SELECT_ALL_BUTTON_ID);

const sendMessageToActiveTab = (action: string) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (tab?.id) {
            chrome.tabs.sendMessage(tab.id, { action });
        }
    });
};

const BUTTON_STATES = {
    default: { text: "Cancel Deletion", testId: "waiting", action: "create_checkbox_in_chats" },
    waiting: { text: "Delete", testId: "default", action: "remove_checkbox_in_chats" },
    selecting: (quantity: number) => ({
        text: `Delete ${quantity} Chats`,
        testId: "selecting",
        action: "delete_selected_chats"
    })
} as const;

type ButtonStateKey = Exclude<keyof typeof BUTTON_STATES, 'selecting'>;

const updateDeleteButton = (quantity: number) => {
    const deleteButton = getDeleteButton();
    const selectAllButton = getSelectAllButton();

    if (!deleteButton || !selectAllButton) return;

    if (quantity > 0) {
        setButtonState(deleteButton, BUTTON_STATES.selecting(quantity));
        selectAllButton.classList.remove("hidden");
        return;
    }

    chrome.storage.local.get(STORAGE_KEYS.CHECKBOX, ({ ULTRA_DEEPSEEK_HAS_CHECKBOX }) => {
        const nextState = ULTRA_DEEPSEEK_HAS_CHECKBOX ? BUTTON_STATES.default : BUTTON_STATES.waiting;
        setButtonState(deleteButton, nextState);
    });

};

const handleDeleteButtonClick = () => {
    const deleteButton = getDeleteButton();
    const selectAllButton = getSelectAllButton();

    if (!deleteButton || !selectAllButton) return;

    const currentTestId = deleteButton.getAttribute("data-test-id") as ButtonStateKey | "selecting";
    let nextState;

    if (currentTestId === "selecting") {
        nextState = BUTTON_STATES.selecting(0);
    } else if (BUTTON_STATES[currentTestId]) {
        nextState = BUTTON_STATES[currentTestId];
    } else {
        return;
    }

    updateSelectAllButtonVisibility(selectAllButton, nextState.testId);
    setButtonState(deleteButton, nextState);
    sendMessageToActiveTab(nextState.action);
};

const updateSelectAllButtonVisibility = (button: HTMLElement, testId: string) => {
    if (testId === "default") {
        button.classList.add("hidden");
    } else if (testId === "waiting") {
        button.classList.remove("hidden");
    }
};

const setButtonState = (button: HTMLElement, state: { text: string; testId: string; action: string }) => {
    button.innerText = state.text;
    button.setAttribute("data-test-id", state.testId);
};

const initUI = () => {
    const deleteButton = getDeleteButton();
    if (!deleteButton) return;

    deleteButton.addEventListener("click", handleDeleteButtonClick);
    chrome.storage.local.get(STORAGE_KEYS.QUANTITY, ({ ULTRA_DEEPSEEK_QUANTITY_KEY }) => {
        updateDeleteButton(ULTRA_DEEPSEEK_QUANTITY_KEY ?? 0);
    });
};

document.addEventListener("DOMContentLoaded", initUI);
