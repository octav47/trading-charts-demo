import React from 'react'

const DancerPic = ({ dancerID, url, style, target, children }) => {
    if (!style) {
        style = {
            height: '200px'
        }
    }

    let id = 'dancer-pic'
    let imgStyle = {
        width: '100%'
    }

    let className = ''
    if (target === 'board') {
        className = 'dancer-pic-board'
    }

    let icon = (url) ? <i className="fa fa-vk"/> : ''

    url = url || 'javascript:void(0)'
    dancerID = dancerID || 'no_avatar'

    return (
        <a href={url} id="dancer-pic" target="_blank" className={className} style={style}>
            <img src={`http://radio-hustle.com/dancers_old/pics/${dancerID}.jpg`}
                 style={{ width: '100%' }}/>
            {icon}
            {children}
        </a>
    )
}

export default DancerPic