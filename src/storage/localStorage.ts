const getItem = (itemKey: string): string | null =>
  localStorage.getItem(itemKey);

const getItemToJSON = <T>(itemKey: string): T | null => {
  const value = getItem(itemKey);
  return value ? JSON.parse(value) : null;
};

const setItem = (
  itemKey: string,
  itemValue: any,
  stringify: boolean = true,
): void => {
  const storedValue = stringify ? JSON.stringify(itemValue) : itemValue;
  localStorage.setItem(itemKey, storedValue);
};

export { getItem, getItemToJSON, setItem };
