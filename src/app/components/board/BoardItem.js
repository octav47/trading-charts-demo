import React, { Component, PropTypes } from 'react'

import { Link } from 'react-router'

export default class BoardItem extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        isPopular: PropTypes.bool,
        external: PropTypes.bool,
        disabled: PropTypes.bool,
    }

    render() {
        const { title, url, icon, isPopular, external, disabled } = this.props

        const ribbon = (isPopular) ? (
            <div className="ribbon"><i className="fa fa-2x fa-star" /></div>) : ''

        const iconTag = <i className={`fa fa-4x fa-${icon}`} />

        const style = (disabled) ? {
            opacity: '0.5',
        } : {}

        const link = (external) ? (
            <a
                href={url}
                className="board-item"
                target="_blank"
                style={style}>
                <div className="panel panel-default">
                    {ribbon}
                    <div className="panel-body status">
                        <div className="who clearfix padding-7 text-align-center font-xs">
                            {title}
                        </div>
                        <div className="text text-align-center">
                            {iconTag}
                        </div>
                    </div>
                </div>
            </a>
        ) : (
            <Link
                className="board-item"
                to={`/${url}`}
                key={url}
                activeClassName="active"
                style={style}>
                <div className="panel panel-default">
                    {ribbon}
                    <div className="panel-body status">
                        <div className="who clearfix padding-7 text-align-center font-xs">
                            {title}
                        </div>
                        <div className="text text-align-center">
                            {iconTag}
                        </div>
                    </div>
                </div>
            </Link>
        )

        return (
            <article className="col-lg-2 col-md-2 col-sm-2 col-xs-4">
                {link}
            </article>
        )
    }
}
