import React from 'react'

import { Dropdown, MenuItem } from 'react-bootstrap'

import { connect } from 'react-redux'

class Footer extends React.Component {
    render() {
        return (
            <div className="page-footer">
                <div className="row">
                    <div className="col-xs-8 col-sm-8">
                        <span className="txt-color-white">trading charts demo © {(new Date()).getFullYear()}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer
