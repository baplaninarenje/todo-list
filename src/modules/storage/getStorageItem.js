export default function getStorageItem(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
