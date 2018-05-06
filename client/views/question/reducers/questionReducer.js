import {
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAILED,
    ADD_QUESTION_REQUEST,
    ADD_QUESTION_SUCCESS,
    ADD_QUESTION_FAILED,
    GET_RANDOM_QUESTION_REQUEST,
    GET_RANDOM_QUESTION_SUCCESS,
    GET_RANDOM_QUESTION_FAILED,
    SEND_ANSWER_REQUEST,
    SEND_ANSWER_SUCCESS,
    SEND_ANSWER_FAILED
} from '../actions/actionConstants';

export const questions = (state = [], action) => {
    switch (action.type) {
        case GET_QUESTIONS_SUCCESS:
            return [...action.payload];
        case GET_QUESTIONS_REQUEST:
        case ADD_QUESTION_REQUEST:
        case SEND_ANSWER_REQUEST:
        case ADD_QUESTION_SUCCESS:
            return state;
        case GET_QUESTIONS_FAILED:
        case ADD_QUESTION_FAILED:
        case SEND_ANSWER_FAILED:
            console.warn(`${action.type}: ${action.payload}`);
            return state;
        case SEND_ANSWER_SUCCESS:
        default:
            return state;
    }
}


export const currentQuestion = (state = {}, action) => {
    switch (action.type) {
        case GET_RANDOM_QUESTION_REQUEST:
            return state;
        case GET_RANDOM_QUESTION_SUCCESS:
            return { ...action.payload };
        case GET_RANDOM_QUESTION_FAILED:
            console.warn(`${action.type}: ${action.payload}`);
            return state;
        default:
            return state;
    }
}