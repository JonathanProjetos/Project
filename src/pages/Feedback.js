import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../componets/Header';

class Feedback extends Component {
  render() {
    const NUMBER_THREE = 3;
    const { rightAnswer } = this.props;
    return (
      <main>
        <header>
          <Header />
        </header>
        <section>
          {
            rightAnswer < NUMBER_THREE ? (
              <h1 data-testid="feedback-text">Could be better...</h1>
            ) : (
              <h1 data-testid="feedback-text">Well Done!</h1>
            )
          }
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  rightAnswer: state.player.assertions,
});

Feedback.propTypes = {
  rightAnswer: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Feedback);
