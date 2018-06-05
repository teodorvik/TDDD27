import React from 'react';
import { connect } from 'react-redux';
import AddForm from '../components/AddForm';
import { addQuestionAction, setOptionsValues, setText } from '../actions/addQuestionActions';

const CreateQuestion = ({ options, msg, text, submitQuestion, setOptionsValues, setText, user }) => {
    const formProps = {
        text,
        options,
        msg,
        setText,
        setOptionsValues,
        submitQuestion
    }
    if (user.isLoaded) {
        return (
            <React.Fragment>
                <AddForm {...formProps} />
            </React.Fragment>
        );
    } else {
        return null;
    }
}

const mapStateToProps = (state) => {
    const { addQuestion, user } = state;

    return {
        options: addQuestion.options,
        msg: addQuestion.msg,
        text: addQuestion.text,
        user
    }
};

const mapDispatchToProps = dispatch => ({
    setText: (event, text) => {
        dispatch(setText(text));
    },
    setOptionsValuesBluePrint: (values) => {
        dispatch(setOptionsValues(values));
    },
    submitQuestionBluePrint: (options, text) => {
        const question = {
            question: {
                text,
                options
            }
        };

        dispatch(addQuestionAction(question));
    }
})

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    submitQuestion: () => {
        const { options, text } = stateProps;
        dispatchProps.submitQuestionBluePrint(options, text);
    },
    setOptionsValues: (id, newValue) => {
        let newOptions = [...stateProps.options];
        newOptions[id] = newValue;
        dispatchProps.setOptionsValuesBluePrint(newOptions);
    }
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateQuestion);