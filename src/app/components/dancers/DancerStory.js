import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { StickyContainer, Sticky } from 'react-sticky'

class DancerStory extends React.Component {
    static propTypes = {
        story: PropTypes.array.isRequired,
    }

    state = {
        showOnlyOfficial: false,
    }

    storyColors = [
        '#dff0d8',
        '#d9edf7',
        '#fcf8e3',
        '#f2dede',
        '#f9e5ff',
    ]

    handleTriggerOnlyOfficial = e => {
        console.log(e.target.checked)
        let { showOnlyOfficial } = this.state

        showOnlyOfficial = !showOnlyOfficial

        this.setState({
            showOnlyOfficial,
        })
    }

    getTitleCase = string => {
        const excluded = ['по', 'хастлу', 'дискофоксу']
        const splitted = string
            .toLowerCase()
            .split(/\s+/g)

        return splitted.map(e => {
            if (excluded.indexOf(e) === -1) {
                return e.charAt(0)
                    .toUpperCase() + e.slice(1)
            }

            return e
        })
            .join(' ')
    }

    getDancerStory = story => {
        const { showUnofficial } = this.props
        let w = []

        story.forEach((e, i) => {
            if (e != '') {
                const {
                    date,
                    compname,
                    city,
                    level,
                    points,
                    resultfull,
                    partner_code,
                    partner_name_short,
                    isofficial,
                    // points,
                } = e

                let background = ''

                if (isofficial) {
                    if ((level === 'E' || level === 'BG') && points > 0) {
                        background = this.storyColors[0]
                    } else if ((level === 'D' || level === 'RS') && points > 0) {
                        background += this.storyColors[1]
                    } else if ((level === 'C' || level === 'M') && points > 0) {
                        background += this.storyColors[2]
                    } else if ((level === 'B' || level === 'S') && points > 0) {
                        background += this.storyColors[3]
                    } else if ((level === 'A' || level === 'CH') && points > 0) {
                        background += this.storyColors[4]
                    }
                }

                let prettyName = this.getTitleCase(compname)
                    .replace(/([a-z])([0-9A-Z])/g, '$1 $2')
                    .replace(/([а-я])([0-9А-Я])/g, '$1 $2')

                const partnerBlock = partner_name_short ?
                    (
                        <span
                            style={{
                                fontStyle: 'italic',
                            }}>
                            <br/>
                            Партнёр: {(partner_code !== '00000' && partner_code.toLowerCase() !== 'дебют') ?
                            <Link to={`/dancers/${partner_code}`} target="_blank">
                                {partner_name_short}
                            </Link> : partner_name_short}
                        </span>
                    ) : null

                w.push(
                    <tr
                        key={i}
                        className={showUnofficial || isofficial ? '' : 'unofficial'}
                        style={{
                            background,
                        }}>
                        <td>
                            <div
                                style={{
                                    width: '75px',
                                }}>
                                {date}
                            </div>
                        </td>
                        <td>
                            {prettyName}{city ? `, ${city}` : null}
                            {partnerBlock}
                        </td>
                        <td>
                            <div
                                style={{
                                    float: 'right',
                                    width: '50px',
                                    textAlign: 'right',
                                }}>
                                {resultfull}
                                {isofficial ? null :
                                    (
                                        <span>
                                            <br/>
                                            {showUnofficial ? null : (
                                                <i>неофиц.</i>
                                            )}
                                        </span>
                                    )}
                            </div>
                        </td>
                    </tr>,
                )
            }
        })

        return w
    }

    render () {
        const { showOnlyOfficial } = this.state
        const { type, story, showUnofficial } = this.props

        const stickyToolbar = showUnofficial ? null : (
            <Sticky>
                {({
                      style,
                      isSticky,
                  }) => (
                    <section
                        className="col col-lg-12 col-md-12 col-sm-12 col-xs-12"
                        style={{
                            ...style,
                            marginBottom: 0,
                            padding: '8px',
                            borderBottom: isSticky ? '1px solid #ddd' : 'none',
                            background: '#ffffff',
                        }}>
                        <div className="smart-form">
                            <label
                                className="toggle"
                                style={{
                                    fontSize: '10px',
                                }}>
                                <input
                                    type="checkbox"
                                    name={`toggle-official-${type}`}
                                    defaultChecked={true}
                                    onChange={this.handleTriggerOnlyOfficial}/>
                                <i
                                    data-swchon-text="ДА"
                                    data-swchoff-text="НЕТ"/>
                                Показать неофициальные результаты
                            </label>
                        </div>
                    </section>
                )}
            </Sticky>
        )

        return (
            <div className="table no-padding">
                <StickyContainer>
                    {stickyToolbar}
                    <table
                        className={`table ${showOnlyOfficial ? 'only-official' : ''}`}
                        style={{
                            fontSize: '10px',
                        }}>
                        <tbody>
                        {this.getDancerStory(story)}
                        </tbody>
                    </table>
                </StickyContainer>
            </div>
        )
    }
}

export default DancerStory
