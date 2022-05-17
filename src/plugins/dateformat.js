const dateformat = (date) => {
  if (!date) return '';
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('ru', {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
  return (date.getUTCDate() === now.getUTCDate() + 1) ? 'Завтра' : formatter.format(date);
};

export default dateformat