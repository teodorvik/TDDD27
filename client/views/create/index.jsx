import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

import './create-question.scss';

export default class CreateQuestion extends Component {
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
    }

    render() {
        const { question, options } = this.state;

        return (
            <div className='create-question-form'>
                <h1>Create new question</h1>
                <TextField
                    floatingLabelText='Question'
                    value={question}
                    onChange={this.updateQuestionValue}
                    fullWidth={true}
                />
                {
                    options.map((option, index) =>
                        <Option
                            key={index}
                            id={index}
                            handleChange={this.updateOptionValue}
                        />
                    )
                }
                <RaisedButton label="Create" primary={true} onClick={this.submitQuestion} />
            </div>
        );
    }
}

const Option = ({ id, handleChange }) => (
    <TextField
        hintText={`Option ${id + 1}`}
        onChange={(event, newValue) => handleChange(id, newValue)}
        fullWidth={true}
        floatingLabelText='Option'
    />
)
