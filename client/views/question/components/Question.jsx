import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Question = ({ _id, options, text, selectOption }) => (
    <div className='question'>
        <h1 className='question__header'>{text}</h1>
        <div className='question__options'>
            <Option text={options[0]} optionIdx={0} questionId={_id} selectOption={selectOption} />
            <div>or</div>
            <Option text={options[1]} optionIdx={1} questionId={_id} selectOption={selectOption} />
        </div>
    </div>
)


const Option = ({ optionIdx, questionId, text, clickHandler }) => (
    <RaisedButton
        label={text}
        primary={true}
        onClick={() => selectOption(questionId, optionIdx)}
    />
);

export default Question;