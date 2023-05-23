import renderWithRouterAndRedux  from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { MD5 } from 'crypto-js';

describe('Testando a funcionalidade da page Feedback', () => {
  it('testando se aparecem as informações do header', () => {
    const initial_state = {
      player: {
        name: 'Usuario_1',
        assertions: 0,
        score: 0,
        gravatarEmail: 'usuario@trybe.com',
      },
    }
    const hash = MD5(initial_state.player.gravatarEmail).toString();
    const imgSrc = `https://www.gravatar.com/avatar/${hash}`;

    renderWithRouterAndRedux(<App />, initial_state, '/feedback');

    const image = screen.getByRole('img', { name: initial_state.player.name});
    expect(image.src).toBe(imgSrc);
    
    expect(screen.getByTestId('header-score').textContent).toBe('0');
    screen.getByText(/usuario_1/i);
    
  });

  it('testando se aparece as informações de mensagem de feedback assertions menor que 3', () => {
    const initial_state = {
      player: {
        name: 'Usuario_1',
        assertions: 2,
        score: 200,
        gravatarEmail: 'usuario@trybe.com',
      },
    }
    renderWithRouterAndRedux(<App />, initial_state, '/feedback');
    screen.getByText(/could be better\.\.\./i);
    expect(screen.getByTestId('feedback-total-question').textContent).toBe('2');  
  });
  
  it('testando se aparece as informações de mensagem de feedback assertions maior que 3', () => {
    const initial_state = {
      player: {
        name: 'Usuario_1',
        assertions: 4,
        score: 400,
        gravatarEmail: 'usuario@trybe.com',
      },
    }
    renderWithRouterAndRedux(<App />, initial_state, '/feedback');
    screen.getByText(/well done!/i);
    expect(screen.getByTestId('feedback-total-score').textContent).toBe('400');
});
  it('testando a funcionalidade dos botões', () => {
    const initial_state = {
      player: {
        name: 'Usuario_1',
        assertions: 4,
        score: 400,
        gravatarEmail: 'usuario@trybe.com',
      },
    }
    const { history } = renderWithRouterAndRedux(<App />, initial_state, '/feedback');
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /play again/i}));
    });
    expect(history.location.pathname).toBe('/');
    act(() => {
      history.push('/feedback');
    });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /ranking/i}));
    });
    expect(history.location.pathname).toBe('/ranking');
  });
});
