export function videoAssertResponseMinAge(age: unknown): void {
  if (age === null) return; // дозволено

  if (
    typeof age !== 'number' ||
    !Number.isInteger(age) ||
    age < 1 ||
    age > 18
  ) {
    throw new Error(
      'minAgeRestriction must be an integer between 1 and 18 or null',
    );
  }
}
