import React, { Component } from 'react'
import Card from './Card';

export class Cards extends Component {
    render() {
        const {cards, setSelectedCard} = this.props;

        return (
            <div className='content'>
                {cards.map((card, index) => (
                    <Card key={index} card={card} setSelectedCard={setSelectedCard} />
                ))}
            </div>
        )
    }
}

export default Cards
