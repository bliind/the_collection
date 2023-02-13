import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class TextInput extends Component {
    render() {
        const {id, label, value, onChange, pattern, fieldError} = this.props;
        const red = fieldError === id;

        return (
            <div className={`form-group ${red ? 'errored' : ''}`}>
                <label htmlFor={id}>{label}</label>
                <input type='text' className='input' name={id} id={id} value={value} onChange={onChange} pattern={pattern} />
            </div>
        )
    }
}

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    pattern: PropTypes.string,
}

export default TextInput
