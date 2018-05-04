import { combineReducers } from 'redux';
import { questions, currentQuestion } from './views/question/reducers/questionReducer';

export default combineReducers({
    questions,
    currentQuestion
});