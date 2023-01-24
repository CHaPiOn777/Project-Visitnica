const range = (startYear, endYear) => {
  let years = [];
  while (startYear <= endYear) {
    years.push(startYear++);
  }
  return years;
};

export const years = range(1945, new Date().getFullYear());

export const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
