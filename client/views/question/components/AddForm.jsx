import React from 'react';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

import '../styles/create-question.scss';

const AddForm = ({ text, options, updateQuestionValue, updateOptionValue, submitQuestion }) => (
    <div className='create-question-form'>
        <h1>Create new question</h1>
        <TextField
            floatingLabelText='Question'
            value={text}
            onChange={updateQuestionValue}
            fullWidth={true}
        />
        <Option
            id={0}
            handleChange={updateOptionValue}
        />
        <Option
            id={1}
            handleChange={updateOptionValue}
        />
        <RaisedButton label="Create" primary={true} onClick={submitQuestion} />
    </div>
)

const Option = ({ id, handleChange }) => (
    <TextField
        hintText={`Option ${id + 1}`}
        onChange={(event, newValue) => handleChange(id, newValue)}
        fullWidth={true}
        floatingLabelText='Option'
    />
)

export default AddForm;