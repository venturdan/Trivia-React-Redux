import PropTypes from 'prop-types';
import React, { Component } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';
import { fetchQuestions, fetchUserToken, login } from '../Redux/Actions/indexActions';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  loginClick = async (evt) => {
    evt.preventDefault();
    const { dispatch, history } = this.props;
    dispatch(login(this.state));
    await dispatch(fetchUserToken());
    await dispatch(fetchQuestions(localStorage.getItem('token')));
    const errCode = 3;
    const { responseCode } = this.props;
    console.log(responseCode);
    if (errCode === responseCode) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      history.push('/game');
    }
  };

  render() {
    const { name, email } = this.state;
    const { history } = this.props;

    return (
      <form>
        <h3>Login</h3>
        <label htmlFor="name">
          <p>Player Name</p>
          <input
            data-testid="input-player-name"
            type="text"
            id="name"
            name="name"
            placeholder="Type your name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          <p>Gravatar Email</p>
          <input
            id="email"
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            placeholder="Type your gravatar email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          onClick={ this.loginClick }
          disabled={ !name || !validator.isEmail(email) }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ (evt) => {
            evt.preventDefault();
            history.push('/settings');
          } }
        >
          Settings
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  responseCode: PropTypes.number.isRequired,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  responseCode: state.questions.responseCode,
});

export default connect(mapStateToProps)(Login);
