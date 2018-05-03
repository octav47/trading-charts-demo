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
                    <div className="row">
                        <article className="col-sm-12">
                            <JarvisWidget
                                togglebutton={false}
                                editbutton={false}
                                fullscreenbutton={false}
                                colorbutton={false}
                                deletebutton={false}>
                                <header>
                                    <span className="widget-icon">
                                        <i className="glyphicon glyphicon-stats txt-color-darken"/>
                                    </span>
                                    <h2>Chart 1</h2>
                                </header>
                                <div className="no-padding">
                                    <div className="widget-body">
                                        <HighCharts config={{
                                            title: {
                                                text: 'Solar Employment Growth by Sector, 2010-2016'
                                            },

                                            subtitle: {
                                                text: 'Source: thesolarfoundation.com'
                                            },

                                            yAxis: {
                                                title: {
                                                    text: 'Number of Employees'
                                                }
                                            },
                                            legend: {
                                                layout: 'vertical',
                                                align: 'right',
                                                verticalAlign: 'middle'
                                            },

                                            plotOptions: {
                                                series: {
                                                    label: {
                                                        connectorAllowed: false
                                                    },
                                                    pointStart: 2010
                                                }
                                            },

                                            series: [{
                                                name: 'Installation',
                                                data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                                            }, {
                                                name: 'Manufacturing',
                                                data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                                            }, {
                                                name: 'Sales & Distribution',
                                                data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                                            }, {
                                                name: 'Project Development',
                                                data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                                            }, {
                                                name: 'Other',
                                                data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                                            }],

                                            responsive: {
                                                rules: [{
                                                    condition: {
                                                        maxWidth: 500
                                                    },
                                                    chartOptions: {
                                                        legend: {
                                                            layout: 'horizontal',
                                                            align: 'center',
                                                            verticalAlign: 'bottom'
                                                        }
                                                    }
                                                }]
                                            }

                                        }}/>
                                    </div>
                                </div>
                            </JarvisWidget>
                        </article>
                    </div>
                </WidgetGrid>
            </div>
        )
    }
}