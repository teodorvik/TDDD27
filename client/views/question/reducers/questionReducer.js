import {
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAILED,
    ADD_QUESTION_REQUEST,
    ADD_QUESTION_SUCCESS,
    ADD_QUESTION_FAILED
} from '../actions/actionConstants';

export const questions = (state = {}, action) => {
    switch (action.type) {
        case GET_QUESTIONS_REQUEST:
            return state;
        case GET_QUESTIONS_SUCCESS:
            return {
                ...state,
                questions: [...action.payload]
            };
        case GET_QUESTIONS_FAILED:
            console.warn(`${action.type}: ${action.payload}`);
            return state;
        case ADD_QUESTION_REQUEST:
        case ADD_QUESTION_SUCCESS:
            return state;
        case ADD_QUESTION_FAILED:
            console.warn(`${action.type}: ${action.payload}`);
            return state;
        default:
            return state;
    }
}