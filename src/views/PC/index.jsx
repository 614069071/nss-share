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
      hasHold: false, //设置了提取码，是否校验通过
      isNoHold: false, //没有设置提取码
      isOver: false, //过期
      shareCode: 0,
      link: "",
      user: {},
      shareKey: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://192.168.8.160:8080/getLinkInfoByShort?shortKey=i6zyYb")
      .then(({ data = {} }) => {
        const { resp_code, datas = {} } = data;
        const {
          isEnterPassword = "",
          url = "",
          key = "",
          ...other
        } = datas || {};

        if (resp_code === 1001 || resp_code === 1002) {
          this.setState({ isOver: true, shareCode: resp_code });

          return;
        }

        if (isEnterPassword) {
          this.setState({
            isNoHold: !!isEnterPassword,
            link: url,
            shareKey: key,
            user: other,
          });
        } else {
          this.setState({
            isNoHold: !!isEnterPassword,
            hasHold: true,
            link: url,
            shareKey: key,
            user: other,
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

    const { isNoHold, hasHold, isOver, link, shareCode, user, shareKey } =
      this.state;

    return (
      <Fragment>
        <Header isHold={hasHold} data={user}></Header>

        <div className="app-inner-wrapper">
          {isOver ? (
            <Over code={shareCode} />
          ) : isNoHold ? (
            <Colle link={link} user={user} shareKey={shareKey} />
          ) : hasHold ? (
            <Colle link={link} user={user} shareKey={shareKey} />
          ) : (
            <Hold change={this.changeHold} />
          )}
        </div>

        <Footer></Footer>
      </Fragment>
    );
  }
}

PC.defaultProps = {
  hasHold: false,
  isOver: false,
  isNoHold: false,
  link: "",
  change: () => {},
};

PC.propTypes = {
  hasHold: PropTypes.bool,
  isOver: PropTypes.bool,
  isNoHold: PropTypes.bool,
  link: PropTypes.string,
  change: PropTypes.func,
};
