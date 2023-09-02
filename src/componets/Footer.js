import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import Stack from '@material-ui/core/';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

function Footer() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      position="fixed"
      color="white"
      component="footer"
      sx={ {
        p: 2,
        top: 'auto',
        bottom: 0,
        alignItems: 'center',
        bgcolor: 'black',
      } }
    >
      <Box
        sx={ {
          alignItems: 'center',
          width: '99vw',
          display: 'flex',
          justifyContent: 'space-between',
        } }
      >
        <Box
          align="start"
          sx={ {
            flexGrow: 1,
            marginLeft: '5px',
          } }
        >
          Jonathan Santos
          <span>&copy;</span>
          , 2023
        </Box>
        <Box
          sx={ {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          } }
        >
          { matches && (
            <Typography
              style={ { textAlign: 'center' } }
            >
              Feito em  React Material UI.
            </Typography>
          )}

          <IconButton
            sx={ { p: 0, pl: 2 } }
            style={ { color: 'white', marginLeft: '20px' } }
            href="https://github.com/JonathanProjetos"
            target="_blank"
          >
            <GitHubIcon fontSize="inherit" />
          </IconButton>

          <IconButton
            color="primary"
            sx={ { p: 0, pl: 2 } }
            style={ { color: 'white', marginRight: '15px' } }
            href="https://www.linkedin.com/in/jonathan-jhon/"
            target="_blank"
          >
            <LinkedInIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
export default Footer;
