import React, { Component } from 'react'
import BlogItem from '../components/BlogItem'

class Blog extends Component {
    render() {
        return (
            <div
                id="content"
                className="fadeInUp">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="padding-10">
                            <BlogItem />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Blog
