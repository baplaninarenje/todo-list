import getStorageItem from "./getStorageItem";

export default function removeStorageItem(
  key,
  itemUuid,
  uuidType = "projectUuid"
) {
  const storageItemsList = getStorageItem(key);
  const storageWithoutRemovedItems = storageItemsList.filter(
    (storageItem) => storageItem[uuidType] !== itemUuid
  );
  localStorage.setItem(key, JSON.stringify(storageWithoutRemovedItems));
}
