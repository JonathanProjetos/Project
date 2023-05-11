import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { resetState } from '../redux/actions';
import Footer from '../componets/Footer';
import Players from '../componets/Players';
import useQueryMedia from '../hook/useQueryMedia';

function Ranking({ reset, history }) {
  const isSmallScreen = useQueryMedia();
  return (
    <Box
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      } }
    >
      <Typography
        variant="h2"
        data-testid="ranking-title"
        style={ {
          marginBottom: '30px',
          marginTop: '30px',
          fontWeight: 'bold',
        } }
      >
        Ranking
      </Typography>
      <Players />
      <Button
        type="button"
        style={ { background: 'black', color: 'white', marginBottom: '100px' } }
        data-testid="btn-go-home"
        onClick={ () => {
          reset();
          history.push('/');
        } }
      >
        Inicio
      </Button>
      { isSmallScreen && (<Footer />)}
    </Box>
  );
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
