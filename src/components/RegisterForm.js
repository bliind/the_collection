import React, { Component } from 'react'
import TextInput from './form/TextInput'
import PasswordInput from './form/PasswordInput'
import Buttons from './form/Buttons'
import { Link } from 'react-router-dom';
import {AppContext} from '../contexts/AppContext'

export class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: '',
            loading: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.reset = this.reset.bind(this)
    }

    setError(error) {
        this.setState({...this.state, error: error})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState(() => ({loading: true}));

        const formdata = new FormData();
        formdata.append('username', this.state.username);
        formdata.append('email', this.state.email);
        formdata.append('password', this.state.password);

        const {urlBase} = this.context;
        fetch(`${urlBase}/api/register`, {
            'method': 'POST',
            'body': formdata
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data['username'] !== 'undefined') {
                document.cookie = 'username=' + data.username + ';' + (new Date()).setTime(data.expires) + ';path=/'
                document.cookie = 'token=' + data.token + ';' + (new Date()).setTime(data.expires) + ';path=/'
                this.context.setUser(data);
            } else {
                this.setError('Failed to register');
            }

            this.setState(() => ({loading: false}));
        });
    }

    handleChange(e) {
        const {name, value, validity} = e.target;
        if (validity.valid) {
            this.setState({[name]: value});
        }
    }

    reset(e) {
        this.setState({
            ...this.state,
            username: '',
            email: '',
            password: '',
        })
    }

    render() {
        const {username, email, password, error, loading} = this.state;
        return (
            <div className='container'>
                <div className='header'>
                    <h2>Register</h2>
                </div>
                <form onSubmit={this.handleSubmit} onReset={this.reset}>
                    {error !== '' ? <div className='error'>{error}</div> : ''}
                    <TextInput id='username' label='Username' onChange={this.handleChange} value={username} />
                    <TextInput id='email' label='E-mail' onChange={this.handleChange} value={email} />
                    <PasswordInput id='password' label='Password' onChange={this.handleChange} value={password} />
                    <Buttons label='Register' loading={loading} />
                </form>
                <Link className='top-right-link' to='/collection'>Back</Link>
            </div>
        )

    }
}

RegisterForm.contextType = AppContext;

export default RegisterForm
