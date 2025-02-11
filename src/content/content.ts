console.log("[ULTRA DEEPSEEK] Content script is running!");

import { debounce } from "../utils/debounce";

const ULTRA_DEEPSEEK_GLOBAL_STORAGE = "ULTRA_DEEPSEEK_GLOBAL_STORAGE";
const STORAGE_KEYS = {
    CHECKBOX: "ULTRA_DEEPSEEK_HAS_CHECKBOX",
    QUANTITY: "ULTRA_DEEPSEEK_QUANTITY"
};
const selectedChats = new Set<HTMLElement>();

const createEmptyStorage = async () => {
    await chrome.storage.local.set({
        [ULTRA_DEEPSEEK_GLOBAL_STORAGE]: { [STORAGE_KEYS.QUANTITY]: 0 }
    });
};

const getStorageData = () => new Promise((resolve) => {
    chrome.storage.local.get(ULTRA_DEEPSEEK_GLOBAL_STORAGE, (data) => {
        resolve(data.ULTRA_DEEPSEEK_GLOBAL_STORAGE);
    });
});

const getOrCreateStorage = async () => {
    const data = await getStorageData();
    if (!data) {
        await createEmptyStorage();
        return getStorageData();
    }
    return data;
};

const updateStorageKey = async (key: string, value: any) => {
    const data = await getOrCreateStorage();
    if (!data) return;
    await chrome.storage.local.set({
        [ULTRA_DEEPSEEK_GLOBAL_STORAGE]: { ...data, [key]: value }
    });
};

const updateNavbarState = async () => {
    const data = await getOrCreateStorage();
    if (!data) return;

    const isOpenNavbar = !document.querySelector("#root > div > div > div > div > div.ds-icon > svg");
    if (!isOpenNavbar && isOpenNavbar !== (data as { DEEPSEEK_IS_OPEN_NAVBAR: boolean }).DEEPSEEK_IS_OPEN_NAVBAR) {
        await cleanCheckboxState();
    }
    await updateStorageKey("DEEPSEEK_IS_OPEN_NAVNAB", isOpenNavbar);
};

const cleanCheckboxState = async () => {
    await updateStorageKey(STORAGE_KEYS.QUANTITY, 0);
    await updateStorageKey(STORAGE_KEYS.CHECKBOX, false);
}

const updateSelectedChats = (container: HTMLElement, isChecked: boolean) => {
    isChecked ? selectedChats.add(container) : selectedChats.delete(container);
    updateStorageKey(STORAGE_KEYS.QUANTITY, selectedChats.size);
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
    updateStorageKey(STORAGE_KEYS.CHECKBOX, true);
};

const removeCheckboxesFromChats = () => {
    document.querySelectorAll(".chat-checkbox").forEach(checkbox => checkbox.remove());
    updateStorageKey(STORAGE_KEYS.QUANTITY, 0);
    selectedChats.clear();
};

const deleteSelectedChats = () => {
    console.log("[ULTRA DEEPSEEK] deleteMarkCheckboxes", selectedChats);
};

const debouncedMutationHandler = debounce(() => {
    updateNavbarState();
}, 300);

const observer = new MutationObserver(() => {
    debouncedMutationHandler();
});

const init = async () => {
    await getOrCreateStorage();
    updateNavbarState();

    observer.observe(document.body, { childList: true, attributes: true, subtree: true });

    chrome.runtime.onMessage.addListener(({ action }) => {
        const actions: Record<string, () => void> = {
            add_checkbox_in_chats: addCheckboxesToChats,
            remove_checkbox_in_chats: removeCheckboxesFromChats,
            delete_selected_chats: deleteSelectedChats,
        };
        actions[action]?.();
    });
};

init();
