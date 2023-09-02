import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { resetState } from '../redux/actions';
import Footer from '../componets/Footer';
import Players from '../componets/Players';
import useQueryMedia from '../hook/useQueryMedia';
import heart from '../image/Hearth.gif';
import Image from '../componets/Image';

function Ranking({ reset }) {
  const isSmallScreen = useQueryMedia();
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
        <Players />
      )}
      <Button
        type="button"
        style={ { background: 'black', color: 'white', marginBottom: '100px' } }
        data-testid="btn-go-home"
        onClick={ () => {
          reset();
          localStorage.setItem('name', '');
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
