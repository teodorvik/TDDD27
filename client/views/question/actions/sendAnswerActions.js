import {
    SEND_ANSWER_REQUEST,
    SEND_ANSWER_SUCCESS,
    SEND_ANSWER_FAILED
} from './actionConstants';

import { getRandomQuestionAction } from './getRandomQuestionActions';
import { sendAnswerCall } from '../services/api';

export const sendAnswerRequest = () => ({
    type: SEND_ANSWER_REQUEST
});

export const sendAnswerSuccess = questions => ({
    type: SEND_ANSWER_SUCCESS,
    payload: questions
});

export const sendAnswerFailed = error => ({
    type: SEND_ANSWER_FAILED,
    payload: error
});

// TODO: Send parameters with call
export const sendAnswerAction = (questionId, optionsIdx, shouldFetchNewQuestion) => {
    return (dispatch) => {
        dispatch(sendAnswerRequest());

        sendAnswerCall(questionId, optionsIdx)
            .then(reponse => {
                dispatch(sendAnswerSuccess(response));
                if (shouldFetchNewQuestion) {
                    dispatch(getRandomQuestionAction());
                }
            })
            .catch(error => dispatch(sendAnswerFailed(error)));
    }
};