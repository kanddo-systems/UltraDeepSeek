export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
    let timeout: number;
    return ((...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => fn(...args), delay);
    }) as T;
}
