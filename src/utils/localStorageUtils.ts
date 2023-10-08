type AvailableKeys = 'token' | 'user' | 'rentRange';
const KEYWORD = '@RentX';

export const setLocalStorageItem = (key: AvailableKeys, value: string): void => {
  localStorage.setItem(`${KEYWORD}:${key}`, value);
};

export const getLocalStorageItem = (key: AvailableKeys) =>
  localStorage.getItem(`${KEYWORD}:${key}`);

export const removeLocalStorageItem = (key: AvailableKeys): void => {
  localStorage.removeItem(`${KEYWORD}:${key}`);
};
