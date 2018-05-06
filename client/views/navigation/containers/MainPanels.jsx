import React, { Component } from 'react';
import { connect } from 'react-redux';

class MainPanels extends Component {
    render() {
        const { children, activeTab } = this.props;

        return children[activeTab];
    }
}

const mapStateToProps = ({ activeTab }) => ({ activeTab });
// const mapStateToProps = state => {
//     const {activeTab} = state;
//     return { activeTab };
// };

export default connect(mapStateToProps)(MainPanels);