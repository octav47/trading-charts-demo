import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { WidgetGrid } from '../../../components'
import JarvisWidget from '../../../components/widgets/JarvisWidget'
import { BoardItem } from '../../../components/board'
import { DancerPic, DancerPoints } from '../../../components/dancers'
import { getProgress } from '../../../utils/dancerUtils'

class Board extends Component {
    componentWillMount() {
        document.title = 'Главная | Radio Hustle App'
    }

    onUnfollowDancer() {
        const { dispatch } = this.props

        const rhAppData = JSON.parse(localStorage['rh-app'])

        rhAppData.followedDancer = null
        localStorage['rh-app'] = JSON.stringify(rhAppData)

        this.setState({
            followedDancer: null,
        })

        dispatch({
            type: 'UNFOLLOW_DANCER',
        })
    }

    render() {
        const { followedDancerData, config } = this.props.dancers

        let followedDancer = null

        if (config !== 'fetching' &&
            config !== 'failed' &&
            followedDancerData &&
            followedDancerData !== 'fetching' &&
            followedDancerData !== 'failed') {
            let dancerLink =
                (<DancerPic target="board">
                    <span className="dancer-id">
                        #{followedDancerData.code}
                    </span>
                    <span className="dancer-class">
                        {`${followedDancerData.level_classic} / ${followedDancerData.level_dnd}`}
                    </span>
                </DancerPic>)

            if (config.pics.indexOf(followedDancerData.code) > -1) {
                dancerLink =
                    (<DancerPic
                        dancerID={followedDancerData.code}
                        url={config.links[followedDancerData.code]}
                        target="board">
                        <span className="dancer-id">
                            #{followedDancerData.code}
                        </span>
                        <span className="dancer-class">
                            {`${followedDancerData.level_classic} / ${followedDancerData.level_dnd}`}
                        </span>
                    </DancerPic>)
            }

            const pointsClassic = {
                A: followedDancerData.a,
                B: followedDancerData.b,
                C: followedDancerData.c,
                D: followedDancerData.d,
                E: followedDancerData.e,
            }

            const pointsJnJ = {
                Ch: followedDancerData.ch,
                S: followedDancerData.s,
                M: followedDancerData.m,
                RS: followedDancerData.rs,
                Beg: followedDancerData.bg,
            }

            const classicProgress = getProgress('classic', {
                level: followedDancerData.level_classic,
                points: pointsClassic,
            }, 0)
            const jnjProgress = getProgress('jnj', {
                level: followedDancerData.level_dnd,
                points: pointsJnJ,
            }, 0)

            followedDancer = (
                <JarvisWidget
                    togglebutton={false}
                    editbutton={false}
                    fullscreenbutton={false}
                    colorbutton={false}
                    deletebutton={false}>

                    <header>
                        <span className="widget-icon">
                            <i className="glyphicon glyphicon-stats txt-color-darken" /> </span>

                        <h2>{followedDancerData.name}</h2>

                        <ul
                            className="nav nav-tabs pull-right in"
                            id="myTab">
                            <li>
                                <a
                                    data-toggle="tab"
                                    href="javascript:void(0)"><i className="fa fa-info" /> <span
                                        className="hidden-mobile hidden-tablet">Инфо</span></a>
                            </li>
                        </ul>

                    </header>

                    <div className="no-padding">

                        <div className="widget-body">
                            <div>
                                <div className="row no-space">
                                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                        {dancerLink}
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                        <section className="col col-lg-6 col-md-6 col-sm-3 col-xs-6">
                                            <DancerPoints points={pointsClassic} />
                                        </section>
                                        <section className="col col-lg-6 col-md-6 col-sm-3 col-xs-6">
                                            <DancerPoints points={pointsJnJ} />
                                        </section>
                                    </div>
                                    <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 show-stats">
                                        <div>
                                            <div className="col-xs-6 col-sm-6 col-md-12 col-lg-12">
                                                <span className="text"> Классика, {classicProgress}% </span>
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar bg-color-redLight"
                                                        style={{ width: `${classicProgress}%` }} />
                                                </div>
                                            </div>
                                            <div className="col-xs-6 col-sm-6 col-md-12 col-lg-12">
                                                <span className="text"> ДнД, {jnjProgress}% </span>
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar bg-color-blue"
                                                        style={{ width: `${jnjProgress}%` }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <section
                                                className="col-xs-6 col-sm-6 col-md-12 col-lg-12"
                                                style={{
                                                    marginBottom: '8px',
                                                }}>
                                                <button
                                                    className="btn btn-warning btn-block"
                                                    onClick={this.onUnfollowDancer.bind(this)}>
                                                    Убрать из <i className="fa fa-fw fa-lg fa-dashboard" />
                                                </button>
                                            </section>
                                            <section className="col-xs-6 col-sm-6 col-md-12 col-lg-12">
                                                <Link
                                                    className="btn btn-info btn-block"
                                                    to={`/dancers/${followedDancerData.code}`}
                                                    key={`dancer${followedDancerData.code}`}
                                                    activeClassName="active">
                                                    Подробнее
                                                </Link>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </JarvisWidget>
            )
        }

        return (
            <div id="content">
                <WidgetGrid>
                    <div className="well">
                        Привет! Рады видеть тебя на новом Radio Hustle!
                        <br />
                        <br />
                        В данный момент разработка идёт полным ходом, и, если тебе интересно узнать
                        какие-то подробности о процессе разработки и/или присоединиться к нему,
                        то добро пожаловать в <a
                            href="https://vk.com/devradiohustle"
                            target="_blank">группу разработчиков <i className="fa fa-vk" /></a>.
                        <br />
                        <br />
                        Для того, чтобы перейти на основной сайт Radio Hustle, нажми <a
                            href="http://radio-hustle.com"
                            target="_blank">сюда</a>.
                    </div>
                    {followedDancer}
                    <div className="row">
                        <BoardItem
                            title="База танцоров"
                            url="dancers"
                            icon="database" />
                        <BoardItem
                            title="Плеер"
                            url="player"
                            icon="music" />
                        <BoardItem
                            title="Календарь"
                            url="calendar"
                            icon="calendar" />
                        <BoardItem
                            title="Днд Сампо"
                            url="jnj-training"
                            icon="recycle" />
                        <BoardItem
                            title="Блог"
                            url="blog"
                            icon="rss" />
                        <BoardItem
                            title="Сравнение танцоров"
                            url="services/compare"
                            icon="users"
                            disabled={true} />
                        <BoardItem
                            title="Калькулятор очков"
                            url="services/points"
                            icon="calculator"
                            disabled={true} />
                        <BoardItem
                            title="Discofox Analytics"
                            url="discofoxan"
                            icon="line-chart"
                            disabled={true} />
                        <BoardItem
                            title="Статистика"
                            url="services/stats"
                            icon="bar-chart"
                            disabled={true} />
                        <BoardItem
                            title="Прямой эфир"
                            url="http://hustlefm.ru"
                            icon="volume-up"
                            external={true} />
                        <BoardItem
                            title="Контакты"
                            url="about"
                            icon="comments"
                            disabled={true} />
                        <BoardItem
                            title="Помощь проекту"
                            url="donate"
                            icon="wrench"
                            disabled={true} />
                    </div>
                </WidgetGrid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { dancersReducer } = state

    return {
        ...state,
        config: dancersReducer && dancersReducer.config,
        followedDancerData: dancersReducer && dancersReducer.followedDancerData,
    }
}

export default connect(mapStateToProps)(Board)
