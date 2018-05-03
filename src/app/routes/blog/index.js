import React from 'react'
import HtmlRender from '../../components/utils/HtmlRender'

export default {
    path: '/',
    component: require('../../components/common/Layout').default,

    childRoutes: [
        {
            path: 'blog',
            getComponent(nextState, cb){
                System.import('./containers/Blog').then((m) => {
                    cb(null, m.default)
                })
            },
        },
        {
            path: 'blog/about',
            getComponent(nextState, cb){
                System.import('./content/BlogItemAbout').then((m) => {
                    cb(null, m.default)
                })
            },
        },
    ],

}
