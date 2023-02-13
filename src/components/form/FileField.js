import React, { Component } from 'react'

export class FileField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: 'Select File',
            image: null,
        }

        this.buttonClick = this.buttonClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    buttonClick() {
        this.inputElement.click();
    }

    onChange(event) {
        this.props.onChange(event);
        if (event.target.files && event.target.files[0]) {
            const {value} = this.inputElement;
            let filename = '';
            if (value && value.indexOf('/') !== -1) {
                filename = value.split('/').reverse()[0];
            } else if (value && value.indexOf('\\') !== -1) {
                filename = value.split('\\').reverse()[0];
            } else {
                filename = 'Select File';
            }

            let img = event.target.files[0];

            this.setState({...this.state, display: filename, image: URL.createObjectURL(img)});
        }
    }

    render() {
        const {id, label, pattern, fieldError} = this.props;
        const {display, image} = this.state;
        const red = fieldError === id;

        return (
            <div className={`form-group ${red ? 'errored' : ''}`}>
                <label htmlFor={id}>{label}</label>
                <input ref={input => this.inputElement = input} type='file' className='file-input' data-display={display} name={id} id={id} onChange={this.onChange} pattern={pattern} />
                <div className='form-group'>
                    <button type='button' className='btn' onClick={this.buttonClick}>{display}</button>
                    {image ? <img alt='uploaded' className='form-preview-image' src={image} /> : ''}
                </div>
            </div>
        )
    }
}

export default FileField
