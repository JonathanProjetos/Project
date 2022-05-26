import React, { Component } from 'react';

class Players extends Component {
  render() {
    const player = JSON.parse(localStorage.getItem('ranking'));
    return (
      <ol>
        {player && player.sort((a, b) => b.score - a.score)
          .map(({ name, picture, score }, index) => (
            <li key={ index }>
              <span
                data-testid={ `player-name-${index}` }
              >
                {name}
              </span>
              <img src={ picture } alt={ name } />
              <span data-testid={ `player-score-${index}` }>{score}</span>
            </li>
          ))}
      </ol>
    );
  }
}

export default Players;
