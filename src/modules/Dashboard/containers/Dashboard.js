import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Icon from 'react-fontawesome'
import { Layout, Container, Button } from 'Modules/Core'
import { CandleSticks } from 'Modules/Graph'

import { getData } from '../actions'

class Dashboard extends React.Component {
    componentDidMount () {
        this.updateChart()
    }

    updateChart = () => {
        const { getData } = this.props

        getData()
    }

    handleUpdateChart = () => {
        this.updateChart()
    }

    render () {
        const { fetching, chart } = this.props

        return (
            <Layout>
                <Container
                    style={{
                        minHeight: '425px',
                    }}>
                    {fetching ? (
                        <div
                            style={{
                                textAlign: 'center',
                            }}>
                            <Icon
                                name="cog"
                                size="5x"
                                spin={true}
                                style={{
                                    opacity: 0.5,
                                }} />
                        </div>
                    ) : (
                        <React.Fragment>
                            <CandleSticks
                                title="Google"
                                data={chart.data} />
                            <div>
                                <Button onClick={this.handleUpdateChart}>
                                    Update
                                </Button>
                            </div>
                        </React.Fragment>
                    )}
                </Container>
            </Layout>
        )
    }
}

Dashboard.propTypes = {
    fetching: PropTypes.bool,
    chart: PropTypes.object,
    getData: PropTypes.func,
}

const mapStateToProps = state => {
    return {
        ...state.dashboard,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getData: () => {
            dispatch(getData())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
