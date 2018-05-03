import React from 'react';

class TrackItem extends React.Component {
    render() {
        const { trackIndex, activeTrack, track, click, color } = this.props

        return (
            <li key={trackIndex} className={'dd-item track-item ' + ((trackIndex === activeTrack.index) ? 'active' : '')}
                data-id={trackIndex}
                onClick={click}>
                <div key={trackIndex + '_div'} className="dd-handle" style={{
                    backgroundColor: color
                }}>
                    {track.bpm} bpm <span>{track.name.replace(/_/gim, ' ')
                    .replace('audio/', '')
                    .replace(/\d{2}y\d{2}w\dd\//g, '')
                    .replace('.mp3', '')
                    .replace(/\b./g, function (m) {
                        return m.toUpperCase();
                    })}</span>
                </div>
            </li>
        )
    }
}

export default TrackItem
