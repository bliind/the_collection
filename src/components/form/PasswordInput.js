import React, { Component } from 'react'

export class PasswordInput extends Component {
    render() {
        const {id, label, value, onChange, fieldError} = this.props;
        const red = fieldError === id;
        return (
            <div className={`form-group ${red ? 'errored' : ''}`}>
                <label htmlFor={id}>{label}</label>
                <input type='password' className='input' name={id} id={id} value={value} onChange={onChange} />
            </div>
        )
    }
}

export default PasswordInput
