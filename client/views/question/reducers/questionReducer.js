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
    SEND_ANSWER_FAILED,
    SET_FILTER_TEXT,
    SET_OPTIONS_VALUES,
    SET_QUESTION_TEXT
} from '../actions/actionConstants';

export const questions = (state = [], action) => {
    console.log('questions Reducer')
    switch (action.type) {
        case GET_QUESTIONS_SUCCESS:
            return [...action.payload];
        case GET_QUESTIONS_FAILED:
        case ADD_QUESTION_FAILED:
        case SEND_ANSWER_FAILED:
            console.warn(`${action.type}: ${action.payload}`);
            return state;

        case GET_QUESTIONS_REQUEST:

        case SEND_ANSWER_REQUEST:
        case SEND_ANSWER_SUCCESS:
        default:
            return state;
    }
};

export const addQuestion = (state = { options: ["", ""], text: 'Would you rather' }, action) => {
    switch (action.type) {
        case SET_QUESTION_TEXT:
            return {
                options: [...state.options],
                text: action.payload
            }
        case SET_OPTIONS_VALUES:
            return {
                text: state.text,
                options: action.payload
            }
        case ADD_QUESTION_SUCCESS:
            return {
                text: 'Would you rather',
                options: ["", ""],
                msg: 'Question added!'
            }
        case ADD_QUESTION_REQUEST:
        case ADD_QUESTION_FAILED:
            console.warn(`${action.type}: ${action.payload}`);
            return state;
        default:
            return state;
    }
}

export const filterText = (state = '', action) => {
    switch (action.type) {
        case SET_FILTER_TEXT:
            return action.payload;
        default:
            return state;
    }
};

export const currentQuestion = (state = {isLoaded: true}, action) => {
    switch (action.type) {
        case GET_RANDOM_QUESTION_REQUEST:
            return {
                ...state,
                isLoaded: false
            };
        case GET_RANDOM_QUESTION_SUCCESS:
            return { ...action.payload, isLoaded: true };
        case GET_RANDOM_QUESTION_FAILED:
            console.warn(`${action.type}: ${action.payload}`);
            return {
                ...state,
                isLoaded: true
            };
        default:
            return state;
    }
};
