import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "../../../images/logo.png";
import "./index.css";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    return (
      <header className="m-app-header-wrapper">
        <div className="m-app-header-inner">
          <div
            className="m-header-avator-wrapper"
            style={{ backgroundImage: `url(${logo})` }}
          ></div>
        </div>

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
      </header>
    );
  }
}

Header.defaultProps = {};

Header.propTypes = {
  data: PropTypes.string,
};
