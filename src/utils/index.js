export function roundToTheTenthOfANumber(number) {
  const stringDubbleItem = Number(number).toFixed(2);
  return Number(stringDubbleItem.substring(0, stringDubbleItem.length - 1));
}

export function declOfNum(number, textForms) {
  const num = Math.abs(number) % 100;
  const n1 = num % 10;
  if (num > 10 && num < 20) { return textForms[2]; }
  if (n1 > 1 && n1 < 5) { return textForms[1]; }
  if (n1 === 1) { return textForms[0]; }

  return '';
}
