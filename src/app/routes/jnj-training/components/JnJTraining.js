import React from 'react'
import { Link } from 'react-router'
import { WidgetGrid, JarvisWidget } from '../../../components'
import { connect } from 'react-redux'
import IonSlider from '../../../components/forms/inputs/IonSlider'
import TrackItem from '../../../components/player/TrackItem'
import Audio from '../../../components/player/Audio'

// import './Player.css'

// import Audio from 'react-audioplayer'

function shuffle(a) {
    for (let i = a.length; i; i--) {
        const j = Math.floor(Math.random() * i);

        [a[i - 1], a[j]] = [a[j], a[i - 1]]
    }

    return a
}

function getSliderColor(index) {
    const colors = ['red', 'green', 'blue', 'yellow', 'pink']

    return colors[index]
}

class JnJTraining extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            page: 'init',

            sliderID: 0,
            sliders: {},
            slidersCount: 0,

            slider: {
                min: 65,
                max: 140,
                value: [95, 110],
            },
            tracks: {
                total: [],
                inRange: [],
                activeTrack: {},
            },
        }
    }

    componentWillMount() {
        const { dispatch } = this.props

        // dispatch(fetchTrackList())

        document.title = 'ДнД Сампо | Radio Hustle App'
    }

    sliderOnChange(e) {
        const { sliders } = this.state

        const id = e.input[0].dataset.id

        // console.log(e)
        // console.log(id, e.from, e.to)

        const slider = sliders[id]

        if (slider) {
            slider.value = [e.from, e.to]
            sliders[slider.id] = slider

            this.setState({
                sliders,
            })
        } else {
            throw 'slider is null!'
        }
    }

    addTrackSection() {
        let { sliderID, sliders, slidersCount } = this.state

        sliderID++
        slidersCount++
        const sliderIDString = `slider_${sliderID}`

        const color = getSliderColor(slidersCount - 1)

        sliders[sliderIDString] = {
            id: sliderIDString,
            min: 65,
            max: 140,
            value: [95, 110],
            color,
        }

        this.setState({
            sliderID,
            sliders,
            slidersCount,
        })
    }

    removeTrackSection(id) {
        let { sliders, slidersCount } = this.state

        // delete sliders[id]
        sliders[id].deleted = true
        slidersCount--

        this.setState({
            sliders,
            slidersCount,
        })
    }

    startTraining() {
        const { sliders } = this.state
        const { tracklist } = this.props.player

        if (tracklist && Array.isArray(tracklist)) {
            const sections = []

            Object.keys(sliders).map((key) => {
                const e = sliders[key]

                if (!e.deleted) {
                    sections.push(e.value)
                }
            })

            let result = []

            for (const track of tracklist) {
                // if (+track.bpm >= 92 && +track.bpm <= 128) {
                result.push({
                    name: track.name,
                    src: `http://new.radio-hustle.com/${track.name}`,
                    bpm: track.bpm,
                })
                // }
            }

            if (false) {
                result = shuffle(result)
            } else {
                const tracksInSections = []

                for (let i = 0; i < sections.length; i++) {
                    tracksInSections.push([])
                }
                for (const track of result) {
                    const bpm = +track.bpm

                    for (let i = 0; i < sections.length; i++) {
                        const section = sections[i]

                        if (bpm >= section[0] && bpm <= section[1]) {
                            tracksInSections[i].push(track)
                        }
                    }
                }

                let length = Number.MAX_VALUE

                for (let i = 0; i < tracksInSections.length; i++) {
                    if (tracksInSections[i].length < length) {
                        length = tracksInSections[i].length
                    }
                }
                // console.log('length', length)

                result = []
                for (let i = 0; i < length; i++) {
                    for (let j = 0; j < tracksInSections.length; j++) {
                        result.push(tracksInSections[j][i])
                    }
                }
            }

            const { tracks } = this.state

            tracks.inRange = result
            this.setState({
                page: 'playlist',
                tracks: shuffle(tracks),
            })

            this.setActiveTrack(0, result[0])
        }
    }

    setActiveTrack(index, track) {
        const { tracks } = this.state

        tracks.activeTrack = {
            index,
            name: track.name
                .replace(/_/gim, ' ')
                .replace('audio/', '')
                .replace(/\d{2}y\d{2}w\dd\//g, '')
                .replace('.mp3', '')
                .replace(/\b./g, (m) => {
                    return m.toUpperCase()
                }),
            src: `http://new.radio-hustle.com/${track.name}`,
        }

        this.setState({
            tracks,
        })

        const trackPlayer = document.getElementById('track-player')

        trackPlayer && trackPlayer.load()
    }

    audioPlaying() {

    }

    audioEnded() {
        const { tracks } = this.state

        let index = tracks.activeTrack.index

        index++

        if (index === tracks.inRange.length) {
            index = 0
        }

        const track = tracks.inRange[index]

        this.setActiveTrack(index, track)
    }

    btnBackClick() {
        this.setState({
            page: 'init',
        })
    }

    render() {
        return (
            <div id="content">
                <WidgetGrid>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="text-center error-box">
                                        <h1 className="animated font-400 tada txt-color-purple">
                                            <i className="fa fa-spin fa-cog" />
                                        </h1>
                                        <br />
                                        <p className="lead semi-bold">
                                            <strong>Мы перерабатываем этот раздел</strong><br /><br />
                                            <small>
                                                Функционал ДнД Сампо будет полностью переработал и объединён
                                                с <Link to="player">плеером</Link>. Следите за обновлениями в <a
                                                    href="https://vk.com/devradiohustle"
                                                    target="_blank">
                                                нашей группе разработчиков <i className="fa fa-vk" />
                                                </a>.
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </WidgetGrid>
            </div >
        )

        const { sliders, slidersCount, tracks, page } = this.state

        // console.log('sliders', sliders)

        const { tracklist } = this.props.player

        const activeTrack = tracks && tracks.activeTrack || {}
        const tracksInRange = tracks && tracks.inRange

        let widgetBody = ''

        const _tracks = []
        let trackIndex = 0
        const colors = [
            'rgba(255, 130, 130, 0.25)',
            'rgba(110, 193, 110, 0.25)',
            'rgba(146, 146, 255, 0.25)',
            'rgba(234, 234, 143, 0.25)',
            'rgba(239, 198, 205, 0.25)',
        ]
        let colorsIndex = 0

        for (const track of tracksInRange) {
            if (colorsIndex > 4) {
                colorsIndex = 0
            }
            _tracks.push(<TrackItem
                trackIndex={trackIndex}
                activeTrack={activeTrack}
                track={track}
                color={colors[colorsIndex]}
                click={this.setActiveTrack.bind(this, trackIndex, track)} />)
            trackIndex++
            colorsIndex++
        }

        const header =
            (<header>
                <h2>ДнД Сампо</h2>
            </header>)
        let audioTag = ''

        if (page === 'init') {
            if (tracklist) {
                if (tracklist == 'fetching') {
                    widgetBody =
                        (<div
                            className="text-align-center"
                            style={{
                                opacity: 0.5,
                            }}>
                            <i className="fa fa-5x fa-spin fa-cog" />
                        </div>)
                } else if (tracklist == 'failed') {
                    widgetBody = 'tracklist failed'
                } else {
                    const addSectionBtn = (slidersCount < 5) ? (
                        <div
                            className="row"
                            style={{
                                marginBottom: '15px',
                            }}>
                            <section
                                className="col col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4 col-sm-12 col-xs-12">
                                <button
                                    className="btn btn-info btn-block"
                                    onClick={this.addTrackSection.bind(this)}>Добавить секцию
                                </button>
                            </section>
                        </div>
                    ) : (
                        <div className="row">
                            <section
                                className="col col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4 col-sm-12 col-xs-12">
                                <button className="btn btn-info btn-block disabled">
                                        Добавить секцию
                                </button>
                            </section>
                        </div>
                    )

                    const startTrainingBtn = (slidersCount > 0) ? (
                        <div className="row">
                            <section
                                className="col col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4 col-sm-12 col-xs-12">
                                <button
                                    className="btn btn-success btn-block"
                                    onClick={this.startTraining.bind(this)}>
                                        Начать сампо
                                </button>
                            </section>
                        </div>
                    ) : (
                        <div className="row">
                            <section
                                className="col col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4 col-sm-12 col-xs-12">
                                <button className="btn btn-success btn-block disabled">
                                        Начать сампо
                                </button>
                            </section>
                        </div>
                    )

                    widgetBody = (
                        <div>
                            {Object.keys(sliders).map((id, i) => {
                                const e = sliders[id]
                                // console.log('e.value', e.value)

                                if (!e.deleted) {
                                    return (
                                        <div
                                            id={e.id}
                                            className={`row slider-color-${e.color}`}
                                            key={i}>
                                            <section
                                                className="col col-lg-11 col-md-11 col-sm-10 col-xs-10">
                                                <IonSlider
                                                    data-id={e.id}
                                                    type="text"
                                                    data-min={e.min}
                                                    data-max={e.max}
                                                    data-from={e.value[0]}
                                                    data-to={e.value[1]}
                                                    data-type="double"
                                                    data-step="1"
                                                    data-postfix=" bpm"
                                                    data-prettify="false"
                                                    data-hasgrid="true"
                                                    sliderChange={this.sliderOnChange.bind(this)} />
                                            </section>
                                            <section
                                                className="col col-lg-1 col-md-1 col-sm-1 col-xs-1">
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={this.removeTrackSection.bind(this, e.id)}>
                                                    <i className="fa fa-times" />
                                                </button>
                                            </section>
                                        </div>
                                    )
                                }

                                return null
                            })}
                            {addSectionBtn}
                            {startTrainingBtn}
                        </div>
                    )
                }
            }
        } else if (page === 'playlist') {
            let activeTrackName = ''

            if (activeTrack.name) {
                activeTrackName =
                    (<div
                        className="alert alert-info fade in"
                        style={{
                            width: '100%',
                            maxWidth: '600px',
                            margin: 'auto',
                        }}>
                        {activeTrack.name}
                    </div>)
                audioTag =
                    (<Audio
                        src={activeTrack.src}
                        ended={this.audioEnded.bind(this)}
                        playing={this.audioPlaying.bind(this)} />)
            }

            widgetBody = (
                <div>
                    <div className="row">
                        <section className="col col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4 col-sm-12 col-xs-12">
                            <button
                                className="btn btn-default btn-block margin-bottom-10"
                                onClick={this.btnBackClick.bind(this)}>
                                Назад
                            </button>
                        </section>
                    </div>
                    <div className="row">
                        <section className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {activeTrackName}
                        </section>
                    </div>
                    <div className="row">
                        <section
                            className="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {audioTag}
                            <div
                                className="dd"
                                style={{
                                    maxWidth: '100%',
                                }}>
                                <ol
                                    className="dd-list"
                                    style={{
                                        maxWidth: '600px',
                                        margin: '0 auto',
                                    }}>
                                    {_tracks}
                                </ol>
                            </div>
                        </section>
                    </div>
                </div>
            )
        }

        return (
            <div id="content">
                <WidgetGrid>
                    <div className="row">
                        <article className="col-sm-12 col-md-12 col-lg-12">
                            <JarvisWidget
                                name="player-jarvis-widget"
                                editbutton={false}
                                color="purple">
                                {header}
                                <div className="widget-body">
                                    {widgetBody}
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
    const { playerReducer } = state

    return {
        ...state,
        tracklist: playerReducer && playerReducer.tracklist,
    }
}

export default connect(mapStateToProps)(JnJTraining)
