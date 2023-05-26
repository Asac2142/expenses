export const incomeColor = 'rgb(45,211,111)';
export const expenseColor = 'rgb(235,68,90)';
export const lightFontColor = '#fff';
export const darkFontColor = '#000';
export const hoverBackgroundColor = '#fff';
export const defaultPlotBackgroundColor = 'rgba(0,0,0,0)';

export const colorsData: string[] = [
  'rgb(255, 215, 0)',
  'rgb(0, 128, 255)',
  'rgb(165, 42, 42)',
  'rgb(255, 128, 0)',
  'rgb(0, 128, 128)',
  'rgb(186, 85, 211)',
  'rgb(154, 205, 50)',
  'rgb(210, 105, 30)',
  'rgb(32, 178, 170)',
  'rgb(199, 21, 133)',
  'rgb(147, 112, 219)',
  'rgb(135, 206, 250)',
  'rgb(139, 69, 19)',
  'rgb(127, 255, 212)',
  'rgb(75, 0, 130)',
  'rgb(255, 255, 0)',
  'rgb(255, 0, 255)',
  'rgb(0, 255, 255)',
  'rgb(255, 128, 0)',
  'rgb(128, 0, 255)',
  'rgb(0, 255, 128)',
  'rgb(255, 0, 128)',
  'rgb(128, 255, 0)',
  'rgb(255, 128, 128)',
  'rgb(128, 128, 255)',
  'rgb(128, 255, 128)',
  'rgb(128, 0, 128)',
  'rgb(128, 128, 0)',
  'rgb(255, 165, 0)',
  'rgb(139, 0, 139)',
  'rgb(0, 128, 0)',
  'rgb(0, 0, 128)',
  'rgb(128, 0, 0)',
  'rgb(0, 255, 0)',
  'rgb(0, 0, 205)',
  'rgb(173, 255, 47)',
  'rgb(255, 99, 71)',
  'rgb(218, 165, 32)',
  'rgb(108,99,255)',
  'rgb(255,108,99)',
  'rgb(255,186,99)',
  'rgb(99,168,255)',
  'rgb(46,175,164)',
  'rgb(175,46,57)',
  'rgb(46,57,175)',
  'rgb(175,164,46)',
  'rgb(175,100,46)',
  'rgb(255, 0, 0)',
  'rgb(0, 255, 0)',
  'rgb(0, 0, 255)'
];

export function fillWithRandomColors(limit: number): string[] {
  const randomColors: string[] = [];

  for (let i = 0; i < limit; i++) {
    const color = getRandomColor();
    randomColors.push(color);
  }

  return randomColors;
}

function getRandomColor(): string {
  const n1 = generateRandomNumber();
  const n2 = generateRandomNumber();
  const n3 = generateRandomNumber();

  return `rgb(${n1}, ${n2}, ${n3})`;
}

function generateRandomNumber(): number {
  return Math.floor(Math.random() * 254) + 1;
}
