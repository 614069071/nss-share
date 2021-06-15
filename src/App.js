import React, { Component } from 'react';
import * as utils from './utils';
import Mobile from './views/Mobile';
import PC from './views/PC';

export default class App extends Component {
  constructor(props) {
    super(props);

    // 判断移动端
    const scrren = window.innerWidth || document.documentElement.offsetWidth;
    const isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) || ('ontouchend' in document.body) || (scrren < 768);

    this.state = {
      hasHold: false,//设置了提取码，待验证
      isNoHold: false, //没有设置提取码
      isMobile,
      isOver: false //过期
    };
  }

  judgeClient = () => {
    const scrren = window.innerWidth || document.documentElement.offsetWidth;

    this.setState({ isMobile: scrren < 768 }, () => {
      console.log(this.state.isMobile)
    });
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
    const { isMobile, isNoHold, hasHold, isOver } = this.state;
    const props = { isNoHold, hasHold, isOver };

    return (
      (<div className="app-wrapper">
        {
          isMobile ?
            (<Mobile  {...props} />)
            :
            <PC {...props} change={this.changeHold} />
        }
      </div>)
    );
  }
}
