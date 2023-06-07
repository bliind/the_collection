import React, { Component } from 'react'
import NoVideo from './NoVideo';

export class CardVideo extends Component {
    constructor(props) {
        super(props);

        const {card} = props;

        this.state = {
            src: card.video_link,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const { card } = this.props;
            this.setState(() => ({
                src: card.video_link,
            }))
        }
    }

    render() {
        const {card} = this.props;
        const {src} = this.state;

        return (<>
            {null === src || '' === src ?
                <NoVideo card={card} />
                :
                <video style={{maxHeight: '90vh', maxWidth: '100vw'}} muted loop autoPlay src={src}></video>
            }
        </>);
;
    }
}

export default CardVideo
