/**
 * LocalStorage wrapper with error handling and JSON parsing
 */

export function getStorageItem(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return defaultValue;
  }
}

export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing to localStorage key "${key}":`, err);
  }
}

export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`Error removing localStorage key "${key}":`, err);
  }
}
