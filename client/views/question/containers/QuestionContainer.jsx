import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from '../components/Question';
import { getQuestionsAction } from '../actions/questionActions';

import '../styles/question.scss';

export class QuestionContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: {
                options: [
                    {
                        id: 1,
                        text: 'give up bathing for a month'
                    },
                    {
                        id: 2,
                        text: 'give up the internet for a month'
                    }
                ]
            }
        }

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
        const { options } = this.state.question;
        const { questions } = this.props;
        console.log("Questions", questions);

        return (
            <Question options={options} selectOption={this.selectOption} />
        );
    }
}

const mapStateToProps = state => {
    const { questions } = state;

    return {
        questions
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getQuestions: () => (
            dispatch(getQuestionsAction())
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);