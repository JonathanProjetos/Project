import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionPicture } from '../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      picture: '',
    };
  }

  componentDidMount() {
    this.getPictureGravatar();
  }

  getPictureGravatar = async () => {
    const { email, setPictures } = this.props;
    const emailCrpyto = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${emailCrpyto}`;
    setPictures(url);
    this.setState({ picture: url });
  }

  render() {
    const { userName, score } = this.props;
    const { picture } = this.state;

    return (
      <div>
        <img data-testid="header-profile-picture" src={ picture } alt={ userName } />
        <h1 data-testid="header-player-name">{userName}</h1>
        <h2 data-testid="header-score">{score}</h2>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userName: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  setPictures: (picture) => dispatch(actionPicture(picture)),
});

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  setPictures: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
