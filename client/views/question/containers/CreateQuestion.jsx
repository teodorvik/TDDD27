import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddForm from '../components/AddForm';
import { addQuestionAction } from '../actions/addActions';

class CreateQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: 'Would you rather...?',
            options: ["", ""]
        }

        this.updateOptionValue = this.updateOptionValue.bind(this);
        this.updateQuestionValue = this.updateQuestionValue.bind(this);
        this.submitQuestion = this.submitQuestion.bind(this);
    }


    updateOptionValue(id, newValue) {
        let { options } = this.state;
        options[id] = newValue;

        this.setState({ options });
    }

    updateQuestionValue(event, newValue) {
        this.setState({ question: newValue });
    }

    submitQuestion() {
        console.log("Submit the data!", this.state);
        const { addQuestion } = this.props;
        addQuestion(this.state);
    }

    render() {
        const { question, options } = this.state;

        const formProps = {
            question,
            options,
            updateQuestionValue: this.updateQuestionValue,
            updateOptionValue: this.updateOptionValue,
            submitQuestion: this.submitQuestion
        }

        return (
            <AddForm {...formProps} />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addQuestion: (question) => {
        dispatch(addQuestionAction(question));
    }
})

export default connect(null, mapDispatchToProps)(CreateQuestion);