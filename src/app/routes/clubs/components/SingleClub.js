import React, { Component, PropTypes } from 'react';
import clubsData from '../content/clubsData.js';
import HtmlRender from '../../../components/utils/HtmlRender';

export default class SingleClub extends Component {

    componentWillMount() {
        const clubName = this.props.params.name

        if (clubName === 'noname') {
            document.title = `Неизвестный клуб | Radio Hustle App`
        } else {
            document.title = `${this.props.params.name} | Radio Hustle App`
        }
    }

    render() {
        const clubName = this.props.params.name

        let clubHTML = ''

        if (clubName === 'noname') {
            clubHTML = (
                <div>
                    <p>
                        К сожалению, такого клуба ещё нет в нашей базе :(
                        Пока ещё нет.
                    </p>
                    <p>Хотите его добавить? Напишите
                        <a title="мне" href="http://vk.com/radio_hustle" target="_blank"> в сообщения нашей группе в
                            VK</a>!
                    </p>
                </div>
            )
        } else {
            clubHTML = (
                <HtmlRender html={clubsData[clubName].html}/>
            )
        }

        return (
            <div style={{
                padding: '0 25px'
            }}>
                {clubHTML}
            </div>
        )
    }
}