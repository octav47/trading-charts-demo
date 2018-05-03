/**
 * Created by griga on 11/24/15.
 */

import React from 'react'

import { Dropdown, MenuItem } from 'react-bootstrap'

import { connect } from 'react-redux'

class Footer extends React.Component {
    render() {
        const { config } = this.props.dancers
        const { tracklist } = this.props.player

        // console.log(this.props)

        let info = ''

        if (config !== 'fetching' && config !== 'failed') {
            info =
                <div className="col-xs-3 col-sm-3 text-right pull-right">
                    <div className="txt-color-white inline-block">
                        <Dropdown id="footer-dropdown" className="btn-group dropup">
                            <Dropdown.Toggle className="btn btn-xs dropdown-toggle bg-color-blue txt-color-white">
                                <i className="fa fa-link"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu pull-right text-left">
                                <MenuItem>
                                    <div className="padding-5">
                                        <p className="txt-color-darken font-sm no-margin">
                                            Обновление базы танцоров
                                        </p>
                                        <p className="txt-color-green font-sm no-margin">
                                            {config.lastCompetition.date}
                                        </p>
                                        {/*<div className="progress progress-micro no-margin">*/}
                                        {/*<div className="progress-bar progress-bar-success"*/}
                                        {/*style={{ width: 50 + '%' }}></div>*/}
                                        {/*</div>*/}
                                    </div>
                                </MenuItem>
                                <MenuItem divider/>
                                <MenuItem>
                                    <div className="padding-5">
                                        <p className="txt-color-darken font-sm no-margin">
                                            Треков в плеере
                                        </p>
                                        <p className="txt-color-green font-sm no-margin">
                                            {tracklist.length}
                                        </p>
                                    </div>
                                </MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
        }

        return (
            <div className="page-footer">
                <div className="row">
                    <div className="col-xs-8 col-sm-8">
                        <span className="txt-color-white">Radio Hustle © 2015-{(new Date()).getFullYear()}</span>
                    </div>

                    {info}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { dancersReducer, playerReducer } = state;

    return {
        ...state
    };
}

export default connect(mapStateToProps)(Footer)
