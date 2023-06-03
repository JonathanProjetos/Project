import React, { useEffect, useState } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import useQueryMedia from '../hook/useQueryMedia';
import { actionPicture } from '../redux/actions';

function Header({ score, email, setPictures, shufflerQuestion }) {
  const [picture, setPicture] = useState('');
  console.log(shufflerQuestion);
  useEffect(() => {
    const getPictureGravatar = () => {
      const emailPerson = localStorage.getItem('gravatarEmail') || email;
      const emailCrpyto = md5(emailPerson).toString();
      const url = `https://www.gravatar.com/avatar/${emailCrpyto}`;
      setPictures(url);
      setPicture(url);
      localStorage.setItem('picture', url);
    };
    getPictureGravatar();
  }, [email, setPictures, shufflerQuestion]);

  const isSmallScreen = useQueryMedia();

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
        {/* <Image src={ picture } alt={ userName } /> */}
        {
          <Avatar
            src={ picture || localStorage.getItem('picture') }
            alt="Foto da pessoa"
            style={ {
              width: '80px',
              height: '80px',
              marginTop: '10px',
              marginBottom: '10px',
              marginLeft: '5px',
            } }
          />
        }
        <Typography
          variant="h6"
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
          variant={ isSmallScreen ? 'h4' : 'h6' }
          sx={ {
            fontSize: {
              lg: '5rem',
              md: '4rem',
              sm: '3rem',
              xs: '2rem',
            },
          } }
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

const mapStateToProps = (state) => ({
  score: state.player.score,
  email: state.player.gravatarEmail,
});

const mapDispatchToProps = (dispatch) => ({
  setPictures: (picture) => dispatch(actionPicture(picture)),
});

Header.propTypes = {
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  setPictures: PropTypes.func.isRequired,
  shufflerQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
