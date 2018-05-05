import {
    GET_RANDOM_QUESTION_REQUEST,
    GET_RANDOM_QUESTION_SUCCESS,
    GET_RANDOM_QUESTION_FAILED
} from './actionConstants';

import { getRandomQuestionCall } from '../services/api';

export const getRandomQuestionRequest = () => ({
    type: GET_RANDOM_QUESTION_REQUEST
});

export const getRandomQuestionSuccess = question => ({
    type: GET_RANDOM_QUESTION_SUCCESS,
    payload: question
});

export const getRandomQuestionFailed = error => ({
    type: GET_RANDOM_QUESTION_FAILED,
    payload: error
});

export const getRandomQuestionAction = () => {
    return (dispatch) => {
        dispatch(getRandomQuestionRequest());

        getRandomQuestionCall()
            .then(response => response.question[0])
            .then(response => dispatch(getRandomQuestionSuccess(response)))
            .catch(error => dispatch(getRandomQuestionFailed(error)));
    };
};