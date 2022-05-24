import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    const { email } = this.props;
    const emailCrpyto = md5(email).toString();
    this.setState({ picture: `https://www.gravatar.com/avatar/${emailCrpyto}` });
  }

  render() {
    const { userName, score } = this.props;
    const { picture } = this.state;
    console.log(picture);

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

Header.propTypes = {
  userName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
