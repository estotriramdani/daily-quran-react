import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Beranda from "../Beranda/Beranda";

class Login extends Component {
  state = {
    name: "",
    location: "",
    profession: "",
  };

  handleSubmit = () => {};

  handleFormChange = () => {};

  render() {
    return (
      <Fragment>
        <div
          className="login-wrapper"
          style={{ paddingBottom: "0px!important" }}
        >
          <div>
            <div className="login-box">
              <h1>Selamat Datang</h1>
              <p>Yuk, isi identitasmu dahulu!</p>
              <input type="text" placeholder="Nama" className="form-control" />
              <input
                type="text"
                placeholder="Pekerjaan"
                className="form-control"
              />
              <select name id className="form-control">
                <option value>Pilih Kota Terdekat</option>
                <option value>Bandung</option>
                <option value>Jakarta</option>
                <option value>Surabaya</option>
              </select>
              <a href="/beranda">
                <button className="form-control" onClick={this.handleSubmit}>
                  Masuk
                </button>
              </a>
            </div>
            <div className="footer-login">
              <h1>Daily Prayer</h1>
              <p>
                oleh{" "}
                <a href="https://estotriramdani.github">Esto Triramdani N</a>
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
