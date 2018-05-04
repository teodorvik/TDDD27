import {
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAILED,
} from './actionConstants';

import { getQuestionsCall } from '../services/api';

export const getQuestionsRequest = () => ({
    type: GET_QUESTIONS_REQUEST
});

export const getQuestionsSuccess = questions => ({
    type: GET_QUESTIONS_SUCCESS,
    payload: questions
});

export const getQuestionsFailed = error => ({
    type: GET_QUESTIONS_FAILED,
    payload: error
});

export const getQuestionsAction = () => {
    return (dispatch) => {
        dispatch(getQuestionsRequest());

        getQuestionsCall()
            .then(response => dispatch(getQuestionsSuccess(response)))
            .catch(error => dispatch(getQuestionsFailed(error)));
    }
};