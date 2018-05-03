import React, { Component, PropTypes } from 'react'

import { smallBox } from '../../components/utils/actions/MessageActions';

import FontAwesome from 'react-fontawesome'

export default class ShareButton extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['vk', 'ok', 'facebook', 'twitter', 'clipboard'])
    }

    share(type = 'vk', options = {}) {
        let a = {
            vk: ({ purl, ptitle, pimg, text = '' }) => {
                ptitle = ptitle.trim()
                text = text.trim()

                let url = 'http://vkontakte.ru/share.php?'

                url += 'url=' + encodeURIComponent(purl)
                url += '&title=' + encodeURIComponent(ptitle)
                url += '&image=' + encodeURIComponent(pimg)
                url += '&noparse=true'

                a.popup(url)
            },
            ok: ({ purl, text = '' }) => {
                text = text.trim()

                let url = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1'

                url += '&st.comments=' + encodeURIComponent(text)
                url += '&st._surl=' + encodeURIComponent(purl)

                a.popup(url)
            },
            facebook: ({ purl, ptitle, pimg, text = '' }) => {
                ptitle = ptitle.trim()
                text = text.trim()

                let url = 'https://www.facebook.com/dialog/feed?'

                url += 'app_id=' + encodeURIComponent(145461435923444)
                url += '&name=' + encodeURIComponent(ptitle)
                url += '&description=' + encodeURIComponent(text)
                url += '&link=' + encodeURIComponent(purl)
                url += '&picture=' + encodeURIComponent(pimg)

                a.popup(url)
            },
            twitter: ({ purl, ptitle }) => {
                ptitle = ptitle.trim()

                let url = 'http://twitter.com/share?'

                url += 'text=' + encodeURIComponent(ptitle)
                url += '&url=' + encodeURIComponent(purl)
                url += '&counturl=' + encodeURIComponent(purl)

                a.popup(url)
            },
            mailru: ({ purl, ptitle, pimg, text = '' }) => {
                ptitle = ptitle.trim()
                text = text.trim()

                let url = 'http://connect.mail.ru/share?'

                url += 'url=' + encodeURIComponent(purl)
                url += '&title=' + encodeURIComponent(ptitle)
                url += '&description=' + encodeURIComponent(text)
                url += '&imageurl=' + encodeURIComponent(pimg)

                a.popup(url)
            },
            clipboard: ({ text, onCopy }) => {
                text = text.trim()

                const textField = document.createElement('textarea')
                textField.innerText = text
                document.body.appendChild(textField)
                textField.select()
                document.execCommand('copy')
                textField.remove()

                smallBox({
                    title: 'Скопировано в буфер!',
                    content: '',
                    color: '#659265',
                    timeout: 4000,
                    iconSmall: 'fa fa-copy swing animated'
                })

                if (onCopy) {
                    onCopy()
                }
            },
            popup: (url) => {
                window.open(url, '', 'toolbar=0,status=0,width=626,height=436')
            },
        }

        return () => a[type](options)
    }

    render() {
        const { type, label, options, style } = this.props

        let icon = <FontAwesome name="circle-o"/>
        let color = '#404040'
        let backgroundColor = '#ffffff'

        if (label) {
            switch (type) {
                case 'vk':
                    icon = <FontAwesome name="vk" />
                    color = '#ffffff'
                    backgroundColor = '#45668e'
                    break
                case 'ok':
                    icon = <FontAwesome name="odnoklassniki" />
                    backgroundColor = '#ed812b'
                    break
                case 'facebook':
                    icon = <FontAwesome name="facebook" />
                    color = '#ffffff'
                    backgroundColor = '#3b5998'
                    break
                case 'twitter':
                    icon = <FontAwesome name="twitter" />
                    color = '#ffffff'
                    backgroundColor = '#00aced'
                    break
                case 'clipboard':
                    icon = <FontAwesome name="link" />
                    color = '#ffffff'
                    backgroundColor = '#3a3f51'
                    break
            }

            return (
                <span
                    className="label"
                    onClick={this.share(type, options)}
                    style={{
                        display: 'inline-block',
                        marginRight: '8px',
                        padding: '.2em .6em .3em',
                        color: color,
                        backgroundColor: backgroundColor,
                    }}>
                    {icon}
                </span>
            )
        }

        switch (type) {
            case 'vk':
                icon = <FontAwesome name="vk" size="2x"/>
                color = '#ffffff'
                backgroundColor = '#45668e'
                break
            case 'ok':
                icon = <FontAwesome name="odnoklassniki" size="2x"/>
                backgroundColor = '#ed812b'
                break
            case 'facebook':
                icon = <FontAwesome name="facebook" size="2x"/>
                color = '#ffffff'
                backgroundColor = '#3b5998'
                break
            case 'twitter':
                icon = <FontAwesome name="twitter" size="2x"/>
                color = '#ffffff'
                backgroundColor = '#00aced'
                break
            case 'clipboard':
                icon = <FontAwesome name="link" size="2x"/>
                color = '#ffffff'
                backgroundColor = '#3a3f51'
                break
        }

        return (
            <button className="btn btn-block btn-default" target="_blank" style={{
                display: 'inline-block',
                // float: 'left',
                width: '50%',
                maxWidth: '55px',
                height: '55px',
                color: color,
                backgroundColor: backgroundColor,
                verticalAlign: 'bottom',
                ...style
            }} onClick={this.share(type, options)}>
                {icon}
            </button>
        )
    }
}
