export const getRequest = (url, successCallBack, failCallback) => {
  fetch(url)
  .then(response => response.json())
  .then(respnseData => successCallBack(respnseData))
  .catch(error => failCallback(error));
};
export const getTodayStr = (preDay = 0) => {
  const today = new Date();
  const targetDay = new Date(today.getTime() - preDay * 24 * 60 * 60 * 1000);
  const year = `${targetDay.getFullYear()}`;
  const month = targetDay.getMonth() + 1 < 10 ? `0${targetDay.getMonth() + 1}` : targetDay.getMonth() + 1;
  const day = targetDay.getDate() < 10 ? `0${targetDay.getDate()}` : targetDay.getDate();
  return `${year}-${month}-${day}`;
};
