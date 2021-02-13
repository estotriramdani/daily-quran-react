import React, { Component } from "react";

class Navigation extends Component {
  render() {
    return (
      <div className="navigation">
        <div className="item" onClick={this.goToHadith}>
          <span>
            <div className="icon">
              <i className="bi bi-journal-text" />
            </div>
            <p>Hadis</p>
          </span>
        </div>
        <div className="item" onClick={this.goHome}>
          <span>
            <div className="icon">
              <i className="bi bi-house" />
            </div>
            <p>Beranda</p>
          </span>
        </div>
        <div className="item" onClick={this.goToQuran}>
          <span>
            <div className="icon">
              <i className="bi bi-book" />
            </div>
            <p>Alquran</p>
          </span>
        </div>
      </div>
    );
  }
}

export default Navigation;
