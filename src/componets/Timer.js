import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { timeOver } from '../redux/actions';

const SIXTY = 60;

function Timer({ timeOutSet }) {
  const history = useHistory();

  const [timer, setTimer] = useState(SIXTY);
  const [countInterval, setCountInterval] = useState(null);

  const startTimer = () => {
    const ONE_SECOND = 1000;
    const timesInterval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, ONE_SECOND);
    setCountInterval(timesInterval);
  };

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(countInterval);
      timeOutSet();
      history.push('/feedback');
    }
  }, [timer]);

  return (
    <h2>{timer}</h2>
  );
}

Timer.propTypes = {
  timeOutSet: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  timeOutSet: () => dispatch(timeOver()),
});

export default connect(null, mapDispatchToProps)(Timer);
