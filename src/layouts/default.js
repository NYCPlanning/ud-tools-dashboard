import React from 'react'
import PropTypes from 'prop-types'
import Nav from '../components/Nav'
import '../style/main.css'

const Layout = ({ children, connected }) => {
    return(
        <div id='root' className="grid grid-cols-4 gap-8 p-8">
            <Nav connected={connected} className="col-span-1" />
            <main className="col-span-3">
                {children}
            </main>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout