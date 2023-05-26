/* eslint-disable react/sort-comp */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import Image from '../componets/Image';
import logo from '../trivia.png';
import fetchToken from '../helper/fetchToken';
import { actionSetTokem, actionSetUser } from '../redux/actions';
import Footer from '../componets/Footer';
import style from '../css/CSS';

function Login({ setToken, setUser }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const validate = () => {
      const MIN_LENGTH = 6;
      const emailCheck = email
        .split('').includes('@') && email.split('.').includes('com');
      const nameCheck = name.length >= MIN_LENGTH;
      if (emailCheck && nameCheck && isMounted) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };

    validate();

    return () => {
      isMounted = false;
    };
  }, [email, name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await fetchToken();
    setToken(token);
    setUser({ email, name });
    localStorage.setItem('name', name);
    history.push('/game');
  };

  return (
    <Box
      component="div"
      sx={ {
        ...style().style1,
      } }
    >
      <Box
        component="form"
        onSubmit={ handleSubmit }
        sx={ {
          ...style().style2,
        } }
      >
        <Box>
          <Image src={ logo } alt="logo" />
        </Box>
        <Box sx={ { ...style().style3, marginTop: '50px' } }>
          <InputLabel htmlFor="name">
            <Input
              style={ {
                marginBottom: '20px',
                width: '300px',
                padding: '1px',
                animation: 'unset',
              } }
              id="name"
              name="name"
              type="text"
              placeholder="Digite seu nome"
              data-testid="input-player-name"
              onChange={ ({ target }) => setName(target.value) }
              value={ name }
            />
          </InputLabel>
          <InputLabel htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu email"
              data-testid="input-gravatar-email"
              onChange={ ({ target }) => setEmail(target.value) }
              value={ email }
              style={ {
                background: 'transparent',
                marginBottom: '20px',
                width: '300px',
                padding: '1px',
                textAlign: 'center',
              } }
            />
          </InputLabel>
        </Box>
        <Box sx={ { ...style().style3, marginTop: '30px' } }>
          <Button
            style={ { background: 'black', color: 'white' } }
            variant="contained"
            onClick={ handleSubmit }
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            {isDisabled ? 'Close' : 'Vamos Jogar?'}
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(actionSetTokem(token)),
  setUser: (user) => dispatch(actionSetUser(user)),
});

export default connect(null, mapDispatchToProps)(Login);
