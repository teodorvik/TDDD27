import React, { Component } from 'react';
import { pie, arc } from 'd3-shape';
import { select } from 'd3-selection';

const d3 = { pie, arc, select };

const Listing = ({ questions }) => {
    if (typeof questions === 'undefined') {
        return <p>No questions</p>
    }
    return (
        <table className='question-listing'>
            <thead>
                <tr>
                    <th>Question</th>
                    <th>Stats %</th>
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

class Row extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    isHovered: false,
                    usersChoice: false,
                    value: Math.floor(Math.random() * 100)
                },
                {
                    isHovered: false,
                    usersChoice: true,
                    value: Math.floor(Math.random() * 100)
                }
            ]
        }

        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
        this.calcStyle = this.calcStyle.bind(this);
    }

    onMouseEnterHandler(id) {
        const { data } = this.state;
        data[id].isHovered = true;
        this.setState({ data });
    }

    onMouseLeaveHandler(id) {
        const { data } = this.state;
        data[id].isHovered = false;
        this.setState({ data });
    }

    calcStyle() {
        const { data } = this.state;

        const showUsersChoice = data.find(option => option.isHovered) === undefined;

        if (showUsersChoice) {
            return data.map(option => option.usersChoice ? 'users-choice' : '');
        } else {
            return data.map(option => option.isHovered ? 'hovered' : '');
        }
    }

    render() {
        const { text, options, comment } = this.props;
        const { data } = this.state;

        const styles = this.calcStyle();

        return (
            <tr>
                <td className='question-listing__option'>
                    {text.replace(/(\.\.\.\?)/g, '')}
                    {" "}
                    <span
                        className={styles[0]}
                        onMouseEnter={() => this.onMouseEnterHandler(0)}
                        onMouseLeave={() => this.onMouseLeaveHandler(0)}
                    >
                        {options[0]}
                    </span>
                    {" or "}
                    <span
                        className={styles[1]}
                        onMouseEnter={() => this.onMouseEnterHandler(1)}
                        onMouseLeave={() => this.onMouseLeaveHandler(1)}
                    >
                        {options[1]}
                    </span>
                    {"?"}
                    {
                        comment &&
                        <p className='question-listing__comment'>{comment}</p>
                    }
                </td>
                <td>
                    {data[0].value}
                    <Piechart data={data} />
                    {data[1].value}
                </td>
            </tr>
        );
    }
}

class Piechart extends Component {
    constructor(props) {
        super(props);
        this.w = props.width || 60;
        this.h = props.height || 60;
        this.r = props.radius || 30;

        let refPie = null;
        this.getColors = this.getColors.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    getColors() {
        const { data } = this.props;

        const showUsersChoice = data.find(option => option.isHovered) === undefined;

        // TODO: Doesn't really seem to work
        if (showUsersChoice) {
            return data.map(option => option.usersChoice ? 'blue' : 'lightgray');
        } else {
            return data.map(option => option.isHovered ? 'orange' : 'lightgray');
        }
    }

    componentDidMount() {
        const { data } = this.props;
        const colors = this.getColors();
        const vis = d3.select(this.refPie).append("svg:svg")
            .data([data]) //associate our data with the document
            .attr("width", this.w)
            .attr("height", this.h)
            .append("svg:g") // make a group to hold our pie chart
            .attr("transform", "translate(" + this.r + "," + this.r + ")") // move the center of the pie chart from 0, 0 to radius, radius

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
            .attr("fill", function (d, i) { return colors[i]; })
            .attr("d", arc); //this creates the actual SVG path using the associated data (pie) with the arc drawing function
    }

    updateData() {
        const { data } = this.props;
        const colors = this.getColors();

        if (this.refPie !== null) {
            d3.select(this.refPie)
                .selectAll("g.slice")
                .data([data])
                .selectAll("path")
                .attr("fill", function (d, i) { return colors[i]; });
        }
    }

    render() {
        this.updateData();
        return <span ref={node => { this.refPie = node }}></span>;
    }
}

export default Listing;