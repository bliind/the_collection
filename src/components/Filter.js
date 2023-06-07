import React, { Component } from 'react'

export class Filter extends Component {
    constructor(props) {
        super(props);

        this.clearFilter = this.clearFilter.bind(this);
        this.showUnreleased = this.showUnreleased.bind(this);
        this.showNeeded = this.showNeeded.bind(this);
    }

    clearFilter() {
        this.props.setFilter({target: {value: ''}});
    }

    showUnreleased() {
        this.props.toggleShowUnreleased();
    }
    showNeeded() {
        this.props.toggleShowNeeded();
    }

    render() {
        const {filter, setFilter, showNeeded, showUnreleased, shown} = this.props;

        return (
            <div className='filter-container'>
                <button type='button' className='btn filter-unreleased' onClick={this.showUnreleased}>{showUnreleased ? '✔' : '✖'} Unreleased</button>
                <button type='button' className='btn filter-needed' onClick={this.showNeeded}>{showNeeded ? '✔' : '✖'} Needed</button>
                <input type='text' className='input filter-input' placeholder='Filter...' value={filter} onChange={setFilter} />
                <button type='button' className='btn filter-clear' onClick={this.clearFilter}>✕</button>
                <div className='filter-number'>{shown}</div>
            </div>
        )
    }
}

export default Filter
