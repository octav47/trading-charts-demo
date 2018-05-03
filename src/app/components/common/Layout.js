import React from 'react';
import Header from './Header';
import Navigation from '../navigation/components/Navigation';
import Ribbon from '../ribbon/Ribbon';
import Footer from './Footer';
import Shortcut from '../navigation/components/Shortcut';
import LayoutSwitcher from '../layout/components/LayoutSwitcher';
import LoadingPage from './LoadingPage';

const appLoadingStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    paddingTop: '40px',
    background: '#ffffff',
    textAlign: 'center',
    zIndex: '9000',
}

// require('../../smartadmin/components/less/components.less');

export default class Layout extends React.Component {

    componentWillMount() {
        //console.log('Layout will mount')
        //$('body').prepend('<div id="app-loading" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; padding-top: 40px; background: #ffffff; text-align: center; z-index: 9000">Loading...</div>')
    }

    componentDidMount() {
        //console.log('Layout did mount')
        //$('#app-loading').fadeOut(500, () => {
        //    $('#app-loading').remove()
        //})
    }

    render() {
        let layoutSwitcher = (window.dev) ? <LayoutSwitcher /> : '';
        return (
            <div>
                <Header />
                <Navigation />
                <div id="main" role="main">
                    <LoadingPage/>
                    {layoutSwitcher}
                    <Ribbon />
                    {this.props.children}
                </div>

                <Footer />
                <Shortcut />
            </div>
        )
    }
}

