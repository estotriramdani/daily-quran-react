import React, { Component, Fragment } from "react";

class Login extends Component {
  state = {
    identity: {
      name: "",
      profession: "",
      location: "",
    },
  };

  componentDidMount() {
    if (
      localStorage.getItem("name") ||
      localStorage.getItem("profession") ||
      localStorage.getItem("location")
    ) {
      window.location = "/";
    }
  }

  handleSubmit = () => {
    let name = this.state.identity.name;
    let profession = this.state.identity.profession;
    let location = this.state.identity.location;
    localStorage.setItem("name", name);
    localStorage.setItem("profession", profession);
    localStorage.setItem("location", location);
    this.props.history.push(`/`);
  };

  handleFormChange = (event) => {
    let newIdentity = { ...this.state.identity };
    newIdentity[event.target.name] = event.target.value;
    this.setState({
      identity: newIdentity,
    });
  };

  render() {
    return (
      <Fragment>
        <div className="login-wrapper">
          <div>
            <div className="login-box">
              <h1>Selamat Datang</h1>
              <p>Yuk, isi identitasmu dahulu!</p>
              <input
                type="text"
                placeholder="Nama"
                name="name"
                className="form-control"
                onChange={this.handleFormChange}
              />
              <input
                type="text"
                placeholder="Pekerjaan"
                className="form-control"
                name="profession"
                onChange={this.handleFormChange}
              />
              <select
                className="form-control"
                onChange={this.handleFormChange}
                name="location"
              >
                <option>Pilih Kota Terdekat</option>
                <option value="Bandung" name="location">
                  Bandung
                </option>
                <option value="Jakarta">Jakarta</option>
                <option value="Surabaya">Surabaya</option>
              </select>

              <button className="form-control" onClick={this.handleSubmit}>
                Masuk
              </button>
            </div>
            <div className="footer-login">
              <h1>Daily Prayer</h1>
              <p>
                oleh <span>Esto Triramdani N</span>
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
