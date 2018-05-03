import React from 'react'

import {Alert} from 'react-bootstrap'

import {Stats, BigBreadcrumbs, WidgetGrid, JarvisWidget}  from '../../../components'

import {fetchDataSources, fetchCheckSources} from '../actions';

import {connect} from 'react-redux'

class DataSources extends React.Component {
    componentWillMount() {
        console.log('##### componentWillMount');

        const {dispatch} = this.props;

        dispatch(fetchDataSources());
    }

    handleCheckClick() {
        console.log('##### handleCheckClick');

        const {dispatch} = this.props;

        dispatch(fetchCheckSources());
    }

    render() {
        console.log('##### render');

        const {list} = this.props.datasource;
        const {check} = this.props.datasource;

        console.log(this.props.datasource);

        let table = '';
        let tbody = '';

        if (list == 'fetching') {
            table =
                <div>
                    <i className="fa fa-3x fa-spin fa-spinner"/>
                </div>
        } else {
            if (list == 'failed') {
                table =
                    <Alert bsStyle="danger" className="fade in" data-dismiss="alert">
                        <i className="fa-fw fa fa-exclamation-triangle"/>
                        {' '}
                        INIT_DATASOURCE_FAILED
                    </Alert>;
            } else {
                tbody =
                    <tbody>
                    {list && list.map((e, i) => {
                        return (
                            <tr>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                            </tr>
                        )
                    })}
                    </tbody>;
                table =
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                            </tr>
                            </thead>
                            {tbody}
                        </table>
                    </div>
            }
        }

        let checkBtn = <button className="btn btn-primary btn-sm" onClick={this.handleCheckClick.bind(this)}>Check Data
            Sources</button>;
        let checkResult = '';

        if (check) {
            if (check == 'fetching') {
                checkBtn =
                    <button className="btn btn-primary btn-sm" disabled="disabled">
                        Checking...
                    </button>
            } else {
                if (check == 'failed') {
                    checkResult =
                        <Alert bsStyle="danger" className="fade in" data-dismiss="alert">
                            <i className="fa-fw fa fa-exclamation-triangle"/>
                            {' '}
                            CHECK_DATASOURCE_FAILED
                        </Alert>
                } else {
                    checkResult =
                        <Alert bsStyle="info" className="fade in" data-dismiss="alert">
                            Server returns
                            <br/>
                            {JSON.stringify(check, null, 4)}
                        </Alert>
                }
            }
        }

        return (
            <div id="content">
                <WidgetGrid>
                    <div className="row">
                        <article className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <JarvisWidget editbutton={false} color="darken">
                                <header>
                                    <span className="widget-icon"> <i className="fa fa-table"/> </span>
                                    <h2>Data Sources</h2>
                                </header>
                                <div>
                                    <div className="widget-body no-padding">
                                        {table}
                                    </div>
                                </div>
                            </JarvisWidget>
                        </article>
                        <article className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="well smart-form">
                                <div className="row">
                                    <section>
                                        {checkBtn}
                                    </section>
                                </div>
                                <div className="row">
                                    <section>
                                        {checkResult}
                                    </section>
                                </div>
                            </div>
                        </article>
                    </div>
                </WidgetGrid>
            </div >
        )
    }
}

function mapStateToProps(state) {
    const {dataSourcesReducer} = state;

    return {
        ...state,
        list: dataSourcesReducer && dataSourcesReducer.list
    };
}

export default connect(mapStateToProps)(DataSources);