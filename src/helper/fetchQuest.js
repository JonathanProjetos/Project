/* eslint-disable camelcase */
/* eslint-disable prefer-const */
import he from 'he';

const fetchQuest = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;

  const messageQuestion = await fetch(URL);
  const response = await messageQuestion.json();
  const data = response.results;
  // console.log(data);

  const filterdata = data.map((item) => {
    let {
      question,
      category,
      correct_answer,
      difficulty,
      incorrect_answers,
      type } = item;

    const utf8Text = he.decode(question);
    const utf8TextCorrectAnswer = he.decode(correct_answer);
    const utf8TextIncorrectAnswers = incorrect_answers.map((answer) => he.decode(answer));
    console.log(utf8Text);

    incorrect_answers = utf8TextIncorrectAnswers;
    correct_answer = utf8TextCorrectAnswer;
    question = utf8Text;
    return { question, category, correct_answer, difficulty, incorrect_answers, type };
  });

  return filterdata;
};

export default fetchQuest;
