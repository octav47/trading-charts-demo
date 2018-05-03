import React, { PropTypes } from 'react'

import './styles/DancerPoints.sass'

class DancerPoints extends React.Component {
    pointsColors = [
        '#d44cff',
        '#f21919',
        '#d0b529',
        '#73b8da',
        '#5db13a'
    ]

    static propTypes = {
        points: PropTypes.object.isRequired
    }

    render () {
        const {points} = this.props

        let classNames
        if (points.hasOwnProperty('A')) {
            classNames = ['A', 'B', 'C', 'D', 'E']
        } else {
            classNames = ['Ch', 'S', 'M', 'RS', 'Beg']
        }

        return (
            <ul className="list-unstyled list-points">
                {Object.keys(points).map((_class, i) => {
                    return (
                        <li
                            key={i}
                            className={`points-item point-item-${_class.toLowerCase()}`}>
                            <span className="label">
                                {_class}: {points[_class]}
                            </span>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default DancerPoints
