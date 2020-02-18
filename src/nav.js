import React, { Component } from 'react'

class ListNav extends Component {
  render () {
    return (
      <div className="navbar-fixed">
      <nav className="deep-orange darken-4">
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="left">
            <li><a href="sass.html">Timings</a></li>
            <li><a href="collapsible.html">Settings</a></li>
          </ul>
          <a href="#" className="brand-logo right">PrayerTime</a>
        </div>
      </nav>
     </div>
    )
  }
}

export default ListNav
