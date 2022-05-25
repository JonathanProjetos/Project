import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componets/Header';
import fetchQuest from '../helper/fetchQuest';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      arrayQuest: [],
      index: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion = async () => {
    const token = localStorage.getItem('token');
    const results = await fetchQuest(token);
    if (results.length) {
      this.setState({ arrayQuest: results, loading: false });
    } else {
      const { history } = this.props;
      localStorage.setItem('token', '');
      history.push('/');
    }
  }

  answers = () => {
    const { arrayQuest, index } = this.state;

    const correctAnswer = (
      <button
        data-testid="correct-answer"
        type="button"
      >
        {arrayQuest[index].correct_answer}
      </button>
    );
    const incorrectAnswers = arrayQuest[index].incorrect_answers.map((answer, id) => (
      <button
        key={ answer }
        type="button"
        data-testid={ `wrong-answer-${id}` }
      >
        {answer}
      </button>
    ));

    const AnswersArr = [...incorrectAnswers, correctAnswer];
    const SHUFFLE = 0.5;
    const sortedAnswers = AnswersArr.sort(() => SHUFFLE - Math.random());

    return sortedAnswers;
  }

  render() {
    const { arrayQuest, index, loading } = this.state;

    return (
      <div>
        <Header />
        {loading
          ? <p>carregando</p>
          : (
            <div>
              <h2 data-testid="question-category">{arrayQuest[index].category}</h2>
              <h3 data-testid="question-text">{arrayQuest[index].question}</h3>
              <div data-testid="answer-options">
                {this.answers().map((answer) => (answer))}
              </div>
            </div>
          )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape(PropTypes.object).isRequired,
};

export default connect()(Game);
