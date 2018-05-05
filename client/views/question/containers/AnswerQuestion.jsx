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
        const { question, selectOption } = this.props;
        // console.log(question);
        if (question && question.options) {
            return (
                <Question {...question} selectOption={selectOption} />
            );
        }
        return null;
    }
}

const mapStateToProps = state => {
    const { currentQuestion } = state;
    console.log(currentQuestion)
    return {
        question: currentQuestion
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