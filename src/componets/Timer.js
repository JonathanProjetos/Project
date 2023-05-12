import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timeOver } from '../redux/actions';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      timer: 60,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const { timeOutSet } = this.props;
    const { propsGame } = this.props;
    const { history } = propsGame;
    if (timer === 0) {
      clearInterval(this.countInterval);
      timeOutSet();
      history.push('/feedback');
    }
  }

  startTimer = () => {
    const ONE_SECOND = 1000;
    this.countInterval = setInterval(() => {
      this.setState((state) => ({
        timer: state.timer - 1,
      }));
    }, ONE_SECOND);
  }

  render() {
    const { timer } = this.state;
    return (
      <h2>{timer}</h2>
    );
  }
}

Timer.propTypes = {
  timeOutSet: PropTypes.func.isRequired,
  propsGame: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  timeOutSet: () => dispatch(timeOver()),
});

export default connect(null, mapDispatchToProps)(Timer);
