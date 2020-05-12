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
                <div>
                    <p>Gross Floor Area (GFA) Per Use</p>
                    <table>
                        <tr>
                            <th>Residential</th>
                            <th>Community Facility</th>
                            <th>Commercial</th>
                            <th>Manufacturing</th>
                            <th>Parking</th>
                            <th>Loading</th>
                            <th>Total</th>
                        </tr>
                        <tr>
                            <th>{this.formatNum(this.props.site.GFA.Residential)}</th>
                            <th>{this.formatNum(this.props.site.GFA.CommunityFacility)}</th>
                            <th>{this.formatNum(this.props.site.GFA.Commercial)}</th>
                            <th>{this.formatNum(this.props.site.GFA.Manufacturing)}</th>
                            <th>{this.formatNum(this.props.site.GFA.ParkingProvided)}</th>
                            <th>{this.formatNum(this.props.site.GFA.LoadingProvided)}</th>
                            <th>{this.formatNum(this.props.site.GFA.Total)}</th>
                        </tr>
                    </table>
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
