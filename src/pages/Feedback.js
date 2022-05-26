import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../componets/Header';
import { resetState } from '../redux/actions';

class Feedback extends Component {
  render() {
    const NUMBER_THREE = 3;
    const { rightAnswer, score, assertions, history, reset } = this.props;
    return (
      <main>
        <header>
          <Header />
        </header>
        <section>
          {
            rightAnswer < NUMBER_THREE ? (
              <h1 data-testid="feedback-text">Could be better...</h1>
            ) : (
              <h1 data-testid="feedback-text">Well Done!</h1>
            )
          }
          <div>
            <h2>
              Seu Placar final foi:
              <span data-testid="feedback-total-score">{score}</span>
            </h2>
            <h2>
              Você acertou :
              <span data-testid="feedback-total-question">{assertions}</span>
              perguntas
            </h2>
          </div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => {
              reset();
              history.push('/');
            } }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => {
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
        </section>
      </main>
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
  history: PropTypes.shape(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
