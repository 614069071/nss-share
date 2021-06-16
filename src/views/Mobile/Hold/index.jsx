import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import "./index.css";

export default class Hold extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    return (
      <div className="m-hold-view-wrapper">
        <Header></Header>

        <div className="m-hold-wrapper">
          <div>
            <input type="text" placeholder="请输入文件提取码" maxLength="4" />
          </div>
          <p>密码错误，请重新输入</p>
          <button className="m-button">提取文件</button>
        </div>
      </div>
    );
  }
}

Hold.defaultProps = {};

Hold.propTypes = {
  data: PropTypes.string,
};
