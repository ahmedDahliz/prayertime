import React, { Component } from 'react'

class ListNav extends Component {
  render () {
    return (
      <div className="navbar-fixed">
      <nav className="deep-orange darken-4">
        <div className="nav-wrapper">
          <a href="#" className="brand-logo right">PrayerTime</a>
          <ul id="nav-mobile" className="left">
            <li><a href="sass.html">Today Time</a></li>
            <li><a href="badges.html">Weekly Time</a></li>
            <li><a href="collapsible.html">Settings</a></li>
          </ul>
        </div>
      </nav>
     </div>
    )
  }
}

export default ListNav
