import React, { Component } from 'react'
import CardImage from './CardImage';

export class NoVideo extends Component {
    render() {
        const {card} = this.props;

        return (
            <div className="no-video">
                <p>No Video Yet</p>
                {card.release_status === 'UNRELEASED' ? <p>Variant is Unreleased</p> : ''}
                <CardImage card={card} />
            </div>
        );
    }
}

export default NoVideo
