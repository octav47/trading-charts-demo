import React, { Component, PropTypes } from 'react'

import { WidgetGrid, JarvisWidget } from '../../../components'

export default class Clubs extends Component {
    render() {
        let title = <h2>Клуб</h2>
        return (
            <div>
                <div id="content">
                    <WidgetGrid>
                        <div className="row">
                            <article className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <JarvisWidget editbutton={false} color="purple">
                                    <header>
                                        <span className="widget-icon"> <i className="fa fa-table"/> </span>
                                        {title}
                                    </header>
                                    <div>
                                        <div className="widget-body smart-form">
                                            {this.props.children}
                                        </div>
                                    </div>
                                </JarvisWidget>
                            </article>
                        </div>
                    </WidgetGrid>
                </div>
            </div>
        )
    }
}