import React, { Component } from 'react';

class SiteTable extends Component {
    constructor(props){
        super();
        this.state = {
            site: {}
        };
    }

    formatNum = (n) => { return n.toLocaleString(undefined, {maximumFractionDigits:0}); };

    render() {
        if ( Object.keys(this.props.site).length > 0 ) {
            return (
                <div className='w-full'>
                    <table className='w-full'>
                        <tr className='text-left'>
                            <th>Residential</th>
                            <th>Community Facility</th>
                            <th>Commercial</th>
                            <th>Manufacturing</th>
                            <th className='text-gray-400'>Parking</th>
                            <th className='text-gray-400'>Loading</th>
                            <th className='text-right'>Total</th>
                        </tr>
                        <tr className='text-left'>
                            <th>{this.formatNum(this.props.site.GFA.Residential)}</th>
                            <th>{this.formatNum(this.props.site.GFA.CommunityFacility)}</th>
                            <th>{this.formatNum(this.props.site.GFA.Commercial)}</th>
                            <th>{this.formatNum(this.props.site.GFA.Manufacturing)}</th>
                            <th className='text-gray-400'>{this.formatNum(this.props.site.GFA.ParkingProvided)}</th>
                            <th className='text-gray-400'>{this.formatNum(this.props.site.GFA.LoadingProvided)}</th>
                            <th className='text-right'>{this.formatNum(this.props.site.GFA.Total)}</th>
                        </tr>
                    </table>
                    <small>*Areas shown are Gross Floor Area (GFA)</small>
                </div>
            );       
        } else {
            return (
                <div>
                    <p>No site selected...</p>
                </div>
            )
        }

    }
}

export default SiteTable;
