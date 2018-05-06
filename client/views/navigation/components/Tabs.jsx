import React from 'react';

export const Tabs = ({ children }) => (
    <div className='tab-wrapper'>
        {children}
    </div>
);

export const Tab = ({ children, selectTab, active }) => (
    <button
        className={`tab ${active ? 'active' : ''}`.trim()}
        onClick={selectTab}
    >
        {children}
    </button>
);
