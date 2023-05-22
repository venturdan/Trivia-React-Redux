import PropTypes from 'prop-types';
import React, { Component } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';
import { fetchUserToken } from '../Redux/Actions/indexActions';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target: { name, value, checked, type } }) => {
    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };

  loginClick = (evt) => {
    const { dispatch, history } = this.props;
    evt.preventDefault();
    dispatch(fetchUserToken());
    history.push('/game');
  };

  render() {
    const { name, email } = this.state;

    return (
      <form>
        <h3>Login</h3>
        <input
          data-testid="input-player-name"
          type="text"
          name="name"
          placeholder="Digite seu nome"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          placeholder="Digite seu email gravatar"
          value={ email }
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          type="button"
          onClick={ this.loginClick }
          disabled={ !name || !validator.isEmail(email) }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
