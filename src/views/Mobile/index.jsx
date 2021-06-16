import React, { Component } from "react";
import PropTypes from "prop-types";
import Vconsole from "vconsole";
import Colle from "./Colle";
import Hold from "./Hold";

import over from "../../images/over.png";
import "./index.css";

export default class Mobile extends Component {
  componentDidMount() {
    console.log("componentDidMount");

    new Vconsole();
  }

  render() {
    const { isOver, hasHold, isNoHold } = this.props;

    return (
      <div className="mobile-wrapper">
        {isOver ? (
          <div className="m-over-wrapper">
            <div className="m-over-img-wrapper">
              <img src={over} alt="" />
            </div>

            <p>你访问的链接已过期</p>
          </div>
        ) : isNoHold ? (
          <Colle></Colle>
        ) : hasHold ? (
          <Colle></Colle>
        ) : (
          <Hold></Hold>
        )}
      </div>
    );
  }
}

Mobile.defaultProps = {
  hasHold: false, //设置了提取码，待验证
  isNoHold: false, //没有设置提取码
  isOver: false, //过期
};

Mobile.propTypes = {
  hasHold: PropTypes.bool, //设置了提取码，待验证
  isNoHold: PropTypes.bool, //没有设置提取码
  isOver: PropTypes.bool, //过期
};
