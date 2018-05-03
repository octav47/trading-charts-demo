import React, { Component } from 'react'

import { WidgetGrid }  from '../../../components'
import PageNotImplemented from '../../misc/containers/PageNotImplemented'

class Stats extends Component {
    render() {
        return (
            <div id="content">
                <WidgetGrid>
                    <PageNotImplemented/>
                </WidgetGrid>
            </div >
        )
    }
}

export default Stats