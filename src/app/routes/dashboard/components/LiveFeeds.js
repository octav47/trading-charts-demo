import React, { Component } from 'react'

import JarvisWidget from '../../../components/widgets/JarvisWidget'

import EasyPieChartContainer from '../../../components/graphs/inline/EasyPieChartContainer'

import LiveStats from './LiveStats'
import SocialNetwork from './SocialNetwork'
import Revenue from './Revenue'

let LiveFeeds = React.createClass({
    render: function () {
        return (
            <JarvisWidget
                togglebutton={false}
                editbutton={false}
                fullscreenbutton={false}
                colorbutton={false}
                deletebutton={false}>

                <header>
                    <span className="widget-icon">
                        <i className="glyphicon glyphicon-stats txt-color-darken"/> </span>

                    <h2>Live Chart </h2>
                </header>

                <div className="no-padding">

                    <div className="widget-body">
                        <LiveStats className="tab-pane fade active in padding-10 no-padding-bottom" id="s1"/>
                    </div>

                </div>

            </JarvisWidget>
        )
    },
})

export default LiveFeeds