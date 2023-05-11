/* eslint-disable no-magic-numbers */
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useQueryMedia from '../hook/useQueryMedia';

function Players() {
  const player = JSON.parse(localStorage.getItem('ranking') || '[]');
  const isSmallScreen = useQueryMedia();

  return (
    <List
      style={ {
        marginBottom: '30px',
      } }
    >
      {player && player.sort((a, b) => b.score - a.score)
        .map(({ name, picture, score }, index) => (
          <ListItem key={ index }>
            { isSmallScreen ? (
              <Box
                sx={ {
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '20vw',
                } }
              >
                <Avatar
                  style={ {
                    background: 'black',
                    color: 'white',
                  } }
                >
                  {
                    name.split('')[0]?.toUpperCase()
                  }
                </Avatar>
                <Typography
                  data-testid={ `player-name-${index}` }
                >
                  {name}
                </Typography>
                <Typography
                  data-testid={ `player-score-${index}` }
                >
                  {
                    `Pts: ${score}`
                  }
                </Typography>
              </Box>
            ) : (
              <Box
                sx={ {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '40vw',
                  marginBottom: '5px',
                } }
              >
                <Avatar
                  style={ {
                    background: 'black',
                    color: 'white',
                  } }
                >
                  {
                    name.split('')[0]?.toUpperCase()
                  }
                </Avatar>
                <Typography
                  data-testid={ `player-name-${index}` }
                >
                  {name}
                </Typography>
                <Typography
                  data-testid={ `player-score-${index}` }
                >
                  {
                    `Pts: ${score}`
                  }
                </Typography>
              </Box>
            )}
          </ListItem>
        ))}
    </List>
  );
}

export default Players;
