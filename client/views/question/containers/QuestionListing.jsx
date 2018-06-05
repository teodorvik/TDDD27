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
        const { questions, filterText, setFilterText, user } = this.props;
        console.log(this.props);

        const filterProps = {
            filterText,
            setFilterText
        };

        const filteredQuestions = questions.filter(({options}) => options.join(' ').includes(filterText));

        if (user.isLoaded) {
            return (
                <React.Fragment>
                    <FilterForm {...filterProps} />
                    <Listing questions={filteredQuestions} />
                </React.Fragment>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    const { questions, filterText, user } = state;

    return {
        questions,
        filterText,
        user
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