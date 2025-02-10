console.log("[ULTRA DEEPSEEK] Content script is running");

const STORAGE_KEYS = {
    CHECKBOX: "ULTRA_DEEPSEEK_HAS_CHECKBOX",
    QUANTITY: "ULTRA_DEEPSEEK_QUANTITY_KEY"
};

const selectedChats: Set<HTMLElement> = new Set();

const updateSelectedChats = (container: HTMLElement, isChecked: boolean) => {
    isChecked ? selectedChats.add(container) : selectedChats.delete(container);
    chrome.storage.local.set({ [STORAGE_KEYS.QUANTITY]: selectedChats.size });
};

const createCheckbox = (container: HTMLElement) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("chat-checkbox");

    checkbox.addEventListener("change", () => updateSelectedChats(container, checkbox.checked));

    container.insertBefore(checkbox, container.firstChild);
};

const addCheckboxesToChats = () => {
    document.querySelectorAll("#root > div > div > div > div > div > div > div[tabindex]")
        .forEach(container => createCheckbox(container as HTMLElement));

    chrome.storage.local.set({ [STORAGE_KEYS.CHECKBOX]: true });
};

const removeCheckboxesFromChats = () => {
    document.querySelectorAll(".chat-checkbox").forEach(checkbox => checkbox.remove());

    chrome.storage.local.set({ [STORAGE_KEYS.CHECKBOX]: false, [STORAGE_KEYS.QUANTITY]: 0 });
    selectedChats.clear();
};

const deleteSelectedChats = () => {
    console.log("[ULTRA DEEPSEEK]", Array.from(selectedChats));
};

chrome.runtime.onMessage.addListener(({ action }) => {
    const actions: Record<string, () => void> = {
        create_checkbox_in_chats: addCheckboxesToChats,
        remove_checkbox_in_chats: removeCheckboxesFromChats,
        delete_selected_chats: deleteSelectedChats
    };

    actions[action]?.();
});
