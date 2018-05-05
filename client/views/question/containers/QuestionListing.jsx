import React, { Component } from 'react';
import { connect } from 'react-redux';
import Listing from '../components/Listing';
import { getQuestionsAction } from '../actions/getQuestionsActions';

import '../styles/question-listing.scss';

class QuestionListing extends Component {
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
            <Listing questions={questions} />
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
        dispatch(getQuestionsAction());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionListing);