import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>
        <p>game</p>
      </div>
    );
  }
}

export default connect()(Game);
