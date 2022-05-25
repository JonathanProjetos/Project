import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componets/Header';
import fetchQuest from '../helper/fetchQuest';
import '../css/game.css';
import Timer from '../componets/Timer';
import { clickAssertions, actionRenderButton } from '../redux/actions/index';
import NextButton from '../componets/NextButton';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      arrayQuest: [],
      answered: false,
      loading: true,
      borderCorrect: 'correct',
      borderIncorrect: 'incorrect',
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

  handleClick = ({ target }) => {
    const { rightAnswer, renderButton } = this.props;
    this.setState({
      answered: true,
    });
    console.log(target.className);
    if (target.className === 'correct') {
      rightAnswer();
    }
    renderButton();
  };

  answers = () => {
    const { arrayQuest, borderCorrect, borderIncorrect, answered } = this.state;
    const { isTimeOut, round } = this.props;
    const correctAnswer = (
      <button
        data-testid="correct-answer"
        type="button"
        className={ answered ? borderCorrect : '' }
        onClick={ this.handleClick }
        disabled={ isTimeOut }
      >
        {arrayQuest[round].correct_answer}
      </button>
    );
    const incorrectAnswers = arrayQuest[round].incorrect_answers.map((answer, id) => (
      <button
        key={ answer }
        type="button"
        disabled={ isTimeOut }
        data-testid={ `wrong-answer-${id}` }
        className={ answered ? borderIncorrect : '' }
        onClick={ this.handleClick }
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
    const { arrayQuest, loading } = this.state;
    const { isButtonRender, round } = this.props;
    return (
      <div>
        <Header />
        {loading
          ? <p>carregando</p>
          : (
            <div>
              <Timer />
              <h2 data-testid="question-category">{arrayQuest[round].category}</h2>
              <h3 data-testid="question-text">{arrayQuest[round].question}</h3>
              <div data-testid="answer-options">
                { this.answers().map((answer) => (answer))}
              </div>
              <div>
                {isButtonRender && (
                  <NextButton
                    arrayQuest={ arrayQuest }
                  />
                )}
              </div>
            </div>
          )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape(PropTypes.object).isRequired,
  isTimeOut: PropTypes.bool.isRequired,
  rightAnswer: PropTypes.func.isRequired,
  renderButton: PropTypes.func.isRequired,
  isButtonRender: PropTypes.bool.isRequired,
  round: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isTimeOut: state.player.timeOut,
  round: state.player.round,
  isButtonRender: state.player.isButtonRender,
});

const mapDispatchToProps = (dispatch) => ({
  rightAnswer: () => dispatch(clickAssertions()),
  renderButton: () => dispatch(actionRenderButton()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
