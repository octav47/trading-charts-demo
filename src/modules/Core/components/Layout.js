import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from './Wrapper'

import styles from '../styles/Layout.module.sass'

const Layout = props => {
    const { children } = props

    return (
        <div className={styles.layout}>
            <Wrapper>
                {children}
            </Wrapper>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
}

export default Layout
