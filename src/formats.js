const roundToTwoDecimals = num => {
  return Math.round(num * 100) / 100;
};

const checkNulls = value => {
  return value !== undefined ? value : "--";
};

const addPercent = num => {
  if (num === undefined) return "--";
  return `${num}%`;
};

export default {
  roundToTwoDecimals,
  checkNulls,
  addPercent
};
