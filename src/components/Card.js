import React, { Component } from 'react'
import Badge from './Badge';
import CardImage from './CardImage';

export class Card extends Component {
    selectCard(e) {
        e.preventDefault();
        this.props.setSelectedCard(this.props.card);
    }

    render() {
        const {card} = this.props;

        return (<span>
            {card.id ? (
                <div className={`card ${card.release_status.toLowerCase()} ${card.video_status.toLowerCase()}`} onClick={this.selectCard.bind(this)}>
                    <CardImage card={card} thumb={true} />
                    <div className='card-text'>
                        {card.card_name}
                        <br />
                        {card.variant_name ? card.variant_name : card.artist_name}
                    </div>
                    {card.release_status === 'UNRELEASED' ? <Badge label='UNRELEASED' /> : ''}
                    {card.video_status === 'NEEDED' ? <Badge label='NEEDED' /> : ''}
                </div>
            ) : (
                <div className='card'>
                    <div className='loader-wrapper'>
                        <div className='loader'></div>
                    </div>
                </div>
            )}
        </span>)
    }
}

export default Card
