import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Feedback extends Component {
  render() {
    const { name, score, gravatarEmail, assertions, history } = this.props;
    const hash = MD5(gravatarEmail).toString();
    const imgSrc = `https://www.gravatar.com/avatar/${hash}`;
    const assertionsValidator = 3;
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ imgSrc }
            alt={ name }
          />
          <h4 data-testid="header-player-name">{name}</h4>
          <p data-testid="header-score">{ score }</p>
        </header>
        <section>
          <p data-testid="feedback-text">
            {assertions >= assertionsValidator
              ? 'Well Done!'
              : 'Could be better...'}
          </p>
          <p data-testid="feedback-total-score">{score}</p>
          <p data-testid="feedback-total-question">{assertions}</p>
          <button
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </section>
      </>

    );
  }
}

const mapStateToProps = ({ player }) => ({
  gravatarEmail: player.gravatarEmail,
  score: player.score,
  name: player.name,
  assertions: player.assertions,
});

Feedback.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
