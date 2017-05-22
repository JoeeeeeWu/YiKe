export const getRequest = (url, successCallBack, failCallback) => {
  fetch(url)
  .then(response => response.json())
  .then(respnseData => successCallBack(respnseData))
  .catch(error => failCallback(error));
};
export const getTodayStr = () => {
  const today = new Date();
  const year = `${today.getFullYear()}`;
  const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  return `${year}-${month}-${day}`;
};
