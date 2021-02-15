import React, { Component, Fragment } from "react";
import QuranCard from "../../../component/QuranCard/QuranCard";
import "../../../assets/main.css";

class Alquran extends Component {
  state = {
    surah: [],
    keyword: "",
    url: "http://penerbit-ejbooks.my.id/dyer-app-api",
    errorMessage: "",
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
    if (
      !localStorage.getItem("name") ||
      !localStorage.getItem("profession") ||
      !localStorage.getItem("location")
    ) {
      window.location = "/login";
    }
    this.getSurah();
  }

  getSurah = () => {
    fetch(this.state.url + "/api/quran/surah-list.php")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          surah: res,
        });
      });
  };

  handleDetail = (id, surat_name, jumlah_ayat, terjemah) => {
    this.props.history.push(`/alquran/${id}`);
    localStorage.setItem("surat_name", surat_name);
    localStorage.setItem("jumlah_ayat", jumlah_ayat);
    localStorage.setItem("surat_terjemah", terjemah);
  };

  handleChangeKeyword = (event) => {
    let newKeyword = event.target.value;
    this.setState({
      keyword: newKeyword,
    });
    console.log(this.state.keyword);
    this.handleSearch(newKeyword);
  };

  handleSearch = (keyword) => {
    fetch(this.state.url + "/api/quran/find-surah.php?keyword=" + keyword)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          surah: res,
          errorMessage: "",
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          errorMessage: `Pastikan ejaan sudah sesuai`,
          surah: [{}, {}, {}],
        });
      });
  };

  render() {
    return (
      <Fragment>
        <div className="quran-wrapper">
          <div className="search-box">
            <input
              type="text"
              placeholder="Masukkan Nomor/Nama Surat"
              onChange={this.handleChangeKeyword}
              name="keyword"
              autoComplete="of"
              autoFocus
            />
            <button className="search-button">
              <i className="bi bi-search" />
            </button>
          </div>
          <div className="item-wrapper">
            <div style={{ marginBottom: "10px", color: "orange" }}>
              {this.state.errorMessage}
            </div>
            {this.state.surah
              ? this.state.surah.map((surah) => {
                  return (
                    <QuranCard
                      key={surah.id}
                      data={surah}
                      goDetail={this.handleDetail}
                    />
                  );
                })
              : this.state.errorMessage}
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
