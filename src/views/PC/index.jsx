import React, { Component, Fragment } from "react";
import axios from "axios";
import * as utils from "../../utils";
import Over from "./Over";
import Header from "./Header";
import Footer from "./Footer";
import Colle from "./Colle";
import Hold from "./Hold";

export default class PC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasHold: false, //是否校验通过
      isNoHold: false, //是否设置了密码
      isOver: false, //过期
      shareCode: 0,
      infos: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    const hasHoldInfos = utils.storages.get("hasHold");
    const shortKey = window.location.href.split("/").pop();

    axios
      .get(`http://192.168.8.160:8080/getLinkInfoByShort?shortKey=${shortKey}`)
      .then(({ data = {} }) => {
        const { resp_code, datas = {} } = data;
        const { isEnterPassword = "" } = datas || {};
        const { key, url } = hasHoldInfos;
        const new_infos = Object.assign(
          {},
          datas,
          isEnterPassword ? { key, url } : {}
        );

        this.setState({ isLoading: false });

        if (resp_code === 1001 || resp_code === 1002) {
          this.setState({ isOver: true, shareCode: resp_code });

          return;
        }

        this.setState({
          hasHold: !!hasHoldInfos,
          isNoHold: !isEnterPassword,
          infos: new_infos,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // const hasHold = utils.storages.get('hasHold') || false;
  }

  changeHold = (data) => {
    const infos = Object.assign({}, this.state.infos, data);
    this.setState({ hasHold: true, infos });
    utils.storages.set("hasHold", data);
  };

  render() {
    const { isLoading, isNoHold, hasHold, isOver, shareCode, infos } =
      this.state;

    return (
      <Fragment>
        <Header isHold={hasHold} data={infos}></Header>

        {isLoading ? null : (
          <>
            <div className="app-inner-wrapper">
              {isOver ? (
                <Over code={shareCode} />
              ) : hasHold || isNoHold ? (
                <Colle infos={infos} />
              ) : (
                <Hold infos={infos} change={this.changeHold} />
              )}
            </div>
            <Footer></Footer>
          </>
        )}
      </Fragment>
    );
  }
}
