import Login from '../pages/Login';
import renderWithRouterAndRedux  from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import questions from './helpers/mockedQuestions';

describe('Testando o componente <Login />', () => {
  const initial_state = {
    player: {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',

    }
  }
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        response_code : 0,
        response_message : "Token Generated Successfully!",
        token : "7cd858bec5b2586f95e5f6c24f673bf994ce2153248941754e7fbaeecc7d04ca",
      }),
    });
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(
        questions,
      ),
    });
  })
      
  it('Testa se tem os inputs e o botão de login e a funcionalidade deles', () => {
    const { history } = renderWithRouterAndRedux(<Login />, initial_state);
    const userName = 'Usuario_1';
    const userEmail = 'usuario_1@trybe.com';
    const nameInput = screen.getByLabelText(/player name/i);
    const emailInput = screen.getByLabelText(/gravatar email/i);
    const playBtn = screen.getByRole('button', {  name: /play/i});
    expect(playBtn).toBeDisabled();
    userEvent.type(nameInput, userName);
    expect(playBtn).toBeDisabled();
    userEvent.type(emailInput, userEmail);
    expect(playBtn).not.toBeDisabled();
    act(() => {
      userEvent.click(playBtn);
    });
    setTimeout(() => {
    expect(history.location.pathname).toBe('/game');
    }, 500);
  });

});