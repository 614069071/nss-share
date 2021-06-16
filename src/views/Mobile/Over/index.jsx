import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import over from "../../../images/over.png";
import "./index.css";

export default class Over extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    return (
      <div className="m-over-wrapper">
        <Header></Header>

        <div className="m-over-container">
          <div className="m-over-img-wrapper">
            <img src={over} alt="" />
          </div>

          <p>你访问的链接已过期</p>
        </div>
      </div>
    );
  }
}

Over.defaultProps = {};

Over.propTypes = {
  data: PropTypes.string,
};
