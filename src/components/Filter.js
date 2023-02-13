import React, { Component } from 'react'

export class Filter extends Component {
    clearFilter() {
        this.props.setFilter({target: {value: ''}});
    }

    render() {
        const {filter, setFilter, shown} = this.props;

        return (
            <div className='filter-container'>
                <input type='text' className='input filter-input' placeholder='Filter...' value={filter} onChange={setFilter} />
                <button type='button' className='btn filter-clear' onClick={this.clearFilter.bind(this)}>✕</button>
                <div className='filter-number'>{shown}</div>
            </div>
        )
    }
}

export default Filter
