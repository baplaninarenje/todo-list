import getStorageItem from "./getStorageItem";

export default function getStorageItemByUuid(
  key,
  itemUuid,
  uuidType = "projectUuid"
) {
  return getStorageItem(key).filter(
    (storageItem) => storageItem[uuidType] === itemUuid
  )[0];
}
