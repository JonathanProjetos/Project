import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { actionNextQuestion } from '../redux/actions/index';

function NextButton(props) {
  const {
    round,
    nextButton,
    onClickAnswered,
    score,
    userName,
    picture,
    setToggleButton } = props;

  const history = useHistory();

  const HandleClickNextButton = () => {
    const NUMBER = 4;
    // https://stackoverflow.com/questions/58877215/else-path-not-taken-in-unit-testing
    /* istanbul ignore else */ if (round <= NUMBER) {
      nextButton();
    }

    setToggleButton(false);

    if (round === NUMBER) {
      const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
      const rankPlayer = [...ranking, { name: userName, score, picture }];
      localStorage.setItem('ranking', JSON.stringify(rankPlayer));
      history.push('/feedback');
    }
    onClickAnswered();
  };

  return (
    <Box>
      <Button
        type="button"
        data-testid="btn-next"
        style={ { background: 'black', color: 'white', marginTop: '50px' } }
        onClick={ HandleClickNextButton }
      >
        Next
      </Button>
    </Box>
  );
}

NextButton.propTypes = {
  round: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  nextButton: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  onClickAnswered: PropTypes.func.isRequired,
  setToggleButton: PropTypes.func.isRequired,
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
