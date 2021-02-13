import React, { Component, Fragment } from "react";
import QuranCard from "../../../component/QuranCard/QuranCard";

class Alquran extends Component {
  state = {
    surah: [],
  };

  goToHadith = () => {
    this.props.history.push("/hadis");
  };
  goToQuran = () => {
    this.props.history.push("/alquran");
  };
  goHome = () => {
    this.props.history.push("/");
  };

  componentDidMount() {
    this.getSurah();
  }

  getSurah = () => {
    fetch("http://localhost/dyer-app-api/api/quran/surah-list.php")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          surah: res,
        });
      });
    console.log(this.state.surah);
  };

  handleDetail = (id) => {
    this.props.history.push(`/alquran/${id}`);
  };

  render() {
    return (
      <Fragment>
        <div className="quran-wrapper">
          <div className="search-box">
            <form>
              <input type="text" placeholder="Masukkan Nomor/Nama Surat" />
              <button className="search-button">
                <i className="bi bi-search" />
              </button>
            </form>
          </div>
          <div className="item-wrapper">
            {this.state.surah.map((surah) => {
              return (
                <QuranCard
                  key={surah.id}
                  data={surah}
                  goDetail={this.handleDetail}
                />
              );
            })}
          </div>
        </div>

        {/* navigation */}
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
      </Fragment>
    );
  }
}

export default Alquran;
