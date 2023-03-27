const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || null;

const setLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const clearLocalStorage = (key) => localStorage.removeItem(key);

export { getLocalStorage, setLocalStorage, clearLocalStorage };
