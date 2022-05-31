import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetState } from '../redux/actions';
import Players from '../componets/Players';

class Ranking extends Component {
  render() {
    const { reset, history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Players />
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            reset();
            history.push('/');
          } }
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  reset: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetState()),
});

export default connect(null, mapDispatchToProps)(Ranking);
