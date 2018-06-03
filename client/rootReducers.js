import { combineReducers } from 'redux';
import { questions, currentQuestion, filterText } from './views/question/reducers/questionReducer';

export default combineReducers({
    questions,
    currentQuestion,
    filterText
});