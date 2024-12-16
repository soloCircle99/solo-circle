const setToLocalStorage = (key: string, value: string | null) => {
  if (value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else localStorage.removeItem(key);
}

const getValueFromLocalStorage = (key: string) => {
  let response = null;
  try {
    const value = localStorage.getItem(key)
    response = value ? JSON.parse(value) : null
  } catch (error) {
    response = null
  }

  return response;
}

const clearCredentialsFromLocalStorage = () => {
  setToLocalStorage("authEmail", null);
  setToLocalStorage("authUid", null);
};

export { setToLocalStorage, getValueFromLocalStorage, clearCredentialsFromLocalStorage }