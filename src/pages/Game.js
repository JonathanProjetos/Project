import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componets/Header';
import fetchQuest from '../helper/fetchQuest';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      arrayQuest: [],
      index: 0,
    };
  }

  componentDidMount() {
    this.getQuestion();
  }

  getQuestion = async () => {
    const token = localStorage.getItem('token');
    const results = await fetchQuest(token);
    if (results.length) {
      this.setState({ arrayQuest: results });
    } else {
      const { history } = this.props;
      localStorage.setItem('token', '');
      history.push('/');
    }
  }

  render() {
    const { arrayQuest, index } = this.state;

    return (
      <div>
        <Header />
        <div>
          {arrayQuest.map((quest, id) => (
            <div key="id">
              <p key={ id } data-testid="question-category">
                {arrayQuest[index].category}

              </p>
              <p key={ id } data-testid="question-text">
                {arrayQuest[index].question}
              </p>
            </div>
          )).slice(4)}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape(PropTypes.object).isRequired,
};

export default connect()(Game);
