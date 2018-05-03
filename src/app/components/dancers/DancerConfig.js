import React from 'react'

import { OverlayTrigger, Popover } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import './styles/DancerConfig.sass'

const ListElement = ({contest: {name, link}}) => {
    let backgroundClassName = 'bg-color-blue'

    if (name.toLowerCase().indexOf('москва') > -1) {
        backgroundClassName = 'bg-color-greenLight'
    } else if (name.toLowerCase().indexOf('санкт-петербург') > -1) {
        backgroundClassName = 'bg-color-redLight'
    }

    return (
        <span className={`label ${backgroundClassName}`}>
            <a href={link} target="_blank">
                {name} <FontAwesome name="external-link"/>
            </a>
        </span>
    )
}

export default class DancerConfig extends React.Component {
    render () {
        const {date, contests} = this.props

        let dateValue = ''
        if (!date) {
            dateValue = <FontAwesome name="cog" spin size="2x"/>
        } else {
            dateValue = date
        }

        let contestsText = null
        let contestsValue
        if (!contests) {
            contestsValue = <FontAwesome name="cog" spin size="2x"/>
        } else {
            contestsText = (
                <div className="database-update-list-title">
                    {contests.length === 1 ? 'Последний турнир:' : 'Последние турниры:'}
                </div>
            )

            contestsValue = contests.map((e, i) => <ListElement
                key={i}
                contest={e} />)
        }

        console.log(contests)

        return (
            <div className="database-update">
                <div className="database-update-date">
                    Обновление официальных результатов от <b>{dateValue}</b>
                </div>
                {contestsText}
                <div className="database-update-list">
                    {contestsValue}
                </div>
            </div>
        )
    }
}
