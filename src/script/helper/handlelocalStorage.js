const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || null;

const setLocalStorage = (key, data) => localStorage.setItem(key, data);

export { getLocalStorage, setLocalStorage };
