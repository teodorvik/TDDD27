import {
    SEND_ANSWER_REQUEST,
    SEND_ANSWER_SUCCESS,
    SEND_ANSWER_FAILED
} from './actionConstants';

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
export const sendAnswerAction = () => {
    return (dispatch) => {
        dispatch(sendAnswerRequest());

        sendAnswerCall()
            .then(reponse => dispatch(sendAnswerSuccess(response)))
            .catch(error => dispatch(sendAnswerFailed(error)));
    }
};