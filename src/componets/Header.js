import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Image from './Image';
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
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          bgcolor: 'black',
          color: 'white',
        } }
      >
        <Box
          sx={ {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          } }
        >
          <Image src={ picture } alt={ userName } />
          <Typography
            variant="h5"
            style={ { textAlign: 'center', marginLeft: '20px' } }
            data-testid="header-score"
          >
            {
              `Score: ${score}`
            }
          </Typography>
        </Box>
        <Box
          sx={ {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          } }
        >
          <Typography
            data-testid="header-player-name"
            variant="h4"
            style={ { textAlign: 'center', marginRight: '30px' } }
          >
            {
              localStorage.getItem('name') || ''
            }
          </Typography>
        </Box>
      </Box>
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
