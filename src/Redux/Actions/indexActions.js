export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const LOGIN = 'LOGIN';

export const saveToken = (payload) => ({
  type: SAVE_TOKEN,
  payload,
});

export const saveQuestions = (payload) => ({
  type: SAVE_QUESTIONS,
  payload,
});
// Fetch primeiro endpoint

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const fetchUserToken = () => async (dispatch) => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = await response.json();
  dispatch(saveToken(data.token));
  localStorage.setItem('token', data.token);
};

// Fetch segundo endpoint

const minQuestions = 5;
export const fetchQuestions = (token, amount = minQuestions) => async (dispatch) => {
  const URLcomToken = `https://opentdb.com/api.php?amount=${amount}&token=${token}`;
  const response = await fetch(URLcomToken);
  const data = await response.json();
  dispatch(saveQuestions(data.results));
};

// {
//   "response_code":0,
//   "results":[
//       {
//         "category":"Entertainment: Video Games",
//         "type":"multiple",
//         "difficulty":"easy",
//         "question":"What is the first weapon you acquire in Half-Life?",
//         "correct_answer":"A crowbar",
//         "incorrect_answers":[
//             "A pistol",
//             "The H.E.V suit",
//             "Your fists"
//         ]
//       }
//   ]
// }
