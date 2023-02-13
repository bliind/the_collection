import React, { Component } from 'react'

export class Tabs extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            tabsOpen: false,
        }

        this.setTabsOpen = this.setTabsOpen.bind(this);
        this.setSelectedSeries = this.setSelectedSeries.bind(this);
    }

    setSelectedSeries(e) {
        if (this.state.tabsOpen || !e.target.classList.contains('active')) {
            e.stopPropagation();
            const series = e.target.getAttribute('data-series');
            this.props.setSelectedSeries(series);
            this.setState(() => ({tabsOpen: false}));
        }
    }

    setTabsOpen(e) {
        this.setState(() => ({tabsOpen: true}));
    }

    render() {
        const {series, selectedSeries} = this.props;
        const {tabsOpen} = this.state;

        return (
            <div className={`tabs ${tabsOpen ? 'active' : ''}`} onClick={this.setTabsOpen}>
            <div data-series='all' className={`tab ${selectedSeries === 'all' ? 'active' : ''}`} onClick={this.setSelectedSeries}>
                All
            </div>
                {series.map(seri => (
                    <div
                        key={seri}
                        data-series={seri}
                        className={`tab ${selectedSeries === seri ? 'active' : ''}`}
                        onClick={this.setSelectedSeries}>
                        {seri}
                    </div>
                ))}
            </div>
        )
    }
}

export default Tabs
