function CalculateScore(arrayQuest, round, upTimer, getScore) {
  const level = arrayQuest[round].difficulty;
  let numDifficulty;
  switch (level) {
  case 'hard':
    numDifficulty = (2 + 1);
    break;
  case 'medium':
    numDifficulty = 2;
    break;
  case 'easy':
    numDifficulty = 1;
    break;
  default:
    numDifficulty = 1;
  }
  const HIT = 10;
  const score = getScore + HIT + (upTimer * numDifficulty);
  return score;
}

export default CalculateScore;
