import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Header from '../componets/Header';
import fetchQuest from '../helper/fetchQuest';
import Timer from '../componets/Timer';
import { clickAssertions, actionScore } from '../redux/actions/index';
import NextButton from '../componets/NextButton';
import Footer from '../componets/Footer';
import heart from '../image/Hearth.gif';
import Image from '../componets/Image';
import isSmallScreen from '../hook/useQueryMedia';
import { useHistory } from 'react-router-dom';

function Game({ upTimer, getScore, setScore, round, rightAnswer, isTimeOut }) {
  const history = useHistory();

  const [arrayQuest, setArrayQuest] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggleButton, setToggleButton] = useState(false);


  useEffect(() => {
    getQuestion()
  },[])


  const getQuestion = async () => {
    const token = localStorage.getItem('token');
    const results = await fetchQuest(token);
    if (results.length) {
      setArrayQuest(results);
      setLoading(false);
    } else {
      localStorage.setItem('token', '');
      history.push('/');
    }
  }

  const calculateScore = () => {
    const level = arrayQuest[round].difficulty;
    let numDifficulty;
    if (level === 'hard') numDifficulty = (2 + 1);
    if (level === 'medium') numDifficulty = 2;
    if (level === 'easy') numDifficulty = 1;
    const HIT = 10;
    const score = getScore + HIT + (upTimer * numDifficulty);
    setScore(score);
  }

  const handleClick = ({ target }) => {
    setToggleButton(true)
    setAnswered(true);
    // https://stackoverflow.com/questions/58877215/else-path-not-taken-in-unit-testing
    /* istanbul ignore else */if (target.innerHTML === arrayQuest[round].correct_answer) {
      rightAnswer();
      calculateScore();
    }
  };

  const answers = () => {
    const correctAnswer = (
      <Button
        key="correct"
        data-testid="correct-answer"
        name={ arrayQuest[round]?.correct_answer }
        type="button"
        variant="contained"
        style={ { background: answered ? '#35a02a' : '', margin: '4px' } }
        onClick={ handleClick }
        disabled={ toggleButton || isTimeOut }
      >
        {arrayQuest[round]?.correct_answer}
      </Button>
    );
    
    const incorrectAnswers = arrayQuest[round]?.incorrect_answers.map((answer, index) => (
      <Button
        key={ index }
        type="button"
        variant="contained"
        disabled={ isTimeOut }
        data-testid={ `wrong-answer-${index}` }
        style={ { background: answered ? '#f14e31' : '', margin: '4px' } }
        onClick={ handleClick }
      >
        {answer}
      </Button>
    ));
    
    const verifyAnswers = incorrectAnswers !== undefined ? incorrectAnswers : window.location.reload();
    const AnswersArr = [...verifyAnswers, correctAnswer];
    const SHUFFLE = 0.5;
    const sortedAnswers = AnswersArr.sort(() => Math.random() - SHUFFLE);
    return sortedAnswers;
  }

  const onClickAnswered = () => {
    setAnswered(false);
  }

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
              <Timer answered={ answered } />
            </Box>
            <Typography
              variant="h4"
              style={ { fontWeight: 'bold' } }
              data-testid="question-category"
            >
              {
                arrayQuest[round]?.category
              }
            </Typography>
            <Typography
              style={ { 
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap', 
              } }
              variant="h6"
              data-testid="question-text"
            >
              {
                arrayQuest[round]?.question
              }
            </Typography>
            <Box
              data-testid="answer-options"
              style={{ marginTop: '20px' }}
            >
              { answers() && answers().map((answer) => (answer)) }
            </Box>
            <NextButton
              setToggleButton={ setToggleButton }
              arrayQuest={ arrayQuest }
              history={ history }
              onClickAnswered={ onClickAnswered }
            />
          </Box>
        )}
      {isSmallScreen() && (<Footer />)}
    </Box>
  );
}

Game.propTypes = {
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
