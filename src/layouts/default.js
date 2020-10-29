import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import PropTypes from 'prop-types';
import BuildDetails from '../components/BuildDetails';
import Nav from '../components/Nav';
import '../style/main.css';

const Layout = ({ children, connected, version, buildDate, tryReconnect }) => {
    return(
        <Router>
            <div className="flex flex-col">
                {/* <div className='gradient top-0 left-0 w-full h-8 z-0'/> */}
                <div className='flex flex-wrap p-4 pr-6 w-full max-w-screen-md mb-8'>
                    <div className="flex flex-col w-full" >
                        <Nav connected={connected} 
                            version={version} 
                            buildDate={buildDate}
                            tryReconnect={tryReconnect}
                        />
                    </div>
                    {children}
                    <div>
                    <BuildDetails version={version} buildDate={buildDate} />
                    </div>
                </div>
            </div>
        </Router>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout