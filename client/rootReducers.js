import { combineReducers } from 'redux';
import { questions, currentQuestion, filterText } from './views/question/reducers/questionReducer';
import { user } from './views/login/reducers/loginReducer';

export default combineReducers({
    questions,
    currentQuestion,
    filterText,
    user
});