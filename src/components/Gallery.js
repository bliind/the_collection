import React, { Component } from 'react'
import Cards from './Cards';
import Filter from './Filter';
import Overlay from './Overlay';
import Controls from './Controls';
import { AppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import Credits from './Credits';

export class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            creditsActive: false,
            selectedCard: null,
            overlayActive: false,
            selectedStyle: 'All',
            filter: '',
        };

        this.setFilter = this.setFilter.bind(this);
        this.setSelectedCard = this.setSelectedCard.bind(this);
        this.setOverlayActive = this.setOverlayActive.bind(this);
        this.setCreditsActive = this.setCreditsActive.bind(this);
        this.setSelectedStyle = this.setSelectedStyle.bind(this);
        this.creditsClick = this.creditsClick.bind(this);
    }

    setSelectedCard(selectedCard) {
        this.setState(() => ({selectedCard, overlayActive: true}));
    }
    
    setOverlayActive(overlayActive) {
        this.setState(() => ({overlayActive}));
    }

    setCreditsActive(creditsActive) {
        this.setState(() => ({creditsActive}));
    }

    setSelectedStyle(selectedStyle) {
        this.setState(() => ({selectedStyle}));
    }

    setFilter(event) {
        this.setState(() => ({filter: event.target.value.toLowerCase()}));
    }

    setSort(e) {
        this.setState(() => ({sort: e.target.value}));
    }
    setDir(e) {
        this.setState(() => ({dir: e.target.value}));
    }

    creditsClick() {
        this.setState(() => ({creditsActive: true}));
    }

    render() {
        const {selectedCard, overlayActive, creditsActive, selectedStyle, filter} = this.state;
        const {user, cards} = this.context;
        const styles = [...new Set(cards.map(card => card.variant_name))];

        const shownCards = cards.filter(card => {
            if (selectedStyle !== 'All' && card.variant_name !== selectedStyle) return false;

            const cardData = JSON.stringify([card.card_name, card.variant_name, card.artist_name]).toLowerCase();
            const filters = filter.split(' ');

            for (let filt of filters) {
                if (cardData.indexOf(filt) === -1) return false;
            }

            return true;
        });

        shownCards.sort((a, b) => a.card_name.localeCompare(b.card_name));

        return (
            <div className='container'>
                <div className='top-left-link'>
                    <Link to='#' onClick={this.creditsClick}>Credits</Link>
                </div>
                <div className='top-right-link'>
                    {user ? <Link to='#'>{user.username}</Link> : ''}
                    {user?.editor === '1' ? <Link to='/collection/add'>Add</Link> : ''}
                    {user ? '' : <Link to='/collection/login'>Login</Link>}
                    {user ? <><Link to='/collection/logout'>Logout</Link></> : ''}
                </div>
                <Overlay selectedCard={selectedCard} overlayActive={overlayActive} setOverlayActive={this.setOverlayActive} />
                <Credits creditsActive={creditsActive} setCreditsActive={this.setCreditsActive} />
                <div className='header'><h1>The Collection</h1></div>
                <Filter filter={filter} setFilter={this.setFilter} shown={shownCards.length} />
                <Controls
                    styles={styles}
                    selectedStyle={selectedStyle}
                    setSelectedStyle={this.setSelectedStyle} />
                <Cards cards={shownCards} setSelectedCard={this.setSelectedCard} />
            </div>
        )
    }
}

Gallery.contextType = AppContext;

export default Gallery
