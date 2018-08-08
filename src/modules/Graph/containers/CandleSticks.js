import React from 'react'
import PropTypes from 'prop-types'
import HighCharts from 'highcharts/highstock'

class CandleSticks extends React.Component {
    componentDidMount () {
        this.initChart()
    }

    initChart = () => {
        const { chart } = this
        const { title, data } = this.props

        HighCharts.stockChart(chart.id, {
            rangeSelector: {
                selected: 1,
            },
            title: {
                text: title,
            },
            series: [{
                type: 'candlestick',
                data,
                dataGrouping: {
                    units: [
                        [
                            'week',
                            [1],
                        ], [
                            'month',
                            [1, 2, 3, 4, 6],
                        ],
                    ],
                },
            }],
        })
    }

    render() {
        return (
            <div
                id="chart"
                ref={e => {
                    this.chart = e
                }} />
        )
    }
}

CandleSticks.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array,
}

export default CandleSticks
