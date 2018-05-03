import React from 'react'
import { Link } from 'react-router'
import { WidgetGrid, JarvisWidget } from '../../../components'
import UiAutocomplete from '../../../components/ui/UiAutocomplete'
import { DancerConfig } from '../../../components/dancers'
import FontAwesome from 'react-fontawesome'
import { fetchGetDancerData, fetchFollowedDancer } from '../actions'
import { connect } from 'react-redux'

import Listeners from '../../../utils/Listeners'

class Dancers extends React.Component {
    constructor(props) {
        super(props)

        let followedDancer = JSON.parse(localStorage['rh-app'])['followedDancer']

        this.state = {
            page: 'init',
            followedDancer: followedDancer
        }
    }

    componentWillMount() {
        const { dispatch } = this.props;

        //dispatch(fetchGetData())

        if (this.props.params.id) {
            dispatch(fetchGetDancerData(this.props.params.id))
        }

        document.title = 'База танцоров | Radio Hustle App'
    }

    onSelect(e, ui) {
        const { dispatch } = this.props;
        const label = ui.item.label;
        const id = label.split(' ')[0];

        e.target.value = label;

        dispatch(fetchGetDancerData(id));

        this.setState({
            page: 'dancerData'
        })

        return false;
    }

    followHandler(type, id) {
        if (type === 'follow') {
            this.onFollowDancer(id)

            Listeners.successAction({
                title: 'Добавлено!',
                icon: 'save',
                message: 'Информация по танцору сохранена&nbsp;на&nbsp;главной',
                timeout: 4000,
            })
        } else {
            this.onUnfollowDancer()
        }
    }

    onFollowDancer(id) {
        const { dispatch } = this.props

        let rhAppData = JSON.parse(localStorage['rh-app'])
        rhAppData['followedDancer'] = id
        localStorage['rh-app'] = JSON.stringify(rhAppData)

        this.setState({
            followedDancer: id
        })

        dispatch(fetchFollowedDancer(id))
    }

    onUnfollowDancer() {
        const { dispatch } = this.props

        let rhAppData = JSON.parse(localStorage['rh-app'])
        rhAppData['followedDancer'] = null
        localStorage['rh-app'] = JSON.stringify(rhAppData)

        this.setState({
            followedDancer: null
        })

        dispatch({
            type: 'UNFOLLOW_DANCER'
        })
    }

    render() {
        const { page, followedDancer } = this.state
        const { config, data, dancerData } = this.props.dancers;

        // console.log('followedDancer', followedDancer)

        // =====

        let configSection =
            <DancerConfig/>
        if (config) {
            if (config !== 'fetching') {
                if (config === 'failed') {
                    configSection =
                        <div className="alert alert-danger fade in">
                            Ошибка загрузки информации о последних турнирах
                        </div>
                } else {
                    configSection =
                        <DancerConfig date={config.lastCompetition.date} contests={config.lastCompetition.contests}/>
                }
            }
        }

        // =====

        let autocomplete = <FontAwesome name="cog" spin size="2x"/>
        if (data) {
            if (data === 'fetching') {

            } else if (data === 'failed') {
                autocomplete =
                    <div className="alert alert-danger fade in">
                        Ошибка загрузки списка танцоров
                    </div>
            } else {
                autocomplete =
                    <UiAutocomplete
                        id="search-dancer"
                        className="form-control"
                        placeholder="Введите ФИО или номер танцора"
                        minLength={3}
                        maxItemsToShow={5}
                        source={data}
                        onSelect={this.onSelect.bind(this)}
                        renderItem={function (ul, item) {
                            const id = item.label.split(' ')[0]
                            const link = item.link || `#/dancers/${id}`

                            return $(`<li><a href="${link}">${item.label}</a></li>`)
                                .appendTo(ul)
                        }} />
            }
        }

        // =====

        let title = <h2>База танцоров</h2>
        let container = '';

        if (!this.props.params.id) {
            container =
                <div className="widget-body smart-form">
                    <div className="row">
                        <section className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {configSection}
                        </section>
                    </div>
                    <div className="row">
                        <section className="col col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <label className="input">
                                {autocomplete}
                            </label>
                        </section>
                    </div>
                </div>
        } else {
            if (dancerData) {
                let followBtn = (followedDancer !== dancerData.code) ? (
                        <button className="btn btn-success margin-bottom-10 pull-right" type="button"
                                onClick={this.followHandler.bind(this, 'follow', dancerData.code)}>
                            Добавить в <i className="fa fa-fw fa-lg fa-dashboard" />
                        </button>
                    ) : (
                        <button className="btn btn-warning margin-bottom-10 pull-right" type="button"
                                onClick={this.followHandler.bind(this)}>
                            Убрать из <i className="fa fa-fw fa-lg fa-dashboard" />
                        </button>
                    )
                container =
                    <div className="widget-body smart-form">
                        <Link className="btn btn-default margin-bottom-10" to={'/dancers'} key={'dancers'}
                              activeClassName="active">
                            <i className="fa fa-chevron-left"/> База танцоров
                        </Link>
                        {followBtn}
                        {this.props.children}
                    </div>
            } else {
                container =
                    <div className="widget-body smart-form">
                        <div className="row">
                            <section className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                {configSection}
                            </section>
                        </div>
                        <div className="row">
                            <section className="col col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <label className="input">
                                    {autocomplete}
                                </label>
                            </section>
                        </div>
                    </div>
            }
        }

        return (
            <div id="content">
                <WidgetGrid>
                    <div className="row">
                        <article className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <JarvisWidget editbutton={false} color="purple">
                                <header>
                                    <span className="widget-icon"> <i className="fa fa-table"/> </span>
                                    {title}
                                </header>
                                <div>
                                    {container}
                                </div>
                            </JarvisWidget>
                        </article>
                    </div>
                </WidgetGrid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { dancersReducer } = state;

    return {
        ...state,
        config: dancersReducer && dancersReducer.config,
        data: dancersReducer && dancersReducer.data,
        dancerData: dancersReducer && dancersReducer.dancerData
    };
}

export default connect(mapStateToProps)(Dancers);
