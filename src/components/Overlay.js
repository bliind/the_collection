import React, { Component } from 'react'
import CardVideo from './CardVideo';
import {AppContext} from '../contexts/AppContext'
import { Link } from 'react-router-dom';

export class Overlay extends Component {
    onClick(e) {
        e.preventDefault();
        this.props.setOverlayActive(false);
    }

    render() {
        const card = this.props.selectedCard;
        const {user} = this.context;
        const {overlayActive} = this.props;

        return (<>
            {overlayActive ? (
                <div className={`overlay ${overlayActive ? 'active' : ''}`} onClick={this.onClick.bind(this)}>
                    {card ? (
                        <div  style={{display: 'flex', flexDirection: 'column', textAlign: 'center', fontSize: '1.2em'}}>
                            <CardVideo card={card} />
                            {user?.editor === '1' ? <><Link className='edit-link' to={`/collection/edit/${card.id}`}>✏ Edit</Link><br /></> : ''}
                            {card.card_name} {card.variant_name ? ` - ${card.variant_name}` : ''}
                            <br />
                            🖌 {card.artist_name}

                        </div>
                    ) : ''}
                </div>
            ) : ''}
        </>)
    }
}

Overlay.contextType = AppContext;

export default Overlay
