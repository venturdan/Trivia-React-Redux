const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};
export const playerReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
    };
  case 'UPDATE_SCORE':
    return {
      ...state,
      score: state.score + payload.score,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};
