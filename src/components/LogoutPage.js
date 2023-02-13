import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

export class LogoutPage extends Component {
    render() {
        document.cookie = 'username=;' + (new Date()) + ';path=/'
        document.cookie = 'token=;' + (new Date()) + ';path=/'
        document.cookie = 'editor=;' + (new Date()) + ';path=/'
        this.context.setUser(null);

        return <Redirect to='/collection' />;
    }
}

LogoutPage.contextType = AppContext;

export default LogoutPage
