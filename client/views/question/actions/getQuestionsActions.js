import {
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    GET_QUESTIONS_FAILED,
    SET_FILTER_TEXT
} from './actionConstants';

import { getQuestionsCall } from '../services/api';

export const setFilterText = (filterText) => ({
    type: SET_FILTER_TEXT,
    payload: filterText
});

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