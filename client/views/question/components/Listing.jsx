import React, { Component } from 'react';
import { pie, arc } from 'd3-shape';
import { select } from 'd3-selection';

const d3 = { pie, arc, select };

const Listing = ({ questions }) => {
    if (typeof questions === 'undefined') {
        return <p>No questions</p>
    }
    return (
        <React.Fragment>
            <div className='question-listing__info'>Your answer is displayed in blue</div>
            <div className='question-listing'>
                <div className='row'>
                    <div className='option-1-text header'>Option 1</div>
                    <div className='option-1-vote header'>Votes</div>
                    <div className='percentage header'>%</div>
                    <div className='option-2-votes header'>Votes</div>
                    <div className='option-2-text header'>Option 2</div>
                </div>
                {
                    questions.map(question => <Row key={question._id} {...question} />)
                }
            </div>
        </React.Fragment>
    );
}

class Row extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { options, answers, usersChoice } = this.props;
        const data = [{
            value: answers.filter((x) => x.option == 0).length,
            usersChoice: (usersChoice == 0)
        },
        {
            value: answers.filter((x) => x.option == 1).length,
            usersChoice: (usersChoice == 1)
        }]

        return (
            <div className='row'>
                <div className='option-1-text'>
                    <span className={`${data[0].usersChoice ? 'users-choice' : ''}`}>
                        {options[0]}
                    </span>
                </div>
                <div className='option-1-votes'>{data[0].value}</div>
                <div className='percentage'>
                    <Piechart data={data} />
                </div>
                <div className='option-2-votes'>{data[1].value}</div>
                <div className='option-2-text'>
                    <span className={`${data[1].usersChoice ? 'users-choice' : ''}`}>
                        {options[1]}
                    </span>
                </div>
            </div>
        );
    }
}

class Piechart extends Component {
    // Rotates the pie chart
    static calcRotation(data) {
        const firstSlice = data[0].value;
        const secondSlice = data[1].value;
        const total = firstSlice + secondSlice;
        // Centers first slice at the top
        let rotation = (firstSlice / total) * 180;
        rotation = firstSlice > secondSlice ? -rotation : rotation;
        // Rotates 90 degrees extra to center along the horizontal axis
        return rotation - 90;
    }

    constructor(props) {
        super(props);
        this.w = props.width || 60;
        this.h = props.height || 60;
        this.r = props.radius || 30;

        let refPie = null;
    }

    componentDidMount() {
        const { data } = this.props;

        const rotation = Piechart.calcRotation(data);

        const vis = d3.select(this.refPie).append("svg:svg")
            .data([data]) //associate our data with the document
            .attr("width", this.w)
            .attr("height", this.h)
            .append("svg:g") // make a group to hold our pie chart
            .attr("transform", "translate(" + this.r + "," + this.r + ") rotate(" + rotation + ")") // move the center of the pie chart from 0, 0 to radius, radius

        //this will create <path> elements for us using arc data
        var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(this.r);

        const pie = d3.pie().value(function (d) { return d.value; });

        const arcs = vis.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
            .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
            .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
            .attr("class", "slice"); //allow us to style things in the slices (like text)

        arcs.append("svg:path")
            .attr("class", (d, i) => {
                return data[i].usersChoice ? 'selected' : '';
            })
            .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function
    }

    render() {
        return <span ref={node => { this.refPie = node }}></span>;
    }
}

export default Listing;