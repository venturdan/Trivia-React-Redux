import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const hash = MD5(gravatarEmail).toString();

    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt={ gravatarEmail }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">
          { name }
        </p>
        <p data-testid="header-score">
          { score }
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { name, score, gravatarEmail } }) => ({
  name,
  score,
  gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
