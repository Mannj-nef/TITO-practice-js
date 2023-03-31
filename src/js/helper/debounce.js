let timeOut;

const debounce = (func, delay = 2000) => {
  clearTimeout(timeOut);

  if (typeof func === "function") {
    timeOut = setTimeout(func, delay);
  }
};

export default debounce;
