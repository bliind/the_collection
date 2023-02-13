import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Credits extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.linkClick = this.linkClick.bind(this);
    }
    onClick(e) {
        e.preventDefault();
        this.props.setCreditsActive(false);
    }

    linkClick(e) {
        e.stopPropagation();
    }

    render() {
        const {creditsActive} = this.props;

        return (<>
            {creditsActive ? (
                <div className={`credits-overlay ${creditsActive ? 'active' : ''}`} onClick={this.onClick}>
                    <div className='credits-container'>
                        <div className='credits-entry credits-creator'>
                            Creator of <b>The Collection</b>:
                            <Link to='#' onClick={this.linkClick}>Plixie</Link>
                        </div>
                        <div className='credits-entry credits-editor'>
                            Diligent Editor:
                            <Link to='#' onClick={this.linkClick}>CraigRTG</Link>
                        </div>
                        <div className='credits-entry credits-website'>
                            Website Conversion:
                            <Link to='#' onClick={this.linkClick}>./swn</Link>
                        </div>
                        <div className='credits-entry credits-contributors'>
                            Huge Thank You To The Contibutors:
                            <ul>
                                <li>iDabBandito</li>
                                <li>Exrian</li>
                                <li>Loser</li>
                                <li>TheChibiOne</li>
                                <li>PsykozZ</li>
                                <li>Twilight_Gap</li>
                                <li>Double</li>
                                <li>Savai</li>
                                <li>Firefox19</li>
                                <li>Lazernerd</li>
                                <li>H8TRED</li>
                                <li>Knight Blader</li>
                                <li>MasterWalks</li>
                                <li>NobleRoar</li>
                                <li>Jodie</li>
                                <li>Lopata</li>
                                <li>bfz</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : ''}
        </>)
    }
}

export default Credits
