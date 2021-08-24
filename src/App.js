import React, { Component } from 'react';
import axios from "axios";
import * as utils from './utils';
import Mobile from './views/Mobile';
import PC from './views/PC';
import "plyr/dist/plyr.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasHold: false,//设置了提取码，是否校验通过
      isNoHold: false, //没有设置提取码
      isMobile: this.isMobile(),
      isOver: false, //过期
      shareCode: 0,
      link: ''
    };
  }

  componentDidMount() {
    axios
      .get("http://192.168.8.160:8080/getLinkInfoByShort?shortKey=yiEJja")
      .then(({ data = {} }) => {
        const { resp_code, datas = {} } = data;
        const { isEnterPassword = '', url = '' } = datas || {};


        if (resp_code === 1001 || resp_code === 1002) {
          this.setState({ isOver: true, shareCode: resp_code });

          return;
        }

        if (isEnterPassword) {
          this.setState({ isNoHold: !!isEnterPassword, link: url });
        } else {
          this.setState({ isNoHold: !!isEnterPassword, hasHold: true, link: url });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // const hasHold = utils.storages.get('hasHold') || false;

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
    const { isMobile, isNoHold, hasHold, isOver, link, shareCode } = this.state;
    const props = { isNoHold, hasHold, isOver, change: this.changeHold, link, overCode: shareCode };

    return (
      (<div className="app-wrapper">
        {
          isMobile ? <Mobile  {...props} /> : <PC {...props} />
        }
      </div>)
    );
  }
}
