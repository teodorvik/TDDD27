import React from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const Listing = ({ questions }) => {
    if (typeof questions === 'undefined') {
        return <p>No questions</p>
    }
    return (
        <table className='question-listing'>
            <thead>
                <tr>
                    <th>Question</th>
                    <th>Option 1</th>
                    <th>Option 2</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    questions.map(question => <Row key={question._id} {...question} />)
                }
            </tbody>
        </table>
    );
}

const Row = ({ text, options, comment }) => (
    <tr>
        <td></td>
        <td className='question-listing__option'>
            {text.replace(/(\.\.\.\?)/g, '')}
            {" "}
            <span className='blue'>{options[0]}</span> or <span className='red'>{options[1]}</span>
            {
                comment && 
                <p className='question-listing__comment'>{comment}</p>
            }
        </td>
        <td>{Math.floor(Math.random() * 100)} | {Math.floor(Math.random() * 100)}</td>
        <td className='question-listing__option'>

        </td>
        <td>{options[1]}</td>
    </tr>
)

export default Listing;