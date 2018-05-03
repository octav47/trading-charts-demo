import React, { Component } from 'react'
import { JarvisWidget, WidgetGrid } from '../../../components'

import UiSpinner from '../../../components/forms/inputs/UiSpinner'

class Points extends Component {
    componentWillMount() {
        document.title = 'Калькулятор очков | Radio Hustle App'
    }

    handleOnClickLabel = e => {
        const { value } = e.target

        alert(value)
    }

    render() {
        return (
            <div id="content">
                <WidgetGrid>
                    <div className="row">
                        <article className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <JarvisWidget
                                editbutton={false}
                                color="purple">
                                <header>
                                    <span className="widget-icon"> <i className="fa fa-calculator" /> </span>
                                    <h2>Калькулятор очков</h2>
                                </header>
                                <div>
                                    <div className="smart-form widget-body">
                                        <div
                                            className="row"
                                            style={{
                                                margin: 0,
                                            }}>
                                            <section className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label className="radio">
                                                    <input
                                                        type="radio"
                                                        name="dancer-class"
                                                        value="other"
                                                        onClick={this.handleOnClickLabel} />
                                                    Любой класс, кроме Star
                                                    <i />
                                                </label>
                                            </section>
                                            <section className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <label className="radio">
                                                    <input
                                                        type="radio"
                                                        name="dancer-class"
                                                        value="s"
                                                        onClick={this.handleOnClickLabel} />
                                                    Star
                                                    <i />
                                                </label>
                                            </section>
                                        </div>
                                        <div
                                            className="row"
                                            style={{
                                                margin: 0,
                                            }}>
                                            <section className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                                <label className="label">Введите количество танцоров в номинации</label>
                                                <label className="input">
                                                    <UiSpinner
                                                        className="form-control spinner-both"
                                                        options={{
                                                            min: 3,
                                                            max: 250,
                                                        }}
                                                        style={{
                                                            padding: '6px 30px',
                                                        }} defaultValue={3} />
                                                </label>
                                            </section>
                                        </div>
                                        <div
                                            className="row"
                                            style={{
                                                margin: 0,
                                            }}>
                                            <section className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                                                <label className="label">Введите Ваше место</label>
                                                <label className="input">
                                                    <input
                                                        type="text"
                                                        name="total-dancers" />
                                                </label>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </JarvisWidget>
                        </article>
                    </div>
                </WidgetGrid>
            </div>
        )
    }
}

export default Points
