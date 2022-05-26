import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionNextQuestion } from '../redux/actions/index';

class NextButton extends Component {
  HandleClickNextButton = () => {
    const { round, nextButton, onClickAnswered, score, userName, picture } = this.props;
    const NUMBER = 4;
    if (round <= NUMBER) {
      nextButton();
    }
    if (round === NUMBER) {
      const { history } = this.props;
      const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
      const rankPlayer = [...ranking, { name: userName, score, picture }];
      localStorage.setItem('ranking', JSON.stringify(rankPlayer));
      history.push('/feedback');
    }
    onClickAnswered();
  }

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.HandleClickNextButton }
        >
          Next
        </button>
      </div>
    );
  }
}

NextButton.propTypes = {
  round: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  nextButton: PropTypes.func.isRequired,
  history: PropTypes.shape(PropTypes.object).isRequired,
  onClickAnswered: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  round: state.player.round,
  userName: state.player.name,
  score: state.player.score,
  picture: state.player.picture,
});

const mapDispatchToProps = (dispatch) => ({
  nextButton: () => dispatch(actionNextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextButton);
