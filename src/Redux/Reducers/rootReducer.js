import { combineReducers } from 'redux';
import { playerReducer } from './playerReducer';
import tokenReducer from './tokenReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
  questions: questionsReducer,
});

export default rootReducer;
