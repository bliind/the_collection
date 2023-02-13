import React, { Component } from 'react'

export class SelectBox extends Component {
    render() {
        const {id, label, value, onChange, options, fieldError} = this.props;
        const red = fieldError === id;
        return (
            <div className={`form-group ${red ? 'errored' : ''}`}>
                <label htmlFor={id}>{label}</label>
                <div className='select'>
                    <select className='input' name={id} id={id} value={value} onChange={onChange}>
                        <option value=''></option>
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}

export default SelectBox
