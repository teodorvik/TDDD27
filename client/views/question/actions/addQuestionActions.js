import {
    ADD_QUESTION_REQUEST,
    ADD_QUESTION_SUCCESS,
    ADD_QUESTION_FAILED
} from './actionConstants';

import { addQuestionCall } from '../services/api';

export const addQuestionRequest = () => ({
    type: ADD_QUESTION_REQUEST
});

export const addQuestionSuccess = questions => ({
    type: ADD_QUESTION_SUCCESS,
    payload: questions
});

export const addQuestionFailed = error => ({
    type: ADD_QUESTION_FAILED,
    payload: error
});

export const addQuestionAction = (question) => {
    return (dispatch) => {
        dispatch(addQuestionRequest());

        addQuestionCall(question)
            .then(response => dispatch(addQuestionSuccess(response)))
            .catch(error => dispatch(addQuestionFailed(error)));
    }
}