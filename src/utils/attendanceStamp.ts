export const DAY5_KEYWORD_COLUMNS = ['DIA5', 'DIA5_P1', 'DIA5_C1', 'DIA5_T1'];

export const isDay5Column = (column: string): boolean =>
  DAY5_KEYWORD_COLUMNS.includes(column);

const pad = (n: number): string => String(n).padStart(2, '0');

export const withDeviceTimestamp = (keyword: string, column: string): string => {
  if (!isDay5Column(column)) return keyword;
  const now = new Date();
  const stamp = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  return `${keyword}, ${stamp}`;
};
