function RandomDraw<T>(list: T[], numberOfDraws: number): T[] {
  const drawLimit = list.length < numberOfDraws ? list.length : numberOfDraws;
  const copiedList = [...list];
  const result: T[] = [];
  for (let i = 0; i < drawLimit; i += 1) {
    const randomNumber = Math.floor(Math.random() * copiedList.length);
    result.push(copiedList[randomNumber]);
    copiedList.splice(randomNumber, 1);
  }
  return result;
}

export default RandomDraw;
