import React from 'react';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';

import '../styles/create-question.scss';

const AddForm = ({ text, options, setText, setOptionsValues, submitQuestion, msg }) => (
    <div className='create-question-form'>
        <h1>Create new question</h1>
        {
            msg &&
            <div className='message'>{msg}</div>
        }
        <TextField
            floatingLabelText='Question'
            value={text}
            onChange={setText}
            fullWidth={true}
        />
        <Option
            id={0}
            handleChange={setOptionsValues}
            value={options[0]}
        />
        <Option
            id={1}
            handleChange={setOptionsValues}
            value={options[1]}
        />
        <RaisedButton label="Create" primary={true} onClick={submitQuestion} />
    </div>
)

const Option = ({ id, handleChange, value }) => (
    <TextField
        hintText={`Option ${id + 1}`}
        onChange={(event, newValue) => handleChange(id, newValue)}
        fullWidth={true}
        floatingLabelText='Option'
        value={value}
    />
)

export default AddForm;