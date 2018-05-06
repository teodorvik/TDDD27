import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../styles/main-panel.scss';

class MainPanels extends Component {
    render() {
        const { children, activeTab } = this.props;

        return <div className='main-panel'>{children[activeTab]}</div>;
    }
}

const mapStateToProps = ({ activeTab }) => ({ activeTab });

export default connect(mapStateToProps)(MainPanels);