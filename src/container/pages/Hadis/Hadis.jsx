import React, { Component, Fragment } from "react";
import HadisCard from "../../../component/HadisCard/HadisCard";
import "./Hadis.css";
import "../../../assets/main.css";

class Hadis extends Component {
  state = {
    hadis: [],
    keyword: "...",
    limit: 5,
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
  }

  handleSearch = () => {
    fetch(
      `http://penerbit-ejbooks.my.id/dyer/api/hadis/cari.php?keyword=${this.state.keyword}&limit=${this.state.limit}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          hadis: res,
        });
      });
  };

  handleChangeKeyword = (event) => {
    let newKeyword = { ...this.state.keyword };
    newKeyword = event.target.value;
    this.setState({
      keyword: newKeyword,
    });
    this.handleSearch();
  };

  handleChangeLimit = (event) => {
    let newLimit = event.target.value;
    fetch(
      `http://penerbit-ejbooks.my.id/dyer/api/hadis/cari.php?keyword=${this.state.keyword}&limit=${newLimit}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          hadis: res,
          limit: newLimit,
        });
      });
  };

  render() {
    return (
      <Fragment>
        <div className="hadis-wrapper">
          <div className="search-box">
            <input
              type="text"
              placeholder="Masukkan topik atau kata kunci lainnya"
              name="keyword"
              onChange={this.handleChangeKeyword}
              autoComplete="of"
              autoFocus
            />
            <button className="search-button" onClick={this.handleSearch}>
              <i className="bi bi-search" />
            </button>
          </div>
          <div className="limit">
            <input
              type="number"
              placeholder="Batasi hasil pencarian (maks. 8007)"
              name="limit"
              onChange={this.handleChangeLimit}
            />
          </div>
          <div className="content-hadith">
            {this.state.hadis.length > 0 ? (
              <h1>Hasil Pencarian ({`${this.state.limit} hasil`})</h1>
            ) : (
              <h1>Silakan masukan kata kunci</h1>
            )}

            <div className="item-wrapper">
              {this.state.hadis.map((hadis) => {
                return <HadisCard key={hadis.no} data={hadis} />;
              })}
            </div>
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

export default Hadis;
