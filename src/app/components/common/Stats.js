import React from 'react'

import SparklineContainer, { Sparkline } from '../graphs/inline/SparklineContainer'

export default class Stats extends React.Component {
    state = {
        id: 1,
        charts: [
            {
                id: 1,
                values: [110, 150, 300, 130, 400, 240, 220, 310, 220, 300, 270, 210],
            },
        ],
    }

    handleAddChart = () => {
        let { id } = this.state
        const { charts } = this.state

        id++

        const values = []

        for (let i = 0; i < 10; i++) {
            values.push(Math.floor(Math.random() * (100 - 50 + 1)) + 50)
        }

        charts.push({
            id,
            values,
        })

        this.setState({
            id,
            charts,
        })
    }

    handleDeleteChart = id => {
        const { charts } = this.state

        this.setState({
            charts: charts.filter(chart => chart.id !== id)
        })
    }

    render() {
        const { charts } = this.state
        const { className, ...props } = this.props

        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <button
                    className="btn btn-default btn-xs"
                    onClick={this.handleAddChart}>
                    <i className="fa fa-plus" /> chart
                </button>
                <ul
                    id="sparks"
                    className={className}
                    style={{
                        textAlign: 'left',
                    }}>
                    {charts.map((chart, i) => {
                        return (
                            <li key={i} className="sparks-info">
                                <div style={{
                                    textAlign: 'center',
                                }}>value {chart.id} <button
                                    value={chart.id}
                                    className="btn btn-danger btn-xs"
                                    onClick={this.handleDeleteChart.bind(this, chart.id)}>
                                    <i className="fa fa-minus" />
                                </button></div>
                                <Sparkline
                                    className="custom-sparkline txt-color-blue"
                                    values={chart.values} />
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
