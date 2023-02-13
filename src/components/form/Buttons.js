import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Buttons extends Component {
    render() {
        const {label, loading} = this.props;
        return (
            <div className='form-group'>
                <button type='submit' className='btn btn-success'>
                    {loading ? <div className='loader'></div> : (label ? label : 'Submit')}
                </button>
                <button type='reset' className='btn btn-danger'>Reset Form</button>
            </div>
        )
    }
}

Buttons.propTypes = {
    label: PropTypes.string,
}

export default Buttons
