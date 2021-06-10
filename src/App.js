import React, { Component } from 'react';
import Colle from './views/Colle';
// import Hold from './views/Hold';


// console.log(Hold);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() { }

  render() {
    return (
      <div className="app-wrapper">
        <Colle></Colle>
      </div>
    );
  }
}
