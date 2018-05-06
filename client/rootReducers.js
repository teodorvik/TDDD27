import { combineReducers } from 'redux';
import { questions, currentQuestion } from './views/question/reducers/questionReducer';
import { activeTab } from './views/navigation/reducers/tabsReducer';

export default combineReducers({
    questions,
    currentQuestion,
    activeTab
});