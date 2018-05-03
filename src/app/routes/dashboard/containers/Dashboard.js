/**
 * Created by griga on 11/30/15.
 */

import React from 'react'

import HighCharts from 'react-highcharts'

import WidgetGrid from '../../../components/widgets/WidgetGrid'
import JarvisWidget from '../../../components/widgets/JarvisWidget'
import Stats from '../../../components/common/Stats'
import BigBreadcrumbs from '../../../components/navigation/components/BigBreadcrumbs'

import BirdEyeWidget from '../components/BirdEyeWidget'
import LiveFeeds from '../components/LiveFeeds'
import ChatWidget from '../../../components/chat/components/ChatWidget'
import FullCalendarWidget from '../../../components/calendar/components/FullCalendarWidget'
import TodoWidget from '../../../components/todo/components/TodoWidget'
import HighchartTable from '../../../components/graphs/highchart/HighchartTable'

export default class Dashboard extends React.Component {
    render() {
        return (
            <div id="content">
                <div className="row">
                    <Stats/>
                </div>
                <WidgetGrid>
                    <div className="row">
                        <article className="col-sm-12">
                            <LiveFeeds/>
                        </article>
                    </div>
                </WidgetGrid>
            </div>
        )
    }
}
