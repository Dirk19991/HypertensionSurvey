export function declineWord(
  num: number,
  wordSingular: string,
  wordPluralGenitive: string,
  wordPluralNominative: string
) {
  // Take the last two digits of the number
  const lastTwoDigits = num % 100;
  // Take the last digit of the number
  const lastDigit = num % 10;

  // Check for numbers between 11 and 19
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${num} ${wordPluralNominative}`;
  }

  // Check for the last digit of the number
  switch (lastDigit) {
    case 1:
      return `${num} ${wordSingular}`;
    case 2:
    case 3:
    case 4:
      return `${num} ${wordPluralGenitive}`;
    default:
      return `${num} ${wordPluralNominative}`;
  }
}
