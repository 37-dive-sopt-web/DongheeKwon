export function shuffleArray<T>(
  array: T[],
  randomGenerator: () => number = Math.random
): T[] {
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(randomGenerator() * (i + 1));
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }

  return shuffledArray;
}
