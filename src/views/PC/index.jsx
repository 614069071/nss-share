import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
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
      isOver: false, //过期
      shareCode: 0,
      infos: {},
    };
  }

  componentDidMount() {
    const shortKey = window.location.href.split("/").pop();

    axios
      .get(`http://192.168.8.160:8080/getLinkInfoByShort?shortKey=${shortKey}`)
      .then(({ data = {} }) => {
        const { resp_code, datas = {} } = data;
        const { isEnterPassword = "" } = datas || {};

        if (resp_code === 1001 || resp_code === 1002) {
          this.setState({ isOver: true, shareCode: resp_code });

          return;
        }

        if (isEnterPassword) {
          this.setState({
            hasHold: !!isEnterPassword,
            infos: datas,
          });
        } else {
          this.setState({
            hasHold: !!isEnterPassword,
            infos: datas,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // const hasHold = utils.storages.get('hasHold') || false;
  }

  changeHold = () => {
    this.setState({ hasHold: true });

    utils.storages.set("hasHold", true);
  };

  render() {
    // const { hasHold, isOver, isNoHold, change, link, overCode, user } =
    //   this.props;

    const { hasHold, isOver, shareCode, infos } = this.state;

    return (
      <Fragment>
        <Header isHold={hasHold} data={infos}></Header>

        <div className="app-inner-wrapper">
          {isOver ? (
            <Over code={shareCode} />
          ) : hasHold ? (
            <Hold infos={infos} change={this.changeHold} />
          ) : (
            <Colle infos={infos} />
          )}
        </div>

        <Footer></Footer>
      </Fragment>
    );
  }
}
