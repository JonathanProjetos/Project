import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Header from '../componets/Header';
import fetchQuest from '../helper/fetchQuest';
import '../css/game.css';
import Timer from '../componets/Timer';
import { clickAssertions, actionScore } from '../redux/actions/index';
import NextButton from '../componets/NextButton';
import Footer from '../componets/Footer';
import heart from '../image/Hearth.gif';
import Image from '../componets/Image';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      arrayQuest: [],
      answered: false,
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

  calculateScore = () => {
    const { upTimer, getScore, setScore, round } = this.props;
    const { arrayQuest } = this.state;
    const level = arrayQuest[round].difficulty;
    let numDifficulty;
    if (level === 'hard') numDifficulty = (2 + 1);
    if (level === 'medium') numDifficulty = 2;
    if (level === 'easy') numDifficulty = 1;
    const HIT = 10;
    const score = getScore + HIT + (upTimer * numDifficulty);
    setScore(score);
  }

  handleClick = ({ target }) => {
    const { rightAnswer } = this.props;
    this.setState({
      answered: true,
    });
    // https://stackoverflow.com/questions/58877215/else-path-not-taken-in-unit-testing
    /* istanbul ignore else */ if (target.name === 'correct') {
      rightAnswer();
      this.calculateScore();
    }
  };

  answers = () => {
    const { arrayQuest, answered } = this.state;
    const { isTimeOut, round } = this.props;
    const correctAnswer = (
      <Button
        data-testid="correct-answer"
        name="correct"
        type="button"
        variant="contained"
        style={ { background: answered ? '#35a02a' : '' } }
        onClick={ this.handleClick }
        disabled={ isTimeOut }
      >
        {arrayQuest[round].correct_answer}
      </Button>
    );
    const incorrectAnswers = arrayQuest[round].incorrect_answers.map((answer, index) => (
      <Button
        key={ index }
        type="button"
        variant="contained"
        disabled={ isTimeOut }
        data-testid={ `wrong-answer-${index}` }
        style={ { background: answered ? '#f14e31' : '' } }
        onClick={ this.handleClick }
      >
        {answer}
      </Button>
    ));

    const AnswersArr = [...incorrectAnswers, correctAnswer];
    const SHUFFLE = 0.5;
    const sortedAnswers = AnswersArr.sort(() => Math.random() - SHUFFLE);
    return sortedAnswers;
  }

  onClickAnswered = () => {
    this.setState({ answered: false });
  }

  render() {
    const { arrayQuest, loading, answered } = this.state;
    const { round, history } = this.props;
    return (
      <Box>
        <Header />
        {loading
          ? (
            <Box
              sx={ {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '80vh',
              } }
            >
              <Image src={ heart } alt="loading" />
            </Box>
          )
          : (
            <Box
              sx={ {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                width: '99vw',
                height: '80vh',
                alignItems: 'center',
              } }
            >
              <Box
                sx={ {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '50px',
                } }
              >
                <Timer answered={ answered } propsGame={ this.props } />
              </Box>

              <Typography
                variant="h4"
                style={ { fontWeight: 'bold' } }
                data-testid="question-category"
              >
                {
                  arrayQuest[round].category
                }
              </Typography>
              <Typography
                style={ { marginTop: '10px' } }
                variant="h6"
                data-testid="question-text"
              >
                {
                  arrayQuest[round].question
                }
              </Typography>
              <Box
                data-testid="answer-options"
                style={ { marginTop: '20px' } }
              >
                { this.answers().map((answer) => (answer)) }
              </Box>
              <NextButton
                arrayQuest={ arrayQuest }
                history={ history }
                onClickAnswered={ this.onClickAnswered }
              />
            </Box>
          )}
        <Footer />
      </Box>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isTimeOut: PropTypes.bool.isRequired,
  rightAnswer: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
  upTimer: PropTypes.number.isRequired,
  getScore: PropTypes.number.isRequired,
  round: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  isTimeOut: state.player.timeOut,
  upTimer: state.player.timer,
  getScore: state.player.score,
  round: state.player.round,
});

const mapDispatchToProps = (dispatch) => ({
  rightAnswer: () => dispatch(clickAssertions()),
  setScore: (score) => dispatch(actionScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
