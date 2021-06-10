import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Header from "../../components/header";
import * as utils from "../../utils";

// console.log(utils.mimeType('txt'));
import "./index.css";

// 文件列表
export default class Colle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckedHidden: true,
      fileColles: [
        { key: 1, checked: false },
        { key: 2, checked: false },
        { key: 3, checked: false },
      ],
      breadColleArg: ["文件夹1", "文件夹2"], //文件路劲集合
    };
  }

  componentDidMount() {}

  // 请求列表
  fetchFileColles = (data) => {
    console.log("请求列表", data);
  };
  // 全选
  selectAll = (e) => {
    const { checked } = e.target;
    const arr = this.state.fileColles;

    arr.forEach((e) => (e.checked = checked));

    this.setState({ fileColles: arr }, () => {
      console.log(this.state.fileColles);
    });
  };

  //返回
  backChangeBread = () => {
    let arr = this.state.breadColleArg;
    let current = arr.slice(0, arr.length - 1);

    this.setState({ breadColleArg: current });

    this.fetchFileColles("返回");
  };

  // 全部文件
  changeAllBread = () => {
    this.setState({ breadColleArg: [] });
    this.fetchFileColles("全部文件");
  };

  // 切换路径
  checkChangeBread = (item, index) => {
    let arr = this.state.breadColleArg.slice(0, index + 1);

    this.setState({ breadColleArg: arr });
    this.fetchFileColles("切换路径");
  };

  // 处理文件选择
  checkFile = (e, v, i) => {
    let arr = this.state.fileColles;
    arr[i].checked = e.target.checked;

    this.setState({ fileColles: arr });
  };

  // 批量下载
  batchDownloads = () => {
    console.log(this.state.fileColles.filter((e) => e.checked));
  };

  render() {
    const { fileColles, breadColleArg } = this.state;
    const checkedCollenArg = fileColles.filter((e) => e.checked);
    const isCheckAll = checkedCollenArg.length === fileColles.length;

    return (
      <div className="colle-view-wrapper">
        <Header></Header>

        <div className="colle-control-wrapper">
          <div className="colle-control-left">
            <span className="share-failure-sum">总共11个文件</span>
            <span className="share-failure-title">失效时间：</span>
            <span className="share-failure-state">已失效</span>
          </div>

          <div className="colle-control-right">
            <button className="button" onClick={this.batchDownloads}>
              下载
            </button>
          </div>
        </div>

        <div className="colle-list-wrapper">
          <div className="colle-list-inner">
            <div className="colle-bread-wrapper">
              {breadColleArg.length ? (
                <div className="colle-back-btn" onClick={this.backChangeBread}>
                  返回
                </div>
              ) : null}
              <div className="colle-all-btn" onClick={this.changeAllBread}>
                全部文件
              </div>
              <div className="colle-bread-list-wrapper">
                {breadColleArg.map((e, i) => (
                  <span key={i} onClick={() => this.checkChangeBread(e, i)}>
                    <i className="iconfont icon-arrow-right"></i>
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <div className="colle-check-wrapper">
              <div className="colle-check-control-wrapper file-info">
                <input
                  type="checkbox"
                  checked={isCheckAll}
                  onChange={this.selectAll}
                />
                {checkedCollenArg.length ? (
                  <Fragment>
                    <div className="check-sum">
                      已选中<span>{checkedCollenArg.length}</span>个文件/文件夹
                    </div>
                    <button
                      className="all-download-btn button plain"
                      onClick={this.batchDownloads}
                    >
                      下载
                    </button>
                  </Fragment>
                ) : (
                  <div>文件名</div>
                )}
              </div>
              <div className="file-size">文件大小</div>
              <div className="file-share-time">分享时间</div>
            </div>

            {/* 文件列表 */}
            <div className="file-list-wrapper scrollbar">
              {fileColles.map((v, i) => (
                <div className="file-item-wrapper" key={v.key}>
                  <div className="file-info">
                    <input
                      type="checkbox"
                      name="file"
                      value={i}
                      checked={v.checked}
                      onChange={(e) => this.checkFile(e, v, i)}
                    />
                    <div className="file-icon">
                      <img src={utils.mimeType("pdf")} alt="" />
                    </div>
                    <div
                      className="file-name ellipsis"
                      title="文件名称文件名名称文件名称文件名.jpeg"
                    >
                      文件名称文件名称...
                    </div>
                  </div>

                  <div className="file-size">
                    <span>1.25M</span>
                    <a
                      href="javascript"
                      download="download"
                      className="file-download-btn"
                    >
                      下载
                    </a>
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
