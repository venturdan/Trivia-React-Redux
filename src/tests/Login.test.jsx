import renderWithRouterAndRedux  from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import questions from './helpers/mockedQuestions';
import App from '../App';

const data = { response_code : 0,
  response_message : "Token Generated Successfully!",
  token : "7cd858bec5b2586f95e5f6c24f673bf994ce2153248941754e7fbaeecc7d04ca",
};
beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValueOnce(data).mockResolvedValueOnce(questions),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Testando o componente <Login />', () => {
  
  const initial_state = {
    player: {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
    },
    token: '',
    questions: {questions: [], response_code: 0},
  }
  
  it('Testa se tem os inputs e o botão de login e a funcionalidade deles', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initial_state, '/');
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
    await act(async () => {
      userEvent.click(screen.getByRole('button', {  name: /play/i}));
    });
    expect(fetch).toHaveBeenCalledWith(`https://opentdb.com/api_token.php?command=request`);
    expect(fetch).toHaveBeenCalledWith(`https://opentdb.com/api.php?amount=5&token=${data.token}`);
   await waitFor(() => expect(history.location.pathname).toBe('/game'));

});
  it('Testando botão de configurações', async () => {
    const { history } = renderWithRouterAndRedux(<App />, initial_state, '/');
    const configBtn = screen.getByRole('button', {  name: /settings/i});
    expect(configBtn).toBeInTheDocument();
    await act(async () => {
      userEvent.click(configBtn);
    }); 
    expect(history.location.pathname).toBe('/settings');
  });
});