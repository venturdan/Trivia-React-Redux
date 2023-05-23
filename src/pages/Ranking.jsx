import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    return (
      <h1 data-testid="ranking-title">Ranking Title</h1>
    );
  }
}

export default connect()(Ranking);
