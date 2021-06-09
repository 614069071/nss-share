import React from "react";
import PropTypes from "prop-types";
import Header from "../../components/header";
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
      <div className="colle-view-wrapper">
        <Header></Header>

        <div className="colle-control-wrapper">
          <div className="colle-control-left">
            <span>总共11个文件</span>
            <span className="share-failure-title">失效时间：</span>
            <span className="share-failure-state">已失效</span>
          </div>

          <div className="colle-control-right">
            <button>下载</button>
          </div>
        </div>

        <div className="colle-list-wrapper">
          <div className="colle-list-inner">
            <div className="colle-bread-wrapper">
              <div className="colle-back-btn">返回</div>
              <div className="colle-all-btn">全部文件</div>
              <div className="colle-bread-list-wrapper">
                {["文件夹1", "文件夹2"].map((e, i) => (
                  <span key={i}>
                    <i>&gt;</i>
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <div className="colle-check-wrapper">
              <div className="colle-check-control-wrapper file-info">
                <input type="checkbox" />
                <div className="check-sum">
                  已选中<span>2</span>个文件/文件夹
                </div>
                <button className="all-download-btn button plain">下载</button>
              </div>
              <div className="file-size">文件大小</div>
              <div className="file-share-time">分享时间</div>
            </div>

            {/* 文件列表 */}
            <div className="file-list-wrapper">
              {[1, 2, 3].map((e) => (
                <div className="file-item-wrapper" key={e}>
                  <div className="file-info">
                    <input type="checkbox" />
                    <div className="file-icon"></div>
                    <div className="file-name">文件夹</div>
                  </div>

                  <div className="file-size">
                    <span>1.25M</span>
                    <span className="file-download-btn">下载</span>
                  </div>
                  <div className="file-share-time">2021-01-12 11:07</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Colle.defaultProps = {};

Colle.propTypes = {
  data: PropTypes.string,
};
