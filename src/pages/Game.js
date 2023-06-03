/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Header from '../componets/Header';
import fetchQuest from '../helper/fetchQuest';
import Timer from '../componets/Timer';
import { clickAssertions, actionScore, actionShuffle } from '../redux/actions/index';
import NextButton from '../componets/NextButton';
import Footer from '../componets/Footer';
import heart from '../image/Hearth.gif';
import Image from '../componets/Image';
import isSmallScreen from '../hook/useQueryMedia';
import Shuffler from '../componets/Shuffler';
import CalculateScore from '../componets/CalculateScore';
import Redirect from '../componets/Redirect';

function Game(props) {
  const {
    upTimer,
    getScore,
    setScore,
    round,
    rightAnswer,
    isTimeOut,
    shuffler,
    shuffleButton } = props;

  const history = useHistory();

  const [arrayQuest, setArrayQuest] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggleButton, setToggleButton] = useState(false);
  const [shufflerQuestion, setShufflerQuestion] = useState([]);

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
  };

  useEffect(() => {
    getQuestion();
    shuffleButton(true);
  }, []);

  useEffect(() => {
    if (arrayQuest[round]) {
      const randomQuestions = Shuffler(arrayQuest, round);
      setShufflerQuestion(randomQuestions);
    }
  }, [arrayQuest, round]);

  const handleClick = (index) => {
    setToggleButton(true);
    shuffleButton(false);
    setAnswered(true);
    const verifyAnswer = shufflerQuestion[index] === arrayQuest[round].correct_answer;
    // https://stackoverflow.com/questions/58877215/else-path-not-taken-in-unit-testing
    if (verifyAnswer) {
      rightAnswer();
      const score = CalculateScore(arrayQuest, round, upTimer, getScore);
      setScore(score);
    }
  };

  const onClickAnswered = () => {
    setAnswered(false);
  };

  return (
    <Box>
      <Header shufflerQuestion={ shufflerQuestion } />
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
            { shufflerQuestion.length > 0 ? (
              <Box
                data-testid="answer-options"
                style={ { marginTop: '20px' } }
              >
                { shufflerQuestion && shufflerQuestion.map((question, index) => (
                  <Button
                    key={ index }
                    type="button"
                    variant="contained"
                    disabled={ isTimeOut || toggleButton }
                    data-testid={ `wrong-answer-${index}` }
                    style={ { background: !shuffler
                      ? question === arrayQuest[round]?.correct_answer
                        ? 'green' : 'red'
                      : '',
                    margin: '4px' } }
                    onClick={ () => handleClick(index) }
                  >
                    {question}
                  </Button>

                )) }
                <NextButton
                  setToggleButton={ setToggleButton }
                  arrayQuest={ arrayQuest }
                  history={ history }
                  onClickAnswered={ onClickAnswered }
                />
              </Box>
            ) : (
              <Redirect />
            ) }

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
  shuffleButton: PropTypes.func.isRequired,
  shuffler: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isTimeOut: state.player.timeOut,
  upTimer: state.player.timer,
  getScore: state.player.score,
  round: state.player.round,
  shuffler: state.player.shuffle,
  shuffleButton: state.player.shuffle,
});

const mapDispatchToProps = (dispatch) => ({
  rightAnswer: () => dispatch(clickAssertions()),
  setScore: (score) => dispatch(actionScore(score)),
  shuffleButton: (boolean) => dispatch(actionShuffle(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
