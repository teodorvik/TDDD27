import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Question = ({ options, selectOption }) => (
    <div className='question'>
        <h1 className='question__header'>Would you rather...?</h1>
        <div className='question__options'>
            <Option {...options[0]} clickHandler={selectOption} />
            <div>or</div>
            <Option {...options[1]} clickHandler={selectOption} />
        </div>
    </div>
)

const Option = ({ id, text, clickHandler }) => (
    <RaisedButton label={text} primary={true} onClick={() => clickHandler(id)} />
);

export default Question;