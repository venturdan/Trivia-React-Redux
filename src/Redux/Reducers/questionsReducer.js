const questionsReducer = (state = {}, { payload, type }) => {
  switch (type) {
  case 'SAVE_QUESTIONS':
    return payload;
  default:
    return state;
  }
};

export default questionsReducer;
