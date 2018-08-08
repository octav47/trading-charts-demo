import React from 'react'
import PropTypes from 'prop-types'

import styles from '../styles/Button.module.sass'

const Button = props => {
    const { children } = props

    return (
        <button
            {...props}
            className={styles.button}>
            {children}
        </button>
    )
}

Button.defaultProps = {
    type: 'button',
}

Button.propTypes = {
    type: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

export default Button
