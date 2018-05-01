import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from '../components/Question';
import { getQuestionsAction } from '../actions/getActions';

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
        const { getQuestions } = this.props;
        getQuestions();
    }

    render() {
        const { question } = this.props;
        if (typeof question !== "undefined") {
            return (
                <Question {...question} selectOption={this.selectOption} />
            );
        }
        return null;
    }
}

const mapStateToProps = state => {
    const {questions} = state;
    if (typeof questions !== "undefined") {
        const randNr = Math.floor(Math.random() * questions.length);
        return {
            question: questions[randNr]
        }
    }

    return {};
}

const mapDispatchToProps = dispatch => {
    return {
        getQuestions: () => (
            dispatch(getQuestionsAction())
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerQuestion);