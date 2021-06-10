import React, { Component } from 'react';
import Header from './components/header'
import Footer from './components/footer'
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
        <Header></Header>

        <div className="app-inner-wrapper">
          <Colle></Colle>
        </div>

        <Footer></Footer>
      </div>
    );
  }
}
