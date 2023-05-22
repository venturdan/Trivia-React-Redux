const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};
export const playerReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.gravatarEmail,
    };
  case 'UPDATE_SCORE':
    return {
      ...state,
      score: state.score + payload.score,
    };
  default:
    return state;
  }
};
