import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Header from '../componets/Header';
import { resetState } from '../redux/actions';
import Footer from '../componets/Footer';

class Feedback extends Component {
  render() {
    const NUMBER_THREE = 3;
    const { rightAnswer, score, assertions, history, reset } = this.props;
    return (
      <Box>
        <Header />
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
              rightAnswer < NUMBER_THREE ? (
                <Typography
                  variant="h2"
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
          </Box>
          <Box
            sx={ {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '40px',
              width: '10vw',
            } }
          >
            <Button
              type="button"
              data-testid="btn-play-again"
              style={ { background: 'black', color: 'white' } }
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
        </Box>
        <Footer />
      </Box>
    );
  }
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
