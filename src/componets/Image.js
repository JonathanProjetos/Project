import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  img: {
    maxWidth: '60vw',
    maxHeight: '20vh',
    height: 'auto',
  },
});

function Image({ src, alt }) {
  const classes = useStyles();
  return (
    <img
      src={ src }
      alt={ alt }
      className={ classes.img }
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Image;
