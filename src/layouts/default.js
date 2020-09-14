import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../components/Nav';
import '../style/main.css';

const Layout = ({ children, connected, version, buildDate, tryReconnect }) => {
    return(
        <div id='root' className="flex flex-col">
            <div className='gradient top-0 left-0 w-full h-8 z-0'/>
            <div className='flex flex-wrap p-4 max-w-screen-md'>
                <div className="flex flex-col w-full" >
                    <Nav connected={connected} 
                        version={version} 
                        buildDate={buildDate}
                        tryReconnect={tryReconnect}
                    />
                </div>
                {children}
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout