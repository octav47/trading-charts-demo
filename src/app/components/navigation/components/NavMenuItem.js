import React from 'react'
import { Link } from 'react-router'
import Msg from '../../i18n/Msg'

import SmartMenuList from './NavMenuList'


export default class SmartMenuItem extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    render() {
        const item = this.props.item


        const title = !item.parent ?
            <span className="menu-item-parent"><Msg phrase={item.title}/></span> :
            <Msg phrase={item.title}/>

        const badge = item.badge ? <span className={item.badge.class}>{item.badge.label || ''}</span> : null
        const childItems = item.items ? <SmartMenuList items={item.items}/> : null

        const icon = item.icon ? (
            item.counter ? <i className={item.icon}><em>{item.counter}</em></i> : <i className={item.icon}/>
        ) : null


        let liClassName = (item.route && this.context.router.isActive(item.route) ) ? 'active' : ''

        if (item.disabled) {
            liClassName += ' disabled'
        }

        const externalIcon = (item.external) ? <i className="fa fa-fw fa-external-link"/> : ''

        const link = item.route ?
            <Link to={item.route} title={item.title} activeClassName="active">
                {icon} {title} {badge}
            </Link> :
            <a href={item.href || '#'} onClick={this._handleClick} title={item.title} target="_blank">
                {icon} {title} {badge} {externalIcon}
            </a>


        return <li className={liClassName}>{link}{childItems}</li>
    }
}

