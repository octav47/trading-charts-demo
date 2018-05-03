import React from 'react'
import { JarvisWidget, WidgetGrid } from '../../../components'
import IonSlider from '../../../components/forms/inputs/IonSlider'
import { Dropdown, MenuItem } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import TrackItem from '../../../components/player/TrackItem'
import Audio from '../../../components/player/Audio'

import ShareButton from '../../../components/utils/ShareButton'

import './Player.css'

function shuffle (a) {
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

class Player extends React.Component {
    constructor (props) {
        super(props)

        const settings = localStorage.rhAppSettings ? JSON.parse(localStorage.rhAppSettings) : {
            accelerometer: true,
        }

        this.state = {
            page: 'init',

            slider: {
                min: 65,
                max: 140,
                value: [95, 110],
            },
            tracks: {
                total: [],
                inRange: [],
                activeTrack: {},
                randomize: false,
                type: 0, // 0 -- all tracks, 1 -- classic, 2 -- jnj, 3 -- Beg
            },
            settings,
            showShareBlock: false,
            showSettingsBlock: false,
        }
    }

    encrypt = (randomize, type, from, to) => {
        const number = 100000000 + (randomize ? 1 : 0) * 10000000 + type * 1000000 + from * 1000 + to

        return number.toString(16)
    }

    decrypt = (hex) => {
        const number = parseInt(hex, 16)
        const numberString = `${number}`

        const randomize = +numberString.substring(1, 2)
        const type = +numberString.substring(2, 3)
        const from = +numberString.substring(3, 6)
        const to = +numberString.substring(6)

        return { randomize, type, from, to }
    }

    componentWillMount () {
        document.title = 'Плеер | Radio Hustle App'
    }

    componentDidMount () {
        const { params } = this.props

        if (params) {
            const { hexEncode } = params

            if (hexEncode) {
                const { randomize, type, from, to } = this.decrypt(hexEncode)
                const { slider, tracks } = this.state

                this.setState({
                    page: 'playlist',
                    slider: {
                        ...slider,
                        value: [+from, +to],
                    },
                    tracks: {
                        ...tracks,
                        randomize: +randomize,
                        type: +type,
                    },
                })

                this.waitForTracklist(() => {
                    this.getTracksInRange(false)
                })
            }
        }
    }

    waitForTracklist = (callback) => {
        const { tracklist } = this.props.player

        if (tracklist === 'fetching') {
            setTimeout(() => {
                this.waitForTracklist(callback)
            }, 250)
        } else {
            callback()
        }
    }

    sliderOnChange (e) {
        const { slider } = this.state

        if (slider) {
            slider.value = [e.from, e.to]

            this.setState({
                slider,
            })
        } else {
            throw 'slider is null!'
        }
    }

    getTracksInRange (isShuffled) {
        const { slider, tracks } = this.state
        const { tracklist } = this.props.player

        if (tracklist && Array.isArray(tracklist)) {
            let result = []

            for (const track of tracklist) {
                let currentTrackType = false

                if (tracks.type === 0) {
                    currentTrackType = true
                } else if (tracks.type === 1 && track.classic) {
                    currentTrackType = true
                } else if (tracks.type === 2 && track.jnj) {
                    currentTrackType = true
                } else if (tracks.type === 3 && track.beg) {
                    currentTrackType = true
                }

                if (currentTrackType && track.bpm >= slider.value[0] && track.bpm <= slider.value[1]) {
                    result.push({
                        name: track.name,
                        src: `http://new.radio-hustle.com/${track.src}`,
                        bpm: track.bpm,
                    })
                }
            }

            if (isShuffled) {
                result = shuffle(result)
            } else {
                result = result.sort((a, b) => a.bpm - b.bpm)
            }

            tracks.inRange = result
            this.setState({
                page: 'playlist',
                tracks,
            })

            $('.irs').remove()

            this.setActiveTrack(0, result[0])
        }
    }

    setActiveTrack (index, track) {
        const { tracks } = this.state

        tracks.activeTrack = {
            index,
            bpm: track.bpm,
            name: track.name,
            src: track.src,
        }

        this.setState({
            tracks,
        })

        const trackPlayer = document.getElementById('track-player')

        if (trackPlayer) {
            trackPlayer.load()
        }
    }

    audioEnded () {
        const { tracks } = this.state

        let { index } = tracks.activeTrack

        index++

        if (index === tracks.inRange.length) {
            index = 0
        }

        const track = tracks.inRange[index]

        this.setActiveTrack(index, track)
    }

    handlePrevTrack = () => {
        const { tracks } = this.state

        let { index } = tracks.activeTrack

        index--

        if (index < 0) {
            index = tracks.inRange.length - 1
        }

        const track = tracks.inRange[index]

        this.setActiveTrack(index, track)
    }

    handleNextTrack = () => {
        const { tracks } = this.state

        let { index } = tracks.activeTrack

        index++

        if (index === tracks.inRange.length) {
            index = 0
        }

        const track = tracks.inRange[index]

        this.setActiveTrack(index, track)
    }

    handleShuffle = () => {
        this.getTracksInRange(true)

        return true
    }

    btnBackClick () {
        this.setState({
            page: 'init',
        })
    }

    handleChangeTracksType (type, e) {
        const { tracks } = this.state

        tracks.type = type

        this.setState({
            tracks,
        })
    }

    handleTriggerShareBlock = () => {
        const { showShareBlock } = this.state

        this.setState({
            showShareBlock: !showShareBlock,
        })
    }

    handleTriggerSettingsBlock = () => {
        const { showSettingsBlock } = this.state

        this.setState({
            showSettingsBlock: !showSettingsBlock,
        })
    }

    handleChangeSettings = (settingName, e) => {
        const { settings } = this.state

        if (settings[settingName] !== undefined) {
            settings[settingName] = e.target.checked

            this.setState({
                settings,
            })

            localStorage.rhAppSettings = JSON.stringify(settings)
        }
    }

    render () {
        const {
            slider,
            tracks,
            page,
            settings,
            showShareBlock,
            showSettingsBlock,
        } = this.state

        const { tracklist } = this.props.player

        const shareUrl = this.encrypt(tracks.randomize, tracks.type, slider.value[0], slider.value[1])

        const settingsAvailable = !!window.DeviceMotionEvent
        const buttonsClassNames = settingsAvailable ? [
            'col col-lg-offset-2 col-lg-4 col-md-offset-3 col-md-2 col-sm-offset-2 col-sm-4 col-xs-6',
            'col col-lg-2 col-md-2 col-sm-2 col-xs-3',
            'col col-lg-2 col-md-2 col-sm-2 col-xs-3',
        ] : [
            'col col-lg-offset-3 col-lg-4 col-md-offset-3 col-md-4 col-sm-offset-2 col-sm-6 col-xs-8',
            'col col-lg-1 col-md-2 col-sm-2 col-xs-4',
        ]

        const activeTrack = tracks && tracks.activeTrack || {}
        const tracksInRange = tracks && tracks.inRange

        let widgetBody = ''

        const _tracks = []
        let trackIndex = 0

        for (let i = 0; i < tracksInRange.length; i++) {
            const track = tracksInRange[i]

            _tracks.push(
                <TrackItem
                    key={i}
                    trackIndex={trackIndex}
                    activeTrack={activeTrack}
                    track={track}
                    click={this.setActiveTrack.bind(this, trackIndex, track)} />,
            )
            trackIndex++
        }

        let headerSuffix

        switch (tracks.type) {
            case 1:
                headerSuffix = <i>(только классика)</i>
                break
            case 2:
                headerSuffix = <i>(только ДнД)</i>
                break
            case 3:
                headerSuffix = <i>(для бегиннеров)</i>
                break
            default:
                headerSuffix = null
        }

        let header =
            (
                <header>
                    <h2 style={{ width: '175px' }}>Плеер {headerSuffix}</h2>
                </header>
            )
        let audioTag = ''

        if (page === 'init') {
            if (tracklist) {
                if (tracklist === 'fetching') {
                    widgetBody =
                        (
                            <div
                                className="text-align-center"
                                style={{
                                    opacity: 0.5,
                                }}>
                                <i className="fa fa-5x fa-spin fa-cog" />
                            </div>
                        )
                } else if (tracklist === 'failed') {
                    widgetBody = 'tracklist failed'
                } else {
                    const ionSlider =
                        (<IonSlider
                            type="text"
                            data-min={slider.min}
                            data-max={slider.max}
                            data-from={slider.value[0]}
                            data-to={slider.value[1]}
                            data-type="double"
                            data-step="1"
                            data-postfix=" bpm"
                            data-prettify="false"
                            data-hasgrid="true"
                            sliderChange={this.sliderOnChange.bind(this)} />)

                    header =
                        (
                            <header>
                                <h2 style={{ width: '175px' }}>Плеер {headerSuffix}</h2>
                                <div className="widget-toolbar">
                                    <Dropdown
                                        id="player-settings-dropdown-container"
                                        className="btn-group">
                                        <Dropdown.Toggle className="btn btn-xs dropdown-toggle btn-default">
                                            Настройки
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu
                                            id="player-settings-dropdown"
                                            className="dropdown-menu pull-right">
                                            <MenuItem
                                                active={tracks.type === 0}
                                                onClick={this.handleChangeTracksType.bind(this, 0)}>
                                                Любые треки
                                            </MenuItem>
                                            <MenuItem
                                                active={tracks.type === 1}
                                                onClick={this.handleChangeTracksType.bind(this, 1)}>
                                                Только классика
                                            </MenuItem>
                                            <MenuItem
                                                active={tracks.type === 2}
                                                onClick={this.handleChangeTracksType.bind(this, 2)}>
                                                Только ДнД
                                            </MenuItem>
                                            <MenuItem divider={true} />
                                            <MenuItem
                                                active={tracks.type === 3}
                                                onClick={this.handleChangeTracksType.bind(this, 3)}>
                                                Для бегиннеров
                                            </MenuItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </header>
                        )

                    widgetBody = (
                        <div>
                            <div className="row">
                                <section
                                    className="col col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10 col-sm-12 col-xs-12">
                                    <label className="label">Выберите диапазон:</label>
                                    {ionSlider}
                                </section>
                            </div>
                            <div
                                className="row"
                                style={{
                                    marginBottom: '15px',
                                }}>
                                <section
                                    className="col col-lg-offset-4 col-lg-4 col-md-offset-4 col-md-4 col-sm-offset-4 col-sm-4 col-xs-12">
                                    <Link
                                        to={`/player/${shareUrl}`}
                                        className="btn btn-success btn-block"
                                        onClick={this.getTracksInRange.bind(this, false)}>
                                        Подобрать треки
                                    </Link>
                                </section>
                            </div>
                        </div>
                    )
                }
            }
        } else if (page === 'playlist') {
            if (tracks && tracks.inRange.length > 0) {
                header =
                    (
                        <header>
                            <h2>{slider.value[0]} bpm — {slider.value[1]} bpm</h2>
                        </header>
                    )
            }

            if (activeTrack.name) {
                audioTag = (
                    <div>
                        <Audio
                            track={activeTrack}
                            src={activeTrack.src}
                            useAccelerometer={settings.accelerometer}
                            onEnded={this.audioEnded.bind(this)}
                            onPrev={this.handlePrevTrack}
                            onNext={this.handleNextTrack}
                            onShuffle={this.handleShuffle} />
                    </div>
                )
            }

            widgetBody = (
                <div>
                    {showShareBlock ? (
                        <div
                            className="row"
                            style={{
                                maxHeight: '85px',
                                overflowY: 'hidden',
                                transition: 'all .5s ease',
                            }}>
                            <section
                                className="col col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8 col-xs-12"
                                style={{
                                    marginBottom: '18px',
                                }}>
                                <ShareButton
                                    type="vk"
                                    options={{
                                        purl: `http://app.radio-hustle.com/player/${shareUrl}`,
                                        ptitle: 'Зацени мою подборку треков для тренировок на #RadioHustle',
                                        text: '',
                                        pimg: 'http://app.radio-hustle.com/public/img/player/share-icon.png',
                                    }}
                                    style={{
                                        width: '20%',
                                        maxWidth: 'unset',
                                    }} />
                                <ShareButton
                                    type="ok"
                                    options={{
                                        purl: `http://app.radio-hustle.com/player/${shareUrl}`,
                                        text: 'Зацени мою подборку треков для тренировок на #RadioHustle',
                                    }}
                                    style={{
                                        width: '20%',
                                        maxWidth: 'unset',
                                    }} />
                                <ShareButton
                                    type="facebook"
                                    options={{
                                        purl: `http://app.radio-hustle.com/player/${shareUrl}`,
                                        ptitle: 'Зацени мою подборку треков для тренировок на #RadioHustle',
                                        pimg: '',
                                        text: '',
                                    }}
                                    style={{
                                        width: '20%',
                                        maxWidth: 'unset',
                                    }} />
                                <ShareButton
                                    type="twitter"
                                    options={{
                                        purl: `http://app.radio-hustle.com/player/${shareUrl}`,
                                        ptitle: 'Зацени мою подборку треков для тренировок на #RadioHustle',
                                    }}
                                    style={{
                                        width: '20%',
                                        maxWidth: 'unset',
                                    }} />
                                <ShareButton
                                    type="clipboard"
                                    options={{
                                        text: `http://app.radio-hustle.com/player/${shareUrl}`,
                                    }}
                                    style={{
                                        width: '20%',
                                        maxWidth: 'unset',
                                    }} />
                            </section>
                        </div>
                    ) : null}
                    {showSettingsBlock ? (
                        <div
                            className="row"
                            style={{
                                maxHeight: '85px',
                                overflowY: 'hidden',
                                transition: 'all .5s ease',
                            }}>
                            <section
                                className="col col-lg-offset-3 col-lg-6 col-md-offset-3 col-md-6 col-sm-offset-2 col-sm-8 col-xs-12"
                                style={{
                                    marginBottom: '18px',
                                }}>
                                <div className="smart-form">
                                    <label className="toggle">
                                        <input
                                            type="checkbox"
                                            name="toggle-accelerometer"
                                            defaultChecked={settings.accelerometer}
                                            onChange={this.handleChangeSettings.bind(this, 'accelerometer')} />
                                        <i
                                            data-swchon-text="ВКЛ"
                                            data-swchoff-text="ВЫКЛ" />
                                    Управление акселерометром
                                    </label>
                                </div>
                            </section>
                        </div>
                    ) : null}
                    <div className="row">
                        <section
                            className={buttonsClassNames[0]}>
                            <Link
                                to="/player"
                                className="btn btn-default btn-block margin-bottom-10"
                                onClick={this.btnBackClick.bind(this)}>
                                Назад
                            </Link>
                        </section>
                        {settingsAvailable ? (
                            <section className={buttonsClassNames[2]}>
                                <button
                                    className="btn btn-default btn-block margin-bottom-10"
                                    onClick={this.handleTriggerSettingsBlock}>
                                    {showSettingsBlock ? <i className="fa fa-times" /> : <i className="fa fa-cog" />}
                                </button>
                            </section>
                        ) : null}
                        <section className={buttonsClassNames[1]}>
                            <button
                                className="btn btn-info btn-block margin-bottom-10"
                                onClick={this.handleTriggerShareBlock}>
                                {showShareBlock ? <i className="fa fa-times" /> : <i className="fa fa-share-alt" />}
                            </button>
                        </section>
                    </div>
                    {_tracks.length > 0 ? (
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
                                        className="dd-list tracklist"
                                        style={{
                                            maxWidth: '600px',
                                            margin: '0 auto',
                                        }}>
                                        {_tracks}
                                    </ol>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div
                            className="text-align-center"
                            style={{
                                opacity: 0.5,
                            }}>
                            <i className="fa fa-5x fa-spin fa-cog" />
                        </div>
                    )}
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

function mapStateToProps (state) {
    const { playerReducer } = state

    return {
        ...state,
        tracklist: playerReducer && playerReducer.tracklist,
    }
}

export default connect(mapStateToProps)(Player)
