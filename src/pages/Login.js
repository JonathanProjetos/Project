import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import fetchToken from '../helper/fetchToken';
import { actionSetTokem, actionSetUser } from '../redux/actions';

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
    history.push('/game');
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <div className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="name">
            <span>Nome:</span>
            <input
              id="name"
              name="name"
              type="text"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <label htmlFor="email">
            <span>Email:</span>
            <input
              id="email"
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isDisabled }
          >
            Play
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClick }
        >
          Settings
        </button>
      </div>
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
