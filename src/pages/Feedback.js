import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../componets/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rightAnswer: state.Player.assertions,
});
export default connect(mapStateToProps)(Feedback);
