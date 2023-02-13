import React, { Component } from 'react'

export class Controls extends Component {
    constructor(props) {
        super(props);

        this.setSelectedStyle = this.setSelectedStyle.bind(this);
    }

    setSelectedStyle(e) {
        this.props.setSelectedStyle(e.target.value);
    }

    render() {
        // const {styles, selectedStyle} = this.props;

        return (
            <div className='controls'>
                {/* <div className='control-dropdown'>
                    <label htmlFor='set-series'>Style</label>
                    <div className='select series-select'>
                        <select id='set-series' onChange={this.setSelectedStyle} value={selectedStyle}>
                            <option value='All'>All</option>
                            {styles.map(style => (
                                style === null ? '' : <option key={style} value={style}>{style}</option>
                            ))}
                        </select>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default Controls
