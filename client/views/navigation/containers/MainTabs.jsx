import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectTabAction } from '../actions/tabActions';

import '../styles/main-tabs.scss';

class MainTabs extends Component {
    render() {
        const { children, selectTab, activeTab } = this.props;

        const childrenWithProps = React.Children.map(children, (child, index) => (
            React.cloneElement(child, { 
                selectTab: () => selectTab(index),
                active: index === activeTab
            })
        ));

        return (
            <div className='main-tabs'>{childrenWithProps}</div>
        );
    }
}

const mapStateToProps = ({ activeTab }) => ({ activeTab });

const mapDispatchToProps = dispatch => ({
    selectTab: (id) => {
        dispatch(selectTabAction(id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainTabs);