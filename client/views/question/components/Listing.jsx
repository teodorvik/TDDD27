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
    if(typeof questions === 'undefined') {
        return <p>No questions</p>
    }
    return (
        <Table>
            <TableHeader adjustForCheckbox={false}>
                <TableRow>
                    <TableHeaderColumn>Question</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                    <TableHeaderColumn>Option 2</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody stripedRows={true}>
                {
                    questions.map(question => <Row key={question._id} {...question} />)
                }
            </TableBody>
        </Table>
    );
}

const Row = ({ text, options, cuid }) => (
    <TableRow>
        <TableRowColumn>{text.replace(/(\.\.\.\?)/g, '')} {options[0]} or {options[1]}</TableRowColumn>
        <TableRowColumn>{Math.floor(Math.random() * 100)} | {Math.floor(Math.random() * 100)}</TableRowColumn>
        <TableRowColumn>{options[1]}</TableRowColumn>
    </TableRow>
)

export default Listing;