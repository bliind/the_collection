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
        
        const released = card.release_status === 'RELEASED';
        // const recorded = card.video_status === 'RECORDED';
        const recorded = [null, ''].indexOf(card.video_link) === -1;
        const video_status = recorded ? 'RECORDED' : 'NEEDED';

        return (<span>
            {card.id ? (
                <div className={`card ${card.release_status.toLowerCase()} ${video_status.toLowerCase()}`} onClick={this.selectCard.bind(this)}>
                    <CardImage card={card} thumb={true} />
                    <div className='card-text'>
                        {card.card_name}
                        <br />
                        {card.variant_name ? card.variant_name : card.artist_name}
                        <br />
                        {card.tags ? <i>{card.tags}</i> : ''}
                    </div>
                    {released ? '' : <Badge label='UNRELEASED' />}
                    {released && !recorded ? <Badge label='NEEDED' /> : ''}
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
