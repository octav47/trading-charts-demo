import React from 'react'

export default class UiAutocomplete extends React.Component {
    componentDidMount () {
        const {
            source,
            onSelect,
            minLength = 1,
            maxItemsToShow,
            renderItem,
        } = this.props

        console.log(source)

        let input = $(this.refs.input).autocomplete({
            source,
            select: onSelect,
            autoFocus: true,
            minLength,
        })

        if (renderItem) {
            input.autocomplete('instance')._renderItem = renderItem
        }

        if (maxItemsToShow) {
            input.autocomplete('instance')._renderMenu = function (ul, items) {
                const self = this
                const diff = items.length - maxItemsToShow

                if (diff > 0) {
                    items = items.slice(0, maxItemsToShow)
                    items.push({
                        label: `и ещё ${diff}`,
                        value: null,
                        link: 'javascript:void(0)',
                    })
                }

                $.each(items, function (index, item) {
                    self._renderItemData(ul, item)
                })
            }
        }
    }

    handleClick (e) {
        e.preventDefault()

        e.target.value = ''
    }

    render () {

        const {
            source,
            onSelect,
            minLength,
            maxItemsToShow,
            renderItem,
            ...props
        } = this.props

        return <input
            type="text"
            {...props}
            ref="input"
            onClick={this.handleClick.bind(this)}/>
    }
}
