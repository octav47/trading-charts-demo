import React, { PropTypes } from 'react'

import { getProgress } from '../../utils/dancerUtils'

class DancerProgress extends React.Component {
    static propTypes = {
        type: PropTypes.oneOf(['classic', 'jnj']).isRequired,
        data: PropTypes.object.isRequired,
    }

    render () {
        const { type, data } = this.props

        let header = 'Прогресс в '
        let color
        if (type === 'classic') {
            header += 'классике'
            color = 'redLight'
        } else {
            header += 'ДнД'
            color = 'blue'
        }

        let progress = getProgress(type, data)
        let iconProgress = (progress === 100) ? <i className="fa fa-check"/> : ''

        return (
            <div style={{
                padding: '4px 8px',
            }}>
                <p style={{
                    height: '24px',
                    lineHeight: '24px',
                }}>
                    {header}
                    <span className={`txt-color-${color} pull-right font-md`}>
                        {iconProgress}
                        {Math.round(progress) + '%'}
                    </span>
                </p>
                <div
                    className="progress"
                    style={{
                        marginBottom: 0,
                    }}>
                    <div className={`progress-bar progress-striped active bg-color-${color}`}
                         role="progressbar" style={{
                        width: progress + '%',
                    }}/>
                </div>
            </div>
        )
    }
}

export default DancerProgress
