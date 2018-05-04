import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from '../components/Question';
import { getRandomQuestionAction } from '../actions/getRandomQuestionActions';

import '../styles/question.scss';

export class AnswerQuestion extends Component {
    constructor(props) {
        super(props);

        this.selectOption = this.selectOption.bind(this);
    }

    selectOption(id) {
        console.log(id);
    }

    componentDidMount() {
        const { getRandomQuestion } = this.props;
        getRandomQuestion();
    }

    render() {
        const { question } = this.props;
        console.log(question);
        if (question && question.options) {
            return (
                <Question {...question} selectOption={this.selectOption} />
            );
        }
        return null;
    }
}

const mapStateToProps = state => {
    const { currentQuestion } = state;

    return {
        question: currentQuestion
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRandomQuestion: () => (
            dispatch(getRandomQuestionAction())
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuestion);