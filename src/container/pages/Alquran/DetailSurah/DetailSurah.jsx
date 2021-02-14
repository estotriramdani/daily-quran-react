import React, { Component } from "react";
import AyatCard from "../AyatCard/AyatCard";
import "../../../../assets/main.css";

export default class DetailSurah extends Component {
  state = {
    surahId: this.props.match.params.surahId,
    surah: [],
    keyword: "",
  };

  componentDidMount() {
    if (
      !localStorage.getItem("name") ||
      !localStorage.getItem("profession") ||
      !localStorage.getItem("location")
    ) {
      window.location = "/login";
    }
    const surahId = this.props.match.params.surahId;
    if (surahId > 114) {
      window.location = "/alquran";
    }
    fetch("http://localhost/dyer-app-api/api/quran/?surah=" + surahId)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          surah: res,
        });
      });
  }

  handleChangeKeyword = (event) => {
    let newKeyword = event.target.value;
    this.setState({
      keyword: newKeyword,
    });
    this.handleSearchVerse(newKeyword);
  };

  handleSearchVerse = (keyword) => {
    fetch(
      `http://localhost/dyer-app-api/api/quran/ayat.php?surah=${this.state.surahId}&ayat=${keyword}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          surah: res,
        });
      });
  };

  goToQuran = () => {
    this.props.history.push("/alquran");
  };
  goHome = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <div className="container detail-quran-wrapper">
          <div className="header-detail">
            <div className="btn-back" onClick={this.goToQuran}>
              <span>
                <i className="icon bi bi-arrow-left-circle" />
              </span>
            </div>
            <div className="surah">
              <p className="title">{localStorage.getItem("surat_name")}</p>
              <p className="translation">
                {localStorage.getItem("surat_terjemah")} -{" "}
                {localStorage.getItem("jumlah_ayat")} Ayat
              </p>
            </div>
            <div className="btn-back" onClick={this.goHome}>
              <span>
                <i className="icon bi bi-house" />
              </span>
            </div>
          </div>
          <div className="item-wrapper">
            {this.state.surah.map((surah) => {
              return <AyatCard key={surah.id} data={surah} />;
            })}
          </div>
          <div className="jump-verse">
            <input
              type="number"
              placeholder="Masukkan ayat"
              name="keyword"
              onChange={this.handleChangeKeyword}
              autoComplete="of"
              autoFocus
            />
            {/* <button>
              <i className="bi bi-search" onClick={this.handleSearchVerse} />
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}
