import React, { Component } from "react";
import PropTypes from "prop-types";
import Vconsole from "vconsole";
import Colle from "./Colle";
import logo from "../../images/logo.png";
import over from "../../images/over.png";
import "./index.css";

export default class Mobile extends Component {
  componentDidMount() {
    console.log("componentDidMount");

    new Vconsole();
  }

  render() {
    const { isOver, hasHold, isNoHold } = this.props;
    console.log("hasHold", hasHold);

    return (
      <div className="mobile-wrapper">
        <div className="m-inner-wrapper">
          <header className="m-app-header-wrapper">
            <div
              className="m-header-avator-wrapper"
              style={{ backgroundImage: `url(${logo})` }}
            ></div>
          </header>

          <div className="m-share-user-wrapper">
            <div className="m-share-user-inner-wrapper">
              <div className="m-user-image-wrapper">
                <img
                  src="https://dss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/netdisk.1.18ad9bc4.-suxkK7XcG8XVe7JNQGaMg.jpg"
                  alt=""
                />
              </div>
              <div>离子007的分享</div>
            </div>
          </div>

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
            <div className="m-hold-wrapper">
              <div>
                <input
                  type="text"
                  placeholder="请输入文件提取码"
                  maxLength="4"
                />
              </div>
              <p>密码错误，请重新输入</p>
              <button className="m-button">提取文件</button>
            </div>
          )}
        </div>

        {isNoHold || hasHold ? (
          <div className="download-files-wrapper">
            <button className="m-button m-download-button">下载</button>
          </div>
        ) : null}
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
