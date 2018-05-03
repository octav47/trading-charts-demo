import React from 'react';
import { connect } from 'react-redux'

const appLoadingStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    lineHeight: '35px',
    textAlign: 'center',
    fontSize: '150%',
    color: '#dddddd',
    textShadow: '#333333 1px 1px 0, #333333 -1px -1px 0, #333333 -1px 1px 0, #333333 1px -1px 0',
    paddingTop: '50px',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    zIndex: '9000'
}

class LoadingPage extends React.Component {
    render() {
        const { loading } = this.props.layout
        return (loading) ? (
            <div id="app-loading"
                 style={appLoadingStyle}>
                <i className="fa fa-5x fa-spin fa-cog"/>
            </div>
        ) : null
    }
}

function mapStateToProps(state) {
    const { layoutReducer } = state

    return {
        ...state,
        loading: layoutReducer && layoutReducer.loading || 'error'
    }
}

export default connect(mapStateToProps)(LoadingPage)