import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ gravatarEmail } alt={ name } />
        <h1 data-testid="header-player-name">{name}</h1>
        <h2 data-testis="header-score">{score}</h2>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userName: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
