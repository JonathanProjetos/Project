const fetchQuest = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;

  const question = await fetch(URL)
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((erro) => erro);

  return question;
};

export default fetchQuest;
