import React, { Component } from 'react';

import './question.scss';

export class Question extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: {
                options: [
                    {
                        id: 1,
                        text: 'give up bathing for a month'
                    },
                    {
                        id: 2,
                        text: 'give up the internet for a month'
                    }
                ]
            }
        }

        this.selectOption = this.selectOption.bind(this);
    }

    selectOption(id) {
        console.log(id);
    }

    render() {
        const { options } = this.state.question;

        return (
            <div className='question'>
                <h1 className='question__header'>Would you rather...?</h1>
                <Option {...options[0]} clickHandler={this.selectOption} />
                <div>or</div>
                <Option {...options[1]} clickHandler={this.selectOption} />
            </div>
        );
    }
}

export const Option = ({ id, text, clickHandler }) => (
    <button className='question__option' onClick={() => clickHandler(id)} >
        {text}
    </button>
);

export default Question;