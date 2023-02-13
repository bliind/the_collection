import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'

export class AuthRoute extends Component {
    render() {
        const {user, children, ...rest} = this.props;
        return (
            <Route
                {...rest}
                render={() =>
                    user !== null ? (
                        children
                    ) : (
                        <Redirect to='/pop' />
                )} />
        )
    }
}

export default AuthRoute
