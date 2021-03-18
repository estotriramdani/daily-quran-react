import React, { Component, Fragment } from 'react';
import Login from '../container/pages/Login/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Beranda from '../container/pages/Beranda/Beranda';
import Hadis from '../container/pages/Hadis/Hadis';
import Alquran from '../container/pages/Alquran/Alquran';
import DetailSurah from '../container/pages/Alquran/DetailSurah/DetailSurah';

export default class Home extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/" exact component={Beranda} />
          <Route path="/login" component={Login} />
          <Route path="/hadis" component={Hadis} />
          <Route path="/alquran" exact component={Alquran} />
          <Route path="/alquran/:surahId" component={DetailSurah} />
        </Fragment>
      </Router>
    );
  }
}
