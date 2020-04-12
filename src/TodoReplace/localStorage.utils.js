const STORAGE_KEY = 'xyz.a16.dnd.savedata';

export const saveDataInLocalStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getDataFromLocalStorage = () => {
  const dataFromStore = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(dataFromStore);
  return data;
};
