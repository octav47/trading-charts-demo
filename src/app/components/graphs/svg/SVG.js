import React from 'react'

// import 'imports-loader?this=>window!smartadmin-plugins/flot-bundle/flot-bundle.min.js'

class SVG extends React.Component {
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {id, data} = this.props;

        return (
            <div id={id} dangerouslySetInnerHTML={{__html: data}} className="svg"></div>
        )
    }
}

SVG.propTypes = {
    id: React.PropTypes.string.isRequired,
    data: React.PropTypes.string.isRequired
};

export default SVG;