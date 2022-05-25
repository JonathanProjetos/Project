import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionNextQuestion } from '../redux/actions/index';

class NextButton extends Component {
  HandleClickNextButton = () => {
    const { clickNext } = this.props;
    clickNext();
    const { round, nextButton, history } = this.props;

    const NUMBER = 4;
    if (round <= NUMBER) {
      nextButton();
    }
    if (round === NUMBER) {
      console.log('entrou no if');
      history.push('/feedback');
    }
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
  nextButton: PropTypes.func.isRequired,
  clickNext: PropTypes.func.isRequired,
  history: PropTypes.shape(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  round: state.player.round,
});

const mapDispatchToProps = (dispatch) => ({
  nextButton: () => dispatch(actionNextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextButton);
