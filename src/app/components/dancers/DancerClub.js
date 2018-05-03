import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import './styles/DancerClub.css'

export default class DancerClub extends Component {
    render() {
        const { data, config } = this.props

        let clubs = data.split(',')

        return (
            <div>
                {clubs.map((e, i) => {
                    let href = 'clubs/'

                    if (config[e.toLowerCase()]) {
                        href += config[e.toLowerCase()]
                    } else {
                        href += 'noname'
                    }

                    return (
                        <Link to={href} key={href + '_' + i} target="_blank">
                            <span className="club-label label-info">{e}</span>
                        </Link>
                    )
                })}
            </div>

        )
    }
}