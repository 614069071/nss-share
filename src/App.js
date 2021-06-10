import React, { Component } from 'react';
import Header from './components/header'
import Footer from './components/footer'
import Colle from './views/Colle';
import Hold from './views/Hold';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHold: true,//设置了提取码，待验证
      isNoHold: false //没有设置提取码
    };
  }

  componentDidMount() { }

  changeHold = () => {
    this.setState({ isHold: false });
  }

  render() {
    const { isNoHold, isHold } = this.state;

    return (
      <div className="app-wrapper">
        <Header></Header>

        <div className="app-inner-wrapper">
          {
            isNoHold ? <Colle /> : (isHold ? <Hold change={this.changeHold} /> : <Colle />)
          }
        </div>

        <Footer></Footer>
      </div>
    );
  }
}
