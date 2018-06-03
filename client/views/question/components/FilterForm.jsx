import React from 'react';

const FilterForm = ({ filterText, setFilterText }) => (
    <div className='question-filter'>
        <span>Search </span>
        <input
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
            placeholder='for a word/phrase'
        />
    </div>
);

export default FilterForm;