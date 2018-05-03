import React from 'react';
import HtmlRender from '../../components/utils/HtmlRender'

export default {
    path: '/',
    component: require('../../components/common/Layout').default,

    childRoutes: [
        {
            path: 'api',
            getComponent(nextState, cb){
                System.import('html-loader?-attrs!./content/api.html').then((html)=> {
                    cb(null,
                        () => (<HtmlRender html={html}/>)
                    )
                })
            }
        }
    ]
};
