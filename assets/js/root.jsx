import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
// import logo from './'
import Facebook from './components/Facebook';



export default function root_init(node) {
  ReactDOM.render(<Root /> ,node);
}

class Root extends Component {
  render() {
    <div className="container">
      <Facebook />
    </div>
  }
}
