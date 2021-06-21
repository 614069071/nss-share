import React, { Component } from 'react';
import * as utils from './utils';
import Mobile from './views/Mobile';
import PC from './views/PC';

// 测试一下git tag

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasHold: false,//设置了提取码，是否校验通过
      isNoHold: false, //没有设置提取码
      isMobile: this.isMobile(),
      isOver: false //过期
    };
  }

  componentDidMount() {
    const hasHold = utils.storages.get('hasHold') || false;

    this.setState({ hasHold });
  }

  isMobile = () => {
    const scrren = window.innerWidth || document.documentElement.offsetWidth;
    const reg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
    const isMobile = reg.test(navigator.userAgent) || ('ontouchend' in document.body) || (scrren < 768);

    if (isMobile) {
      document.body.classList.add('m-body');
      document.documentElement.classList.add('m-html');
    }

    return isMobile;
  }

  changeHold = () => {
    this.setState({ hasHold: true });

    utils.storages.set('hasHold', true);
  }

  render() {
    const { isMobile, isNoHold, hasHold, isOver } = this.state;
    const props = { isNoHold, hasHold, isOver, change: this.changeHold };

    return (
      (<div className="app-wrapper">
        {
          isMobile ? <Mobile  {...props} /> : <PC {...props} />
        }
      </div>)
    );
  }
}
