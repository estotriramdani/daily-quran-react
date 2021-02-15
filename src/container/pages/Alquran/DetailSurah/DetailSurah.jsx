import React, { Component } from "react";
import AyatCard from "../AyatCard/AyatCard";
import "../../../../assets/main.css";

export default class DetailSurah extends Component {
  state = {
    surahId: this.props.match.params.surahId,
    surah: [],
    keyword: "999",
    base_url:
      "https://raw.githubusercontent.com/iqbalsyamhad/Al-Quran-JSON-Indonesia-Kemenag/master",
    errorMessage: "",
    search_result: [],
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
    fetch(this.state.base_url + "/Surat/" + surahId + ".json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          surah: res.data,
        });
      });
    localStorage.setItem("fontSize", "30");
  }

  handleChangeKeyword = (event) => {
    let newKeyword = event.target.value - 1;
    this.setState({
      keyword: newKeyword,
    });
    this.handleSearchVerse(newKeyword);
  };

  handleSearchVerse = (keyword) => {
    // fetch(
    //   `http://penerbit-ejbooks.my.id/dyer-app-api/api/quran/ayat.php?surah=${this.state.surahId}&ayat=${keyword}`
    // )
    fetch(`${this.state.base_url}/Surat/${this.state.surahId}.json`)
      .then((res) => res.json())
      .then((res) => {
        if (keyword <= localStorage.getItem("jumlah_ayat")) {
          this.setState({
            search_result: res.data[keyword],
            errorMessage: "",
          });
        } else {
          this.setState({
            errorMessage: `Masukkan Ayat yang valid. Minimal 1 dan maksimal ${localStorage.getItem(
              "jumlah_ayat"
            )}.`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorMessage: `Masukkan Ayat yang valid. Minimal 0 dan maksimal ${localStorage.getItem(
            "jumlah_ayat"
          )}.`,
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
            <div style={{ margin: "10px 0px", color: "orange" }}>
              {this.state.errorMessage}
            </div>
            {this.state.keyword < localStorage.getItem("jumlah_ayat") &&
            this.state.search_result ? (
              <AyatCard data={this.state.search_result} />
            ) : (
              <div
                style={{
                  margin: "10px 0px",

                  backgroundColor: "white",
                  padding: "20px 20px",
                  borderRadius: "10px",
                }}
              >
                Masukkan nomor ayat untuk mencari ayat
              </div>
            )}
            <hr />
            {this.state.surah
              ? this.state.surah.map((surah) => {
                  return <AyatCard key={surah.aya_number} data={surah} />;
                })
              : "Ayat tidak ditemukan"}
          </div>
          <div className="jump-verse">
            <input
              type="number"
              placeholder="Masukkan ayat"
              name="keyword"
              onChange={this.handleChangeKeyword}
              autoComplete="of"
              // autoFocus
              // minLength={1}
              // maxLength={10}
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
