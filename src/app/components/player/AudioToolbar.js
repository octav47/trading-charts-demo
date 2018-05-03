import React from 'react'
import Movement from 'CustomModules/react-movement'
import Listeners from '../../utils/Listeners'

class AudioToolbar extends React.Component {
    state = {
        isPlaying: true,
        isLooped: false,
        isShuffled: false,
    }

    handleToggleAudio = () => {
        const { onToggle } = this.props

        const toggleResult = onToggle()

        const newState = {
            isPlaying: !!toggleResult,
        }

        this.setState({
            ...newState,
        })
    }

    handlePrevAudio = () => {
        const { onPrev } = this.props

        onPrev()
    }

    handleNextAudio = () => {
        const { onNext } = this.props

        onNext()
    }

    handleLoop = () => {
        const { onLoop } = this.props
        const isLooped = onLoop()
        const title = isLooped ? 'Повторение трека включено' : 'Повторение трека выключено'

        Listeners.warningAction({
            title,
            icon: 'refresh',
            timeout: 2500,
        })

        this.setState({
            isLooped,
        })
    }

    handleShuffle = () => {
        const { onShuffle } = this.props

        Listeners.successAction({
            title: 'Треки перемешаны',
            icon: 'random',
            timeout: 2500,
        })

        this.setState({
            isShuffled: onShuffle(),
        })
    }

    render () {
        const { isPlaying, isLooped } = this.state
        const { useAccelerometer } = this.props

        return (
            <Movement
                onShake={() => {
                    if (useAccelerometer) {
                        this.handleShuffle()
                    }
                }}>
                <div
                    id="audio-toolbar"
                    className="row">
                    <div className="col col-lg-2 col-lg-offset-1 col-md-2 col-md-offset-1 col-sm-2 col-sm-offset-1 col-xs-2 col-xs-offset-1">
                        <button
                            type="button"
                            className="btn btn-default btn-block"
                            onClick={this.handlePrevAudio}>
                            <i className="fa fa-step-backward" />
                        </button>
                    </div>
                    <div className="col col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <button
                            type="button"
                            className={`btn btn-default btn-block ${isPlaying ? '' : 'bg-color-greenLight txt-color-white'}`}
                            onClick={this.handleToggleAudio}>
                            {isPlaying ? <i className="fa fa-pause" /> : <i className="fa fa-play" />}
                        </button>
                    </div>
                    <div className="col col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <button
                            type="button"
                            className="btn btn-default btn-block"
                            onClick={this.handleNextAudio}>
                            <i className="fa fa-step-forward" />
                        </button>
                    </div>
                    <div className="col col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <button
                            type="button"
                            className="btn btn-default btn-block"
                            onClick={this.handleShuffle}>
                            <i className="fa fa-random" />
                        </button>
                    </div>
                    <div className="col col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <button
                            type="button"
                            className={`btn btn-default btn-block ${isLooped ? 'bg-color-orange txt-color-white' : ''}`}
                            onClick={this.handleLoop}>
                            <i className={`fa ${isLooped ? 'fa-spin' : ''} fa-refresh`} />
                        </button>
                    </div>
                </div>
            </Movement>
        )
    }
}

export default AudioToolbar
