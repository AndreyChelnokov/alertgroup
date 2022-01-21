export default function roundToTheTenthOfANumber(number) {
  const stringDubbleItem = Number(number).toFixed(2);
  return Number(stringDubbleItem.substring(0, stringDubbleItem.length - 1));
}
