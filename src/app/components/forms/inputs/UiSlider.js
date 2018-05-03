import React from 'react'

import 'script-loader!bootstrap-slider/dist/bootstrap-slider.min.js'

export default class UiSlider extends React.Component {
    componentDidMount() {
        $(this.refs.slider).bootstrapSlider({
            slideStart: function( event, ui ) {
                console.log('slideStart')
            }
        });
    }

    render() {
        let { sliderValue, ...props } = { ...this.props }

        if (Array.isArray(sliderValue)) {
            sliderValue = `[${sliderValue[0]},${sliderValue[1]}]`
        }

        return <input type="text" ref="slider" data-slider-value={sliderValue} {...props} onChange={
            function () {
                console.log('change')
            }
        }/>
    }
}