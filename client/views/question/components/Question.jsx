import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Question = ({ options, text, selectOption }) => (
    <div className='question'>
        <h1 className='question__header'>{text}</h1>
        <div className='question__options'>
            <Option text={options[0]} id={1} clickHandler={selectOption} />
            <div>or</div>
            <Option text={options[1]} id={2} clickHandler={selectOption} />
        </div>
    </div>
)


const Option = ({ id, text, clickHandler }) => (
    <RaisedButton
        label={text}
        primary={true}
        onClick={() => clickHandler(id)}
    />
);

export default Question;