import React from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux'

import * as EventActions from '../EventActions'

import JarvisWidget from '../../../components/widgets/JarvisWidget'

import 'script-loader!smartadmin-plugins/bower_components/fullcalendar/dist/fullcalendar.js'
import './FullCalendarWidget.css'

function resizeWorkDayTd() {
    if (window.innerWidth < 700) {
        $('.fc-row.fc-widget-header th:nth-child(-n+5)').width(($('.fc-row.fc-widget-header').width() / 7) * 0.75);
        $('.fc-bg td:nth-child(-n+5)').width(($('.fc-bg').width() / 7) * 0.75);
        $('.fc-content-skeleton td:nth-child(-n+5)').width(($('.fc-content-skeleton').width() / 7) * 0.75);
    }
}

class FullCalendarWidget extends React.Component {

    componentDidMount() {
        const { events } = this.props

        console.log('events', events)

        this.preRender(events)
    }

    preRender() {
        const self = this;
        const $calendar = $(this.refs.smartCalendar);
        const calendar = $calendar.fullCalendar({
            lang: 'en',
            editable: false,
            draggable: false,
            selectable: false,
            selectHelper: false,
            unselectAuto: false,
            disableResizing: false,
            droppable: false,
            firstDay: 1,
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.'],
            dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            dayNamesShort: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],

            header: {
                left: 'title', //,today
                center: 'prev, next, today',
                right: 'month, agendaWeek, agendaDay' //month, agendaDay,
            },

            drop (date, allDay) { // this function is called when something is dropped

                // retrieve the dropped element's stored Event Object
                const originalEventObject = $(this).data('eventObject');

                // we need to copy it, so that multiple events don't have a reference to the same object
                const copiedEventObject = { ...originalEventObject };

                // assign it the date that was reported
                copiedEventObject.start = date;
                copiedEventObject.allDay = allDay;

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                $calendar.fullCalendar('renderEvent', copiedEventObject, true);

                self.props.dropExternal(originalEventObject)


            },

            // select (start, end, allDay) {
            //     var title = prompt('Event Title:');
            //     if (title) {
            //         calendar.fullCalendar('renderEvent', {
            //                 title: title,
            //                 start: start,
            //                 end: end,
            //                 allDay: allDay
            //             }, true // make the event "stick"
            //         );
            //     }
            //     calendar.fullCalendar('unselect');
            // },


            events: (start, end, timezone, callback) => {
                callback(this.props.events);
            },

            eventRender: function (event, element, icon) {
                if (!event.description == '') {
                    element.find('.fc-title').append("<br/><span class='ultra-light'>" + event.description +
                        "</span>");
                }
                if (!event.icon == "") {
                    element.find('.fc-title').append("<i class='air air-top-right fa " + event.icon +
                        " '></i>");
                }
                element.attr('href', event.href);
//                    element.find('.fc-title').html('<a href="' + event.href + '" target="_blank">' + event.title + '</a>');
                if (event.city !== '') {
                    element.append('<span class="fc-city">' + event.city + '</span>');
                }
            },
            eventAfterRender: function (event, element, view) {
                $(view).css('width', '50px');
            },
            windowResize: function (event, ui) {
                $('#calendar').fullCalendar('render')
                resizeWorkDayTd()

                if (window.innerWidth < 700 && window.innerHeight > window.innerWidth) {
                    $('#calendar-alert').removeClass('hidden')
                } else {
                    $('#calendar-alert').addClass('hidden')
                }
            },

            height: 'auto'
        });

        $('.fc-header-right, .fc-header-center', $calendar).hide();
        $('.fc-left', $calendar).addClass('fc-header-title')
    }

    changeView = (period)=> {
        $(this.refs.smartCalendar).fullCalendar('changeView', period);
    };

    next = ()=> {
        $('.fc-next-button', this.refs.smartCalendar).click();
    };

    prev = ()=> {
        $('.fc-prev-button', this.refs.smartCalendar).click();
    };

    today = ()=> {
        $('.fc-today-button', this.refs.smartCalendar).click();
    };


    render() {
        let calendarAlertClassName = ''
        if (!(window.innerWidth < 700 && window.innerHeight > window.innerWidth)) {
            calendarAlertClassName = ' hidden'
        }

        return (
            <JarvisWidget color="blueDark">
                <header>
                    <span className="widget-icon"> <i className="fa fa-calendar"/> </span>

                    <h2>Календарь турниров</h2>

                    {/*<div className="widget-toolbar">*/}
                    {/*<DropdownButton id="calendar-showing-dropdown" title="Showing" pullRight bsSize="xsmall">*/}
                    {/*<MenuItem onClick={this.changeView.bind(this, 'month')}>Month</MenuItem>*/}
                    {/*<MenuItem onClick={this.changeView.bind(this, 'agendaWeek')}>Agenda</MenuItem>*/}
                    {/*<MenuItem onClick={this.changeView.bind(this, 'agendaDay')}>Today</MenuItem>*/}
                    {/*</DropdownButton>*/}
                    {/*</div>*/}
                </header>

                {/* widget div*/}
                <div>
                    <div className="widget-body no-padding">
                        <div id="calendar-alert" className={'alert alert-info fade in no-margin' + calendarAlertClassName} style={{
                            position: 'fixed',
                            bottom: '0',
                            left: '0',
                            width: '100%',
                            zIndex: '9000'
                        }}>
                            <i className="fa-fw fa fa-info"/>
                            Календарь удобнее смотреть в альбомной ориентации
                        </div>

                        <div className="widget-body-toolbar">

                            <div id="calendar-buttons">

                                <div className="btn-group">
                                    <a onClick={this.prev} className="btn btn-default btn-xs"><i
                                        className="fa fa-chevron-left"/></a>
                                    <a onClick={this.next} className="btn btn-default btn-xs"><i
                                        className="fa fa-chevron-right"/></a>
                                </div>
                            </div>
                        </div>

                        <div id="calendar" ref="smartCalendar"/>

                        {/* end content */}
                    </div>

                </div>
                {/* end widget div */}
            </JarvisWidget>        )
    }
}

export default FullCalendarWidget