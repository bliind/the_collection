import React, { Component } from 'react'

export class Controls extends Component {
    constructor(props) {
        super(props);

        this.showUnreleased = this.showUnreleased.bind(this);
        this.showNeeded = this.showNeeded.bind(this);
    }

    showUnreleased() {
        this.props.toggleShowUnreleased();
    }
    showNeeded() {
        this.props.toggleShowNeeded();
    }

    render() {
        const {showNeeded, showUnreleased} = this.props;
        return (
            <div className='controls'>
                <button type='button' className='btn' onClick={this.showUnreleased}>{showUnreleased ? '✔' : '✖'} Unreleased</button>
                <button type='button' className='btn' onClick={this.showNeeded}>{showNeeded ? '✔' : '✖'} Needed</button>
            </div>
        )
    }
}

export default Controls
