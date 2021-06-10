import React, { Component } from 'react';
import Header from './components/header'
import Footer from './components/footer'
import Colle from './views/Colle';
import Hold from './views/Hold';
import * as utils from './utils';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasHold: false,//设置了提取码，待验证
      isNoHold: false //没有设置提取码
    };
  }

  componentDidMount() {
    const hasHold = utils.storages.get('hasHold') || false;

    this.setState({ hasHold });
  }

  changeHold = () => {
    this.setState({ hasHold: true });

    utils.storages.set('hasHold', true);
  }

  render() {
    const { isNoHold, hasHold } = this.state;

    return (
      <div className="app-wrapper">
        <Header isHold={hasHold}></Header>

        <div className="app-inner-wrapper">
          {
            isNoHold ? <Colle /> : (hasHold ? <Colle /> : <Hold change={this.changeHold} />)
          }
        </div>

        <Footer></Footer>
      </div>
    );
  }
}
