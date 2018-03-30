import React from 'react';

import './question.scss';

export const Question = () => (
    <div className='question'>
        <h1 className='question__header'>What would you rather do?</h1>
        <Option text='Give up bathing for a month' />
        <span>or</span>
        <Option text='Give up the internet for a month' />
    </div>
);

export const Option = ({text}) => (
    <div className='question__option'>{text}</div>
);

export default Question;