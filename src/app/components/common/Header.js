/**
 * Created by griga on 11/17/15.
 */
import React from "react"
import FullScreen from "./FullScreen"
import ToggleMenu from "./ToggleMenu"

import * as projectInformation from '../../../../package.json'

export default class Header extends React.Component {
    render() {
        return <header id="header">
            <div className="font-xl text-align-center" style={{
                position: 'relative'
            }}>
                Trading Charts
            </div>
            <div className="pull-right"  /*pulled right: nav area*/ >


                <ToggleMenu className="btn-header pull-right"/>

                {/* #MOBILE */}
                {/*  Top menu profile link : this shows only when top menu is active */}
                {/*<ul id="mobile-profile-img" className="header-dropdown-list hidden-xs padding-5">*/}
                    {/*<li className="">*/}
                        {/*<a className="dropdown-toggle no-margin userdropdown" data-toggle="dropdown">*/}
                            {/*<img src="assets/img/avatars/sunny.png" alt="John Doe" className="online"/>*/}
                        {/*</a>*/}
                        {/*<ul className="dropdown-menu pull-right">*/}
                            {/*<li>*/}
                                {/*<a className="padding-10 padding-top-0 padding-bottom-0"><i*/}
                                    {/*className="fa fa-cog"/> Setting</a>*/}
                            {/*</li>*/}
                            {/*<li className="divider"/>*/}
                            {/*<li>*/}
                                {/*<a href="#/views/profile"*/}
                                   {/*className="padding-10 padding-top-0 padding-bottom-0"> <i className="fa fa-user"/>*/}
                                    {/*<u>P</u>rofile</a>*/}
                            {/*</li>*/}
                            {/*<li className="divider"/>*/}
                            {/*<li>*/}
                                {/*<a className="padding-10 padding-top-0 padding-bottom-0"*/}
                                   {/*data-action="toggleShortcut"><i className="fa fa-arrow-down"/> <u>S</u>hortcut</a>*/}
                            {/*</li>*/}
                            {/*<li className="divider"/>*/}
                            {/*<li>*/}
                                {/*<a className="padding-10 padding-top-0 padding-bottom-0"*/}
                                   {/*data-action="launchFullscreen"><i className="fa fa-arrows-alt"/> Full*/}
                                    {/*<u>S</u>creen</a>*/}
                            {/*</li>*/}
                            {/*<li className="divider"/>*/}
                            {/*<li>*/}
                                {/*<a href="#/login" className="padding-10 padding-top-5 padding-bottom-5"*/}
                                   {/*data-action="userLogout"><i*/}
                                    {/*className="fa fa-sign-out fa-lg"/> <strong><u>L</u>ogout</strong></a>*/}
                            {/*</li>*/}
                        {/*</ul>*/}
                    {/*</li>*/}
                {/*</ul>*/}

                {/* logout button */}
                {/*<div id="logout" className="btn-header transparent pull-right">*/}
                    {/*<span> <a href="#/login" title="Sign Out"*/}
                              {/*data-logout-msg="You can improve your security further after logging out by closing this opened browser"><i*/}
                        {/*className="fa fa-sign-out"/></a> </span>*/}
                {/*</div>*/}

                <FullScreen className="btn-header transparent pull-right"/>

            </div>
            {/* end pulled right: nav area */}


        </header>
    }
}
