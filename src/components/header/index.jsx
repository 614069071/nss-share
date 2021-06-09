import React from "react";
import PropTypes from "prop-types";
import logo from "../../images/logo.png";
import "./index.css";

// 文件列表
export default class Colle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    return (
      <header className="hold-header-wrapper">
        <div className="hold-item-left">
          <img src={logo} alt="" />
        </div>
        <div className="hold-item-right">
          <div>分享者：</div>
          <div className="header-avator-wrapper">
            <img
              src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1593547847,1664926781&fm=26&gp=0.jpg"
              alt=""
            />
          </div>
          <div>蜘蛛子</div>
        </div>
      </header>
    );
  }
}

Colle.defaultProps = {};

Colle.propTypes = {
  data: PropTypes.string,
};
