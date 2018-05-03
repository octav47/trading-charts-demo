import React from 'react'

import UiTabs from '../../../components/ui/UiTabs'

import {
    DancerPic,
    DancerAchievements,
    DancerPoints,
    DancerProgress,
    DancerStory,
    DancerClub,
} from '../../../components/dancers'
import ShareButton from '../../../components/utils/ShareButton'

import FontAwesome from 'react-fontawesome'

import { fetchGetDancerData } from '../actions'

import { connect } from 'react-redux'

import '../../../components/dancers/styles/SingleDancer.sass'

class SingleDancer extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            id: null,
        }
    }

    componentWillMount () {
        const { dispatch } = this.props

        const id = this.props.params.id

        // dispatch(fetchConfig());
        id && dispatch(fetchGetDancerData(id))

        document.title = `${id} | Radio Hustle App`
    }

    render () {
        const { config, dancerData } = this.props.dancers

        let dancerContainer = ''

        if (config !== 'fetching' && config !== 'failed' && dancerData !== 'fetching' && dancerData !== 'failed') {

            let dancerLink =
                <DancerPic/>

            if (config.pics.indexOf(dancerData.code) > -1) {
                dancerLink =
                    <DancerPic dancerID={dancerData.code} url={config.links[dancerData.code]}/>
            }

            const pointsClassic = {
                A: dancerData.a,
                B: dancerData.b,
                C: dancerData.c,
                D: dancerData.d,
                E: dancerData.e,
            }

            const pointsJnJ = {
                Ch: dancerData.ch,
                S: dancerData.s,
                M: dancerData.m,
                RS: dancerData.rs,
                Beg: dancerData.bg,
            }

            const storyClassic = []
            const storyJnJ = []
            const storyOther = []

            dancerData.results.forEach(e => {
                if (e.nomination === 'classic') {
                    storyClassic.push(e)
                } else if (e.nomination === 'dnd') {
                    storyJnJ.push(e)
                } else {
                    storyOther.push(e)
                }
            })

            dancerContainer =
                <div id="information-container" className="row">
                    <section className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <UiTabs id="tabs" className="dancer-tabs">
                            <ul>
                                <li><a href="#tab-main">Инфо</a></li>
                                <li><a href="#tab-classic">Классика</a></li>
                                <li><a href="#tab-dnd">ДнД</a></li>
                                <li><a href="#tab-other">Нерейтинг</a></li>
                            </ul>
                            <div id="tab-main">
                                <div className="row">
                                    <section className="col col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                        {/*<DancerAchievements dancerClass={dancerData['class']}/>*/}
                                        {dancerLink}
                                    </section>
                                    <section className="col col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                        <div className="row">
                                            <section
                                                className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label className="label">ФИО</label>
                                                <label className="input">
                                                    <input
                                                        id="dancer-name"
                                                        type="text"
                                                        value={dancerData.name}
                                                        disabled="disabled"/>
                                                </label>
                                            </section>
                                        </div>
                                        <div className="row">
                                            <section
                                                className="col col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                                <label className="label">Номер</label>
                                                <label className="input">
                                                    <input
                                                        id="dancer-id"
                                                        type="text"
                                                        value={dancerData.code}
                                                        disabled="disabled"
                                                        style={{
                                                            color: '#404040',
                                                        }}/>
                                                </label>
                                            </section>
                                            <section
                                                className="col col-lg-3 col-md-3 col-sm-6 col-xs-6">
                                                <label className="label">Класс</label>
                                                <label className="input">
                                                    <input
                                                        id="dancer-className"
                                                        type="text"
                                                        value={dancerData.level_classic + ' / ' + dancerData.level_dnd}
                                                        disabled="disabled"
                                                        style={{
                                                            color: '#404040',
                                                        }}/>
                                                </label>
                                            </section>
                                            <section
                                                className="col col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                                <label className="label">Клуб(ы)</label>
                                                <DancerClub data={dancerData.club} config={config.clubs}/>
                                            </section>
                                        </div>
                                    </section>
                                </div>
                                <div className="row">
                                    <section className="col-lg-1 col-md-1 col-sm-2 col-xs-3" style={{
                                        padding: '0 15px',
                                    }}>
                                        <DancerPoints points={pointsClassic}/>
                                    </section>
                                    <section className="col-lg-1 col-md-1 col-sm-2 col-xs-3" style={{
                                        padding: '0 15px',
                                    }}>
                                        <DancerPoints points={pointsJnJ}/>
                                    </section>
                                </div>
                            </div>
                            <div id="tab-classic" className="no-padding">
                                <DancerProgress
                                    data={{
                                        level: dancerData.level_classic,
                                        points: pointsClassic,
                                    }}
                                    type="classic"/>
                                <DancerStory
                                    type="classic"
                                    story={storyClassic}/>
                            </div>
                            <div id="tab-dnd" className="no-padding">
                                <DancerProgress
                                    data={{
                                        level: dancerData.level_dnd,
                                        points: pointsJnJ,
                                    }}
                                    type="jnj"/>
                                <DancerStory
                                    type="jnj"
                                    story={storyJnJ}/>
                            </div>
                            <div id="tab-other" className="padding-5">
                                <DancerStory
                                    type="other"
                                    story={storyOther}
                                    showUnofficial={true}/>
                            </div>
                        </UiTabs>
                        <div className="row" style={{
                            marginTop: '15px',
                            paddingLeft: '15px',
                        }}>
                            <ShareButton type="vk" label={true} options={{
                                purl: 'http://app.radio-hustle.com/#/dancers/' + dancerData.code,
                                ptitle: `${dancerData.name}, история выступлений на #RadioHustle`,
                                pimg: 'http://radio-hustle.com/dancers_old/pics/' + dancerData.code + '.jpg',
                            }}/>
                            <ShareButton type="ok" label={true} options={{
                                purl: 'http://app.radio-hustle.com/#/dancers/' + dancerData.code,
                                text: `${dancerData.name}, история выступлений на #RadioHustle`,
                            }}/>
                            <ShareButton type="facebook" label={true} options={{
                                purl: 'http://app.radio-hustle.com/#/dancers/' + dancerData.code,
                                ptitle: dancerData.name,
                                pimg: 'http://radio-hustle.com/dancers_old/pics/' + dancerData.code + '.jpg',
                                text: `${dancerData.name}, история выступлений на #RadioHustle`,
                            }}/>
                            <ShareButton type="twitter" label={true} options={{
                                purl: 'http://app.radio-hustle.com/#/dancers/' + dancerData.code,
                                ptitle: `${dancerData.name}, история выступлений на #RadioHustle`,
                            }}/>
                        </div>
                    </section>
                </div>
        } else {
            dancerContainer = <div>
                <i className="fa fa-5x fa-spin fa-cog"/>
            </div>
        }

        return (
            dancerContainer
        )
    }
}

function mapStateToProps (state) {
    const { dancersReducer } = state

    return {
        ...state,
        config: dancersReducer && dancersReducer.config,
        data: dancersReducer && dancersReducer.data,
        dancerData: dancersReducer && dancersReducer.dancerData,
    }
}

export default connect(mapStateToProps)(SingleDancer)
