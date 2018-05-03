import React from 'react'

import { OverlayTrigger, Tooltip, Popover } from 'react-bootstrap'

import { Stats, BigBreadcrumbs, WidgetGrid, JarvisWidget }  from '../../../components'

import AddExternalEvent from '../../../components/calendar/components/AddExternalEvent'
import ExternalEvents from '../../../components/calendar/components/ExternalEvents'
import FullCalendarWidget from '../../../components/calendar/components/FullCalendarWidget'

import { fetchEvents } from '../actions'

import { connect } from 'react-redux'

function fixDate(string) {
    return string.split('-').map(function (e) {
        if (e.length == 1) {
            e = '0' + e;
        }
        return e;
    }).join('-');
}

let citiesBackground = {
    'москва': 'bg-color-greenLight',
    'санкт-петербург': 'bg-color-redLight'
};

class CalendarPage extends React.Component {

    componentWillMount() {
        document.title = 'Календарь | Radio Hustle App'
    }

    render() {
        // console.log(this.props)

        let { events } = this.props.calendar

        let calendar = ''

        if (events) {
            if (events === 'fetching') {
                calendar = 'fetching calendar'
            } else if (events === 'failed') {
                calendar = 'failed calendar'
            } else {
                events = events.events.map(function (e) {
                    var date = e.innerHTML.match(/\(.*?\)/g);
                    if (date === null) {
                        e.start = new Date(e.date);
                    } else {
                        date = date[0].replace(/\(|\)/g, '').replace(/\./g, '-');
                        var dateSplit = date.split(/,|(\s*и\s*)|\//);
                        if (dateSplit.length > 1) {
                            e.start = fixDate(dateSplit[0]);
                            e.end = fixDate(dateSplit[0].replace(/-\d+$/, '-' + dateSplit[2]));
                            if (e.end.split('-')[2] - e.start.split('-')[2] > 1) {
                                delete e.end;
                            }
                        } else {
                            e.start = fixDate(date);
                        }
                    }
                    e.title = e.innerHTML
                        .replace(/&#39;/g, '\'')
                        .replace(/&#33;/g, '!')
                        .replace(/&quot;/g, '')
                        .replace(/&amp;/g, '&')
                        .replace(/\((.*?)\)/, '')
                        .trim();
                    var background = citiesBackground[e.city.toLowerCase().replace(/^г.\s*/, '')];
                    if (!background) {
                        background = 'bg-color-blue';
                    }
                    e.className = ['event', background];
                    e.icon = '';
                    e.start = e.start + 'T10:00:00';
                    if (e.end) {
                        e.end = e.end + 'T23:00:00';
                    } else {
                        e.allDay = true;
                    }
                    // fix
//                console.log(e.title + ' ' + (e.title == 'Nord Cup 2017'));
                    if (e.title == 'Nord Cup 2017') {
                        e.start = '2017-03-17T10:00:00';
                        e.end = '2017-03-19T23:00:00';
                        delete e.allDay;
                    }
                    return e;
                });
                calendar = <FullCalendarWidget events={events}/>
            }
        }

        // let events = [{
        //     "_id": "544c4183be624ef013bb009a",
        //     "title": "All Day Event",
        //     "start": moment().subtract(15, 'day').startOf('day').add(21, 'hours'),
        //     "description": "long description",
        //     "icon": "fa-check",
        //     "className": ["event", "bg-color-greenLight"]
        // }]

        return (
            <div id="content">
                <WidgetGrid>
                    <div className="row">
                        <article className="col-sm-12 col-md-12 col-lg-12">
                            {calendar}
                        </article>
                    </div>
                </WidgetGrid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(CalendarPage)
