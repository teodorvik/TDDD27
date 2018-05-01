import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionListing from '../components/Listing';
import { getQuestionsAction } from '../actions/getActions';

export default class QuestionListing extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getQuestions } = this.props;
        getQuestions();
    }

    render() {
        const { questions } = this.props;

        return (
            <QuestionListing questions={questions} />
        )
    }
}

const mapStateToProps = state => {
    const { questions } = state;

    return {
        questions
    };
};

const mapDispatchToProps = dispatch => ({
    getQuestions: () => {
        dispatch(getQuestionAction());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionListing);