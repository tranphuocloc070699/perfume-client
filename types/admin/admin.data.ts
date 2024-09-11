const yearNow = new Date().getFullYear();
export const validYears: number[] = Array.from(
  { length: yearNow - 1900 + 1 },
  (_, index) => 1900 + index
);
