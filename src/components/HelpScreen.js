import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class HelpScreen extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.linkClick = this.linkClick.bind(this);
    }
    onClick(e) {
        this.props.setHelpActive(false);
        e.preventDefault();
    }

    linkClick(e) {
        e.stopPropagation();
    }

    render() {
        const {helpActive} = this.props;

        return (<>
            {helpActive ? (
                <div className={`overlay dark ${helpActive ? 'active' : ''}`} onClick={this.onClick}>
                    <div className='overlay-container help-screen'>
                        <h2>Want to help?</h2>
                        <p>You can help us out greatly to fill the collection by finding any variants marked "NEEDED" that you own in Animated or above level.</p>
                        <p>Use the screen record function on your mobile phone to record a quick 5-8 second clip of the card's animations.</p>
                        <p>Send that short clip to Plixie on Discord and it will be added! We appreciate any help!</p>
                        <br />
                        <p><Link className='color-link' onClick={this.linkClick} to={{pathname: 'https://www.youtube.com/watch?v=RhvyNrN9VNI'}} target='_blank'>iPhone How-To</Link></p>
                        <p><Link className='color-link' onClick={this.linkClick} to={{pathname: 'https://www.youtube.com/watch?v=n0c45-cspEY&t=31s'}} target='_blank'>Android How-To</Link></p>
                    </div>
                </div>
            ) : ''}
        </>)
    }
}

export default HelpScreen
