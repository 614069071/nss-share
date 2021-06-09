import React from "react";
import PropTypes from "prop-types";
import logo from "../../images/logo.png";
import "./index.css";

// 有效期、提取密码配置页
export default class Hold extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    return (
      <div className="hold-view-wrapper">
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

        {/* 输入提取码 */}
        <div className="hold-container-wrapper ps-center">
          <div className="hold-head-wrapper">
            <div className="hold-avator-wrapper">
              <img
                src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1593547847,1664926781&fm=26&gp=0.jpg"
                alt=""
              />
            </div>
            <div className="hold-user">刘昊然的分享</div>
          </div>

          <div className="hold-main-wrapper">
            <p>请输入文件提取码</p>
            <div className="hold-password-wrapper">
              <input type="password" maxLength="4" />
              <button>提取文件</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Hold.defaultProps = {};

Hold.propTypes = {
  data: PropTypes.string,
};
