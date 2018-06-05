import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from '../components/Question';
import { getRandomQuestionAction } from '../actions/getRandomQuestionActions';
import { sendAnswerAction } from '../actions/sendAnswerActions';

import '../styles/question.scss';

export class AnswerQuestion extends Component {
    componentDidMount() {
        const { getRandomQuestion } = this.props;
        getRandomQuestion();
    }

    render() {
        const { question, selectOption, user } = this.props;

        if (question && question.options && user.isLoaded) {
            return (
                <Question {...question} selectOption={selectOption} />
            );
        }
        return null;
    }
}

const mapStateToProps = state => {
    const { currentQuestion, user } = state;
    return {
        question: currentQuestion,
        user
    };
};

const mapDispatchToProps = dispatch => ({
    getRandomQuestion: () => {
        dispatch(getRandomQuestionAction());
    },
    selectOption: (questionId, optionIdx) => {
        dispatch(sendAnswerAction(questionId, optionIdx, true));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuestion);