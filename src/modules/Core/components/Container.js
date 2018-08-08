import React from 'react'
import PropTypes from 'prop-types'

import styles from '../styles/Container.module.sass'

const Container = props => {
    const { children, ...rest } = props

    return (
        <div
            {...rest}
            className={styles.container}>
            {children}
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
}

export default Container
