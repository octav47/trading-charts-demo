import React from 'react'


import SparklineContainer from '../../../components/graphs/inline/SparklineContainer'
import EasyPieChartContainer from '../../../components/graphs/inline/EasyPieChartContainer'
import FlotChart from '../../../components/graphs/flot/FlotChart'


class LiveStats extends React.Component {
    componentDidMount() {
        this.interval = setInterval(this._updateStats, 1000)
    }

    state = {
        liveSwitch: false,
        liveStats: [FakeDataSource.getRandomData()],
    }

    _updateStats = () => {
        this.setState({
            liveStats: [FakeDataSource.getRandomData()],
        })
    }

    _toggleSwitch = () => {
        this.state.liveSwitch = !this.state.liveSwitch
        if (this.state.liveSwitch) {
            this.interval = setInterval(this._updateStats, 1000)
        } else {
            clearInterval(this.interval)

        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        const { liveStats } = this.state
        const progressBarValue = liveStats[0].slice(-1)[0][1]

        const [value1, value2] = [
            Math.floor(progressBarValue),
            Math.floor(Math.sqrt(progressBarValue)),
        ]

        console.log(value1)

        return (
            <div className={this.props.className} id={this.props.id}>
                <div className="row no-space">
                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">

                        <FlotChart className="chart-large txt-color-blue" data={liveStats}
                                   options={liveStatsChartOptions}/>

                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 show-stats">

                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-12 col-lg-12"><span
                                className="text"> Live progressbar<span
                                className="pull-right">{value1}</span> </span>

                                <div className="progress">
                                    <div className="progress-bar bg-color-blueDark"
                                         style={{ width: `${value1}%` }}/>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-12 col-lg-12"><span
                                className="text"> Prograssbar 2 <span
                                className="pull-right">{value2}</span> </span>

                                <div className="progress">
                                    <div className="progress-bar bg-color-blue"
                                         style={{ width: `${value2 * value2}%` }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

let FakeDataSource = {
    data: [],
    total: 200,
    getRandomData: function () {
        if (this.data.length > 0)
            this.data = this.data.slice(1)

        // do a random walk
        while (this.data.length < this.total) {
            var prev = this.data.length > 0 ? this.data[this.data.length - 1] : 50
            var y = prev + Math.random() * 10 - 5
            if (y < 0)
                y = 0
            if (y > 100)
                y = 100
            this.data.push(y)
        }

        // zip the generated y values with the x values
        var res = []
        for (var i = 0; i < this.data.length; ++i)
            res.push([i, this.data[i]])
        return res
    },
}


let liveStatsChartOptions = {
    yaxis: {
        min: 0,
        max: 100,
    },
    xaxis: {
        min: 0,
        max: 100,
    },
    colors: ['rgb(87, 136, 156)'],
    grid: {
        show: true,
        hoverable: true,
        clickable: true,
        borderWidth: 0,
    },
    series: {
        lines: {
            lineWidth: 1,
            fill: true,
            fillColor: {
                colors: [
                    {
                        opacity: 0.4,
                    },
                    {
                        opacity: 0,
                    },
                ],
            },
            steps: false,

        },
    },
}


export default LiveStats