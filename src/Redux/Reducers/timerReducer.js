const INITIAL_STATE = {
  timer: 30,
};

const timerReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case 'SAVE_TIMER': {
    console.log(payload);
    return ({
      ...state,
      timer: payload,
    });
  }
  default:
    return state;
  }
};

export default timerReducer;
