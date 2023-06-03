function Shuffler(arrayQuest, round) {
  const SHUFFLER = 0.5;
  const perguntaCorreta = arrayQuest[round]?.correct_answer;
  const perguntaErrada = arrayQuest[round] && arrayQuest[round]?.incorrect_answers;
  const array = [...perguntaErrada, perguntaCorreta];
  const random = array && array.sort(() => Math.random() - SHUFFLER);
  return random;
}

export default Shuffler;
