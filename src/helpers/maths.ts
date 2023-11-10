export const generateNumber = (lowerBound: number, upperBound: number): number => {
  const max = Math.max(lowerBound, upperBound);
  const min = Math.min(lowerBound, upperBound);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getTensDigit = (x: number | string) => Math.floor(Number(x) / 10);
export const getSingleDigit = (x: number | string) => Number(x) % 10;

export const calculateRowAnswers = (bottomRowDigit: number, topRowValue: number): number[] => {
  const firstAnswer = bottomRowDigit * getSingleDigit(topRowValue);
  const secondAnswer = (bottomRowDigit * getTensDigit(topRowValue)) + getTensDigit(firstAnswer);
  const thirdAnswer = getTensDigit(secondAnswer);
  return [
    firstAnswer,
    secondAnswer,
    thirdAnswer,
  ];
};

export const calculateFinalAnswers = (topRowAnswers: number[], bottomRowAnswers: number[]): number[] => {
  const singles = getSingleDigit(topRowAnswers[0]);
  const tens = getSingleDigit(topRowAnswers[1]) + getSingleDigit(bottomRowAnswers[0]) + getTensDigit(singles);
  const hundreds = getSingleDigit(topRowAnswers[2]) + getSingleDigit(bottomRowAnswers[1]) + getTensDigit(tens);
  const thousands = bottomRowAnswers[2] + getTensDigit(hundreds);

  return [
    singles,
    tens,
    hundreds,
    thousands,
  ];
};
