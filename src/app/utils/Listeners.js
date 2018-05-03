import { smallBox } from '../components/utils/actions/MessageActions'

const fetchFailedListener = message => {
    smallBox({
        title: 'Ошибка!',
        content: message,
        color: '#c46a69',
        iconSmall: 'fa fa-warning bounce',
        timeout: 8000,
    })
}

const successActionListener = ({ title, message, icon, timeout = 8000 }) => {
    smallBox({
        title,
        content: message,
        color: '#739e73',
        iconSmall: `fa fa-${icon} bounce`,
        timeout,
    })
}

const warningActionListener = ({ title, message, icon, timeout = 8000 }) => {
    smallBox({
        title,
        content: message,
        color: '#c79121',
        iconSmall: `fa fa-${icon} bounce`,
        timeout,
    })
}

export default {
    fetchFailed: fetchFailedListener,
    successAction: successActionListener,
    warningAction: warningActionListener,
}
