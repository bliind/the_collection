import React, { Component } from 'react'
import { AppContext } from '../contexts/AppContext';

export class CardImage extends Component {
    constructor(props) {
        super(props);

        const {card} = props;
        const {card_name, variant_name, artist_name, image_link} = card;
        this.urlBase = ''

        this.state = {
            src: `https://snaptracker.me/collection/images/${image_link}?v=3`,
            alt: `${card_name} ${variant_name ? variant_name : artist_name}`,
            error: false,
            noimage: `https://snaptracker.me/collection/images/noimage.webp`,
        };
    }

    componentDidUpdate(prevProps) {
        const {urlBase} = this.context;
        this.urlBase = urlBase;

        if (prevProps !== this.props) {
            const { card } = this.props;
            this.setState(() => ({
                src: `https://snaptracker.me/collection/images/${card.image_link}?v=3`,
                alt: `${card.card_name} ${card.variant_name ? card.variant_name : card.artist_name}`,
                error: false
            }))
        }
    }

    onError() {
        if (!this.state.error) {
            this.setState({src: this.state.noimage, error: true});
        }
    }

    render() {
        const {src, alt} = this.state;

        return <img src={src} alt={alt} onError={this.onError.bind(this)} />;
    }
}

CardImage.contextType = AppContext;

export default CardImage
