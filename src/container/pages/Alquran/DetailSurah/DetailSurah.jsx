import React, { Component } from "react";
import AyatCard from "../AyatCard/AyatCard";

export default class DetailSurah extends Component {
  state = {
    surah: [],
  };

  componentDidMount() {
    const surahId = this.props.match.params.surahId;
    fetch("http://localhost/dyer-app-api/api/quran/?surah=" + surahId)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          surah: res,
        });
      });
  }

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
              <p className="title">Al Fatihah</p>
              <p className="translation">Pembukaan - 7 Ayat</p>
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
            {/* <div className="item">
              <div className="verse">Ayat 1</div>
              <div className="arabic">
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              </div>
              <div className="latin">bismillāhir-raḥmānir-raḥīm</div>
              <div className="translation">
                Segala puji bagi Allah, Tuhan seluruh alam,
              </div>
            </div> */}
          </div>
          <div className="jump-verse">
            <input type="number" placeholder="Masukkan ayat" />
            <button>
              <i className="bi bi-search" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
