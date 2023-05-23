const INITIAL_STATE = {
  questions: [],
  responseCode: 0,
};

const questionsReducer = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case 'SAVE_QUESTIONS': {
    return ({
      ...state,
      responseCode: payload.response_code,
      questions: payload.results,
    });
  }
  default:
    return state;
  }
};

export default questionsReducer;
