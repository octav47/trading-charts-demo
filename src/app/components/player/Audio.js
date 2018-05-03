import React from 'react'
import AudioToolbar from './AudioToolbar'

class Audio extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            targetID: 'track-player',
            isPlaying: true,
        }

        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
    }

    pause() {
        const { targetID } = this.state
        const target = document.getElementById(targetID)

        target.pause()
    }

    play() {
        const { targetID } = this.state
        const target = document.getElementById(targetID)

        target.play()
    }

    handleToggleAudio = () => {
        const { targetID } = this.state
        const target = document.getElementById(targetID)

        if (target.paused) {
            target.play()

            return true
        }
        target.pause()

        return false
    }

    handleLoopAudio = () => {
        const { targetID } = this.state
        const target = document.getElementById(targetID)

        target.loop = !target.loop

        return target.loop
    }

    handleShuffleAudio = () => {
        const { onShuffle } = this.props

        return onShuffle()
    }

    onPlay = () => {

    }

    onPause = () => {

    }

    onEnded(e) {
        const { onEnded } = this.props

        onEnded()
    }

    componentDidMount() {
        this.play()

        $(window).resize(() => {
            const e = $(this.audioControl)

            e.width(e.parent().width())
        })

        $(window).resize()
    }

    componentDidUpdate() {
        this.play()
    }

    render() {
        const { targetID } = this.state
        const { track, onPrev, onNext, useAccelerometer } = this.props

        return (
            <div
                id="audio-control"
                ref={e => {
                    this.audioControl = e
                }}>
                <div
                    className="alert alert-info fade in"
                    style={{
                        width: '100%',
                        maxWidth: '600px',
                        margin: 'auto',
                        padding: '4px',
                    }}>
                    <span
                        className="badge bg-color-blueLight"
                        style={{
                            backgroundColor: '#9cb4c5',
                        }}>
                        {track.bpm} bpm
                    </span> {track.name}
                </div>
                <audio
                    id={targetID}
                    ref={e => {
                        this.audio = e
                    }}
                    controls={true}
                    style={{
                        display: 'block',
                        margin: '4px auto',
                        width: '100%',
                        maxWidth: '600px',
                    }}
                    onEnded={this.onEnded.bind(this)}>
                    <source
                        src={track.src}
                        type="audio/mp3" />
                    <source
                        src={track.src}
                        type="audio/ogg" />
                </audio>
                <AudioToolbar
                    useAccelerometer={useAccelerometer}
                    onToggle={this.handleToggleAudio}
                    onPrev={onPrev}
                    onNext={onNext}
                    onLoop={this.handleLoopAudio}
                    onShuffle={this.handleShuffleAudio} />
            </div>
        )
    }
}

export default Audio
