import React, { Component, Fragment } from "react";
import PrayerTime from "../../../component/PrayerTime/PrayerTime";
import "../../../assets/main.css";

export default class Beranda extends Component {
  state = {
    identity: {
      name: localStorage.getItem("name"),
      location: localStorage.getItem("location"),
      profession: localStorage.getItem("profession"),
    },
    time: {
      jam: 0,
      menit: 0,
      tanggalFull: "",
      hari: "",
      bulan: "",
      tanggal: 0,
      bulanAngka: 0,
      tahun: 0,
    },
    prayerTime: [],
  };

  componentDidMount() {
    if (
      !localStorage.getItem("name") &&
      !localStorage.getItem("profession") &&
      !localStorage.getItem("location")
    ) {
      window.location = "/login";
    }

    this.time();
  }

  time = () => {
    let waktu = new Date();
    let jam = waktu.getHours();
    let menit = waktu.getMinutes();
    let tanggal = waktu.getDate();
    let bulan = waktu.getMonth();
    let tahun = waktu.getFullYear();
    let tanggalFull = `${tahun + 1}-${bulan + 1}-${tanggal}`;
    let day = "";
    let month = "";
    switch (new Date().getDay()) {
      case 0:
        day = "Minggu";
        break;
      case 1:
        day = "Senin";
        break;
      case 2:
        day = "Selasa";
        break;
      case 3:
        day = "Rabu";
        break;
      case 4:
        day = "Kamis";
        break;
      case 5:
        day = "Jumat";
        break;
      default:
        day = "Sabtu";
    }

    switch (bulan) {
      case 0:
        month = "Januari";
        break;
      case 1:
        month = "Februari";
        break;
      case 2:
        month = "Maret";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "Mei";
        break;
      case 5:
        month = "Juni";
        break;
      case 6:
        month = "Juli";
        break;
      case 7:
        month = "Agustus";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "Oktober";
        break;
      case 10:
        month = "November";
        break;
      default:
        month = "Desember";
    }

    let newTime = {
      jam: jam,
      menit: menit,
      tanggalFull: tanggalFull,
      hari: day,
      bulan: month,
      tanggal: tanggal,
      bulanAngka: bulan,
      tahun: tahun,
    };
    this.getPrayerTime(tanggalFull);

    this.setState({
      time: newTime,
    });
  };

  getPrayerTime = (tanggal) => {
    fetch(
      `https://api.pray.zone/v2/times/day.json?city=${this.state.identity.location.toLocaleLowerCase()}&date=${tanggal}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          prayerTime: res.results.datetime[0].times,
        });
        console.log(this.state.prayerTime["Imsak"]);
      });
  };

  handleLogout = () => {
    localStorage.setItem("name", "");
    localStorage.setItem("location", "");
    localStorage.setItem("profession", "");
    this.props.history.push("/login");
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

  render() {
    return (
      <Fragment>
        <div className="home-wrapper">
          <div className="header">
            <div className="user">
              <div className="name">{this.state.identity.name}</div>
              <div className="proffesion">{this.state.identity.profession}</div>
            </div>
            <div className="is-you">
              Bukan Anda? <br />
              <span onClick={this.handleLogout}>Logout</span>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="card">
              <div className="top-section">
                <div className="title">
                  <p>Waktu Sekarang</p>
                </div>
                <div className="subtitle">
                  <p>{this.state.identity.location}</p>
                </div>
              </div>
              <div className="body-section time-widget">
                <div className="time">
                  <h1>
                    {this.state.time.jam}:{this.state.time.menit}
                  </h1>
                </div>
                <div className="separator" />
                <div className="date">
                  <div className="day">{this.state.time.hari}</div>
                  <div className="gregorian">
                    {this.state.time.tanggal} {this.state.time.bulan}
                    {this.state.time.tahun}
                  </div>
                  <div className="hijh">
                    <small>Indonesia/Asia</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="top-section">
                <div className="title">
                  <p>Jadwal Salat</p>
                </div>
                <div className="subtitle">
                  <p>
                    {this.state.time.tanggal} {this.state.time.bulan}{" "}
                    {this.state.time.tahun}
                  </p>
                </div>
                <div className="source">Sumber: Kemenag RI</div>
              </div>
              <div className="body-section prayer-widget">
                <PrayerTime waktu="Subuh" jam={this.state.prayerTime["Fajr"]} />
                <PrayerTime
                  waktu="Zuhur"
                  jam={this.state.prayerTime["Dhuhr"]}
                />
                <PrayerTime waktu="Asar" jam={this.state.prayerTime["Asr"]} />
                <PrayerTime
                  waktu="Magrib"
                  jam={this.state.prayerTime["Maghrib"]}
                />
                <PrayerTime waktu="Isya" jam={this.state.prayerTime["Isha"]} />
              </div>
            </div>
            <div className="card">
              <div className="top-section">
                <div className="title">
                  <p>Pustaka / Referensi</p>
                </div>
                <div className="subtitle">
                  <p>Hadis / Alquran</p>
                </div>
              </div>
              <div className="body-section reference-widget">
                <div className="btn-reference-group">
                  <div className="btn-reference" onClick={this.goToQuran}>
                    <span>Alquran (Rilis Kemenag)</span>
                  </div>
                  <div className="btn-reference" onClick={this.goToHadith}>
                    <span>Hadis (Sahih Bukhari)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
