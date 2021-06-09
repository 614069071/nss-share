import React, { Component } from 'react';
import Colle from './views/Colle';
// import Hold from './views/Hold';
import * as utils from './utils';

console.log(utils.mimeType('txt'));


// console.log(Hold);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    return (
      <div>
        <Colle></Colle>
      </div>
    );
  }
}
