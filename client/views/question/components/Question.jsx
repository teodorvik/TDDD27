import React from 'react';

import '../styles/question.scss';

const Question = ({ _id, options, text, selectOption, comment }) => (
    <div className='question'>
        <h1>{text}</h1>
        <div className='question-options'>
            <Option text={options[0]} optionIdx={0} questionId={_id} selectOption={selectOption} />
            <div className='question-seperator'>or</div>
            <Option text={options[1]} optionIdx={1} questionId={_id} selectOption={selectOption} />
        </div>
        {
            comment && <h2>{comment}</h2>
        }
    </div>
)


const Option = ({ optionIdx, questionId, text, selectOption }) => (
    <div
        className='option'
        onClick={() => selectOption(questionId, optionIdx)}
    >
        {text}
    </div>
);

export default Question;