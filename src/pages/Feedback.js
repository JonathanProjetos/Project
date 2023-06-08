import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import Header from '../componets/Header';
import { resetState } from '../redux/actions';
import Footer from '../componets/Footer';
import useQueryMedia from '../hook/useQueryMedia';
import heart from '../image/Hearth.gif';
import Image from '../componets/Image';

function Feedback({ rightAnswer, score, assertions, reset }) {
  const isSmallScreen = useQueryMedia();
  const NUMBER_SIX = 6;
  const history = useHistory();

  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = 2000; // 2 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <Header />
      {loading ? (
        <Box
          sx={ {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            height: '60vh',
          } }
        >
          <Image src={ heart } alt="loading" />
        </Box>
      ) : (
        <Box
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '80vh',
          } }
        >
          <Box
            sx={ {
              marginBottom: '40px',
            } }
          >
            {
              rightAnswer < NUMBER_SIX ? (
                <Typography
                  variant="h3"
                  data-testid="feedback-text"
                >
                  Could be better...
                </Typography>
              ) : (
                <Typography
                  variant="h3"
                  data-testid="feedback-text"
                >
                  Well Done!
                </Typography>
              )
            }
          </Box>
          <Box
            sx={ {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            } }
          >
            <Typography
              variant="h4"
              data-testid="feedback-total-score"
            >
              {`Placar final: ${score}`}
            </Typography>
            <Typography
              variant="h6"
              data-testid="feedback-total-question"
            >
              {`Você acertou: ${assertions}`}
            </Typography>
            {isSmallScreen ? (
              <Box
                sx={ {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: '40px',
                  width: '30vw',
                } }
              >
                <Button
                  type="button"
                  data-testid="btn-play-again"
                  style={ { background: 'black', color: 'white', marginRight: '20px' } }
                  onClick={ () => {
                    reset();
                    history.push('/');
                  } }
                >
                  Play Again
                </Button>
                <Button
                  type="button"
                  data-testid="btn-ranking"
                  style={ { background: 'black', color: 'white' } }
                  onClick={ () => {
                    history.push('/ranking');
                  } }
                >
                  Ranking
                </Button>
              </Box>
            ) : (
              <Box
                sx={ {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginTop: '40px',
                  width: '20vw',
                } }
              >
                <Button
                  type="button"
                  data-testid="btn-play-again"
                  style={ { background: 'black', color: 'white', marginBottom: '20px' } }
                  onClick={ () => {
                    reset();
                    history.push('/');
                  } }
                >
                  Play Again
                </Button>
                <Button
                  type="button"
                  data-testid="btn-ranking"
                  style={ { background: 'black', color: 'white' } }
                  onClick={ () => {
                    history.push('/ranking');
                  } }
                >
                  Ranking
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}

      <Footer />
    </Box>
  );
}

const mapStateToProps = (state) => ({
  rightAnswer: state.player.assertions,
  score: state.player.score,
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetState()),
});

Feedback.propTypes = {
  rightAnswer: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
