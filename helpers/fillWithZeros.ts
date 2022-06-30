export function padWithZero(num: number, targetLength: number) {
  return String(num).padStart(targetLength, "0");
}
