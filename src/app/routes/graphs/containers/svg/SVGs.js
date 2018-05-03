import React from 'react'

import SVG from '../../../../components/graphs/svg/SVG'

import request from 'then-request'

import {Stats, BigBreadcrumbs, WidgetGrid, JarvisWidget}  from '../../../../components'

import {fetchSVGList, fetchSaveSVG} from '../../../../components/graphs/svg/actions';

import {connect} from 'react-redux';

class SVGs extends React.Component {

    state = {
        isEditButtonsVisible: []
    };

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentDidUpdate() {
        console.log('componentDidUpdate', 'window._editing', window._editing);

        console.log('window._editingIndex', window._editingIndex);

        if (window._editingIndex) {
            for (let index of window._editingIndex) {
                window.initEditor(index);
            }
        }
    }

    handleLoadSVGListClick() {
        const {dispatch} = this.props;

        dispatch(fetchSVGList());
    }

    handleEditClick(index) {
        let {isEditButtonsVisible} = this.state;

        isEditButtonsVisible[index] = true;

        this.setState({
            isEditButtonsVisible: isEditButtonsVisible
        });
    }

    handleSaveClick(index, entity) {
        const {dispatch} = this.props;

        let {isEditButtonsVisible} = this.state;

        isEditButtonsVisible[index] = false;

        this.setState({
            isEditButtonsVisible: isEditButtonsVisible
        });

        dispatch(fetchSaveSVG(index, entity));
    }

    render() {
        const {list} = this.props.svg;
        let {isEditButtonsVisible} = this.state;

        let widgetGrid = '';

        console.log(list);

        if (list == 'fetching') {
            widgetGrid = <div>Loading...</div>;
        } else if (list == 'failed') {
            widgetGrid =
                <div className="alert alert-danger fade in">
                    <i className="fa-fw fa fa-times"/>
                    <strong>Error!</strong> Can't get <b>svg list</b>, <i>net::ERR_CONNECTION_REFUSED</i>
                </div>;
        } else if (Array.isArray(list) && list.length > 0) {
            let editorButtons = [];

            window._editing = false;
            for (let i = 0; i < list.length; i++) {
                window._editing = window._editing || isEditButtonsVisible[i];
                if (isEditButtonsVisible[i]) {

                    if (!window._editingIndex) {
                        window._editingIndex = new Set();
                    }
                    window._editingIndex.add(i);

                    editorButtons.push(
                        <div className="well smart-form" data-id={'svg_container_' + i}>
                            <div className="row">
                                <label className="input">
                                    <input className="text-editor" type="text" placeholder="text"/>
                                </label>
                            </div>
                            <div className="row">
                                <button className="btn btn-success btn-sm"
                                        onClick={this.handleSaveClick.bind(this, i, list[i])}>
                                    Save
                                </button>
                            </div>
                        </div>
                    );
                } else {
                    window._editingIndex && window._editingIndex.delete(i);
                    editorButtons.push(
                        <div key={i} className="well smart-form">
                            <div key={i} className="row">
                                <button key={i} className="btn btn-primary btn-sm"
                                        onClick={this.handleEditClick.bind(this, i)}>
                                    Edit
                                </button>
                            </div>
                        </div>
                    );
                }
            }

            widgetGrid =
                <WidgetGrid>
                    {list.map((e, i) => {
                        return (
                            <div className="row">
                                <article className="col-sm-8 col-md-8 col-lg-8">
                                    <JarvisWidget dr>
                                        <header>
                                            <span className="widget-icon"> <i className="fa fa-bar-chart-o"/> </span>
                                            <h2>SVG</h2>
                                        </header>
                                        <div>
                                            <div className="widget-body no-padding">
                                                <SVG id={'svg_container_' + i} data={e.data}/>
                                            </div>
                                        </div>
                                    </JarvisWidget>
                                </article>
                                <article className="col-sm-4 col-md-4 col-lg-4">
                                    {editorButtons[i]}
                                </article>
                            </div>
                        )
                    })}
                </WidgetGrid>;
        }

        return (
            <div id="content">
                <div className="row">
                    <article className="col-sm-12 col-md-12 col-lg-12">
                        <button className="btn btn-primary" onClick={this.handleLoadSVGListClick.bind(this)}>Get SVGs
                        </button>
                    </article>
                </div>
                {widgetGrid}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {svgReducer} = state;

    return {
        ...state,
        list: svgReducer && svgReducer.list
    };
}

export default connect(mapStateToProps)(SVGs);