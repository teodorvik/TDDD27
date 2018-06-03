import React, { Component } from 'react';
import { connect } from 'react-redux';
import Listing from '../components/Listing';
import { getQuestionsAction, setFilterText } from '../actions/getQuestionsActions';
import FilterForm from '../components/FilterForm';

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
        const { questions, filterText, setFilterText } = this.props;

        const filterProps = {
            filterText,
            setFilterText
        };

        const filteredQuestions = questions.filter(({options}) => options.join(' ').includes(filterText));

        return (
            <React.Fragment>
                <FilterForm {...filterProps} />
                <Listing questions={filteredQuestions} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { questions, filterText } = state;

    return {
        questions,
        filterText
    };
};

const mapDispatchToProps = dispatch => ({
    getQuestions: () => {
        dispatch(getQuestionsAction());
    },
    setFilterText: (text) => {
        dispatch(setFilterText(text));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionListing);