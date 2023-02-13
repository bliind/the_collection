import React, { Component } from 'react'

export class Badge extends Component {
    render() {
        let {label} = this.props;

        return (
            <div className={`badge ${label.toLowerCase()}`}>
                {label}
            </div>
        );
    }
}

export default Badge
