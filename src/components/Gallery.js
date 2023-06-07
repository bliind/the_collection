import React, { Component } from 'react'
import Cards from './Cards';
import Filter from './Filter';
import Overlay from './Overlay';
import { AppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import Credits from './Credits';
import HelpScreen from './HelpScreen';

export class Gallery extends Component {
    static contextType = AppContext;

    constructor(props, context) {
        super(props, context);

        const shownCards = context.cards;

        this.state = {
            creditsActive: false,
            helpActive: false,
            selectedCard: null,
            overlayActive: false,
            selectedStyle: 'All',
            filter: '',
            shownCards: shownCards,
            showUnreleased: false,
            showNeeded: true,
        };

        this.setFilter = this.setFilter.bind(this);
        this.setSelectedCard = this.setSelectedCard.bind(this);
        this.setOverlayActive = this.setOverlayActive.bind(this);
        this.setCreditsActive = this.setCreditsActive.bind(this);
        this.setHelpActive = this.setHelpActive.bind(this);
        this.setSelectedStyle = this.setSelectedStyle.bind(this);
        this.creditsClick = this.creditsClick.bind(this);
        this.helpClick = this.helpClick.bind(this);
        this.toggleShowUnreleased = this.toggleShowUnreleased.bind(this);
        this.toggleShowNeeded = this.toggleShowNeeded.bind(this);
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
    setHelpActive(helpActive) {
        this.setState(() => ({helpActive}));
    }

    setSelectedStyle(selectedStyle) {
        this.setState(() => ({selectedStyle}));
    }

    setFilter(event) {
        const filter = event.target.value.toLowerCase();

        this.setState(() => ({filter}));
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
    
    helpClick() {
        this.setState(() => ({helpActive: true}));
    }

    toggleShowUnreleased() {
        this.setState(() => ({showUnreleased: !this.state.showUnreleased}));
    }
    toggleShowNeeded() {
        this.setState(() => ({showNeeded: !this.state.showNeeded}));
    }

    updateShown() {
        const {cards} = this.context;
        const {filter, showNeeded, showUnreleased} = this.state;
        
        const shownCards = cards.filter(card => {
            const video_status = ['', null].indexOf(card.video_link) !== -1 ? 'NEEDED' : 'RECORDED'
            if (!showNeeded && video_status === 'NEEDED') return false;
            if (!showUnreleased && card.release_status === 'UNRELEASED') return false;

            let tags = [];
            if (card.tags) tags = card.tags.split(',');

            const cardData = JSON.stringify([...tags, card.card_name, card.variant_name, card.artist_name, video_status]).toLowerCase();
            const filters = filter.split(' ');

            for (let filt of filters) {
                if (cardData.indexOf(filt) === -1) return false;
            }

            return true;
        });

        shownCards.sort((a, b) => a.card_name.localeCompare(b.card_name));

        return shownCards;
    }

    render() {
        const {selectedCard, overlayActive, creditsActive, helpActive} = this.state;
        const {filter, showNeeded, showUnreleased} = this.state;
        const {user} = this.context;

        const shownCards = this.updateShown();

        return (
            <div className='container'>
                <div className='top-left-link'>
                    <Link to='#' onClick={this.creditsClick}>Credits</Link>
                    <Link to='#' onClick={this.helpClick}>How to Help</Link>
                </div>

                <div className='top-right-link'>
                    {user ? <Link to='#'>{user.username}</Link> : ''}
                    {user?.editor === '1' ? <Link to='/collection/add'>Add</Link> : ''}
                    {user ? '' : <Link to='/collection/login'>Login</Link>}
                    {user ? <><Link to='/collection/logout'>Logout</Link></> : ''}
                </div>

                <Overlay selectedCard={selectedCard} overlayActive={overlayActive} setOverlayActive={this.setOverlayActive} />
                <Credits creditsActive={creditsActive} setCreditsActive={this.setCreditsActive} />
                <HelpScreen helpActive={helpActive} setHelpActive={this.setHelpActive} />

                <div className='header'><h1>The Collection</h1></div>

                <Filter
                    filter={filter}
                    setFilter={this.setFilter}
                    showNeeded={showNeeded}
                    toggleShowNeeded={this.toggleShowNeeded}
                    showUnreleased={showUnreleased}
                    toggleShowUnreleased={this.toggleShowUnreleased}
                    shown={shownCards.length} />

                <Cards cards={shownCards} setSelectedCard={this.setSelectedCard} />
            </div>
        )
    }
}

// Gallery.contextType = AppContext;

export default Gallery
