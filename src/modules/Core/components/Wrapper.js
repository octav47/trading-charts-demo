import React from 'react'
import PropTypes from 'prop-types'

import styles from '../styles/Wrapper.module.sass'

const Wrapper = props => {
    const { children } = props

    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

Wrapper.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
}

export default Wrapper
