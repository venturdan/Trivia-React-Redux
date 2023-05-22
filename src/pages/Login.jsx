import React, { Component } from 'react';
import validator from 'validator';

export default class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target: { name, value, checked, type } }) => {
    this.setState({ [name]: type === 'checkbox' ? checked : value });
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
          onClick={ (evt) => {
            evt.preventDefault();
          } }
          disabled={ !name || !validator.isEmail(email) }
        >
          Play
        </button>
      </form>
    );
  }
}
