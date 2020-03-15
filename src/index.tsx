import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class App extends Component {

  render() {
    return <div>hello</div>
  }
}

ReactDom.render(
  <App></App>,
  document.querySelector('#root')
);

