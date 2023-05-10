/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import Image from '../componets/Image';
import logo from '../trivia.png';
import fetchToken from '../helper/fetchToken';
import { actionSetTokem, actionSetUser } from '../redux/actions';
import Footer from '../componets/Footer';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      const { email, name } = this.state;
      const MIN_LENGTH = 1;
      const emailCheck = email
        .split('').includes('@') && email.split('.').includes('com');
      const nameCheck = name.length >= MIN_LENGTH;
      if (emailCheck && nameCheck) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { setToken, setUser, history } = this.props;
    const token = await fetchToken();
    const { email, name } = this.state;
    setToken(token);
    setUser({ email, name });
    localStorage.setItem('name', name);
    history.push('/game');
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  style = () => ({
    style1: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100vw',
      height: '100vh',
      alignItems: 'center',
    },
    style2: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      width: '600px',
      height: '600px',
      alignItems: 'center',
      marginTop: '20px',
    },
    style3: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'between',
    },
    style4: {
      color: 'black',
      background: 'white',
    },
  })

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <Box
        component="div"
        sx={ {
          ...this.style().style1,
        } }
      >
        <Box
          component="form"
          onSubmit={ this.handleSubmit }
          sx={ {
            ...this.style().style2,
          } }
        >
          <Box>
            <Image src={ logo } alt="logo" />
          </Box>
          <Box sx={ { ...this.style.style3, marginTop: '50px' } }>
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
                onChange={ this.handleChange }
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
                onChange={ this.handleChange }
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
          <Box sx={ { ...this.style().style3, marginTop: '30px' } }>
            <Button
              style={ { background: 'black', color: 'white' } }
              variant="contained"
              onClick={ this.handleSubmit }
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
