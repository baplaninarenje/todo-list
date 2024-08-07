import getStorageItem from "./getStorageItem";

export default function createStorageItem(key, value) {
  const existingEntries = getStorageItem(key) || [];
  existingEntries.push(value);
  localStorage.setItem(key, JSON.stringify(existingEntries));
}
