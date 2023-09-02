import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function Redirect() {
  const history = useHistory();
  return (
    <Box>
      <Typography
        variant="h5"
      >
        {`Some error happened.
         Would you like to refresh the page or go back to the beginning?`}
      </Typography>
      <Button
        type="button"
        variant="contained"
        data-testid="reload"
        style={ {
          background: 'black',
          color: 'white',
          marginTop: '50px',
          marginRight: '8px' } }
        onClick={ () => window.location.reload() }
      >
        Reload
      </Button>
      <Button
        type="button"
        variant="contained"
        data-testid="redirect-home"
        style={ { background: 'black', color: 'white', marginTop: '50px' } }
        onClick={ () => history.push('/') }
      >
        Home
      </Button>
    </Box>
  );
}

export default Redirect;
