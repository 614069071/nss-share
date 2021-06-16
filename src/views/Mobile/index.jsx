import React, { Component } from "react";
import PropTypes from "prop-types";
import Vconsole from "vconsole";
import Colle from "./Colle";
import Hold from "./Hold";
import Over from "./Over";
import "./index.css";

export default class Mobile extends Component {
  componentDidMount() {
    console.log("componentDidMount");

    new Vconsole();
  }

  render() {
    const { isOver, hasHold, isNoHold, change } = this.props;

    return (
      <div className="mobile-wrapper">
        {isOver ? (
          <Over></Over>
        ) : isNoHold ? (
          <Colle></Colle>
        ) : hasHold ? (
          <Colle></Colle>
        ) : (
          <Hold change={change}></Hold>
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
