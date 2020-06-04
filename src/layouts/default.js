import React from 'react'
import PropTypes from 'prop-types'
import Nav from '../components/Nav'
import '../style/main.css'

const Layout = ({ children, connected, version, buildDate }) => {
    return(
        <div id='root' className="grid grid-cols-4 gap-8 p-8 max-w-screen-lg">
            <div className="flex flex-col" >
                <div className="fixed">
                    <Nav 
                        connected={connected} 
                        version={version} 
                        buildDate={buildDate}
                    />
                </div>
            </div>
            <main className="col-span-3 col-start-2">
                {children}
            </main>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout