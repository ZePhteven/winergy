export function getAverage(arr: number[]): number {
  return arr.reduce((p, c) => p + c, 0) / arr.length;
}

export function naiveRound(num: number, decimalPlaces: number = 0): number {
  var p = Math.pow(10, decimalPlaces);
  return Math.round(num * p) / p;
}
