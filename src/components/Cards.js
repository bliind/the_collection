import React, { Component } from 'react'
import newid from '../util/newid'
import Card from './Card';

export class Cards extends Component {
    render() {
        const {cards, setSelectedCard} = this.props;

        return (
            <div className='content'>
                {cards.map(card => (
                    <Card key={newid()} card={card} setSelectedCard={setSelectedCard} />
                ))}
            </div>
        )
    }
}

export default Cards
