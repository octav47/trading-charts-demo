import React from 'react'

import 'script-loader!ion-rangeslider/js/ion.rangeSlider.min.js'

export default class IonSlider extends React.Component {
    componentDidMount() {
        let options = {
            onChange: this.props.sliderChange || function () {}
        }

        $(this.refs.input).ionRangeSlider(options);

    }

    render() {
        const { sliderChange, ...props } = { ...this.props }

        return (
            <input {...props} ref="input"/>
        )
    }
}
