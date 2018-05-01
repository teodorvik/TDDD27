import React from 'react';

const Listing = ({ questions }) => {
    if(typeof questions === 'undefined') {
        return <p>No questions</p>
    }
    return (
        <table>
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
                    questions.map(question => <TableRow key={question.cuid} question={question} />)
                }
            </tbody>
        </table>
    );
}

const TableRow = ({ text, options, cuid }) => (
    <tr>
        <td>{text}</td>
        <td>{options[0]}</td>
        <td>{options[1]}</td>
        <td>{cuid}</td>
    </tr>
)

export default Listing;