import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Plyr from "plyr";
import * as utils from "../../utils";
import "./index.css";
import "plyr/dist/plyr.css";

// 文件列表
export default class Colle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckedHidden: true,
      videoPupur: false,
      imagePupur: false,
      imageSrc: "",
      musicPupur: false,
      musicSrc: require("./music.mp3").default,
      fileColles: [
        { name: "我是文件夹", checked: false, isFloder: 1 },
        { name: "文件.txt", checked: false },
        { name: "文件.pdf", checked: false },
        { name: "文件.doc", checked: false },
        { name: "文件.ppt", checked: false },
        { name: "文件.xls", checked: false },
        { name: "文件.zip", checked: false },
        { name: "文件.mp3", checked: false },
        { name: "文件.mp4", checked: false },
        { name: "文件.png", checked: false },
        { name: "文件.xsa", checked: false },
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

  // 播放视频
  playerVideo = (src = "//vjs.zencdn.net/v/oceans.webm") => {
    this.setState({ videoPupur: true });

    new Plyr("#share_video_wrapper");
  };

  closePlayer = () => {
    this.setState({ videoPupur: false });
  };

  // 图片预览
  playerImage = (
    src = "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
  ) => {
    this.setState({
      imageSrc: src,
      imagePupur: true,
    });
  };

  closeImage = () => {
    this.setState({ imageSrc: "", imagePupur: false });
  };

  // 音乐播放
  playerMusic = (src = "") => {
    this.setState({
      musicPupur: true,
    });

    new Plyr("#share_audio_wrapper");
  };

  closeMusic = () => {
    this.setState({ musicPupur: false });
  };

  playerFile = () => {
    this.playerImage();
    // this.playerVideo();
    // this.playerMusic();
  };

  render() {
    const {
      fileColles,
      breadColleArg,
      videoPupur,
      imagePupur,
      imageSrc,
      musicPupur,
      musicSrc,
    } = this.state;

    const checkedCollenArg = fileColles.filter((e) => e.checked);
    const isCheckAll = checkedCollenArg.length === fileColles.length;

    return (
      <div className="colle-view-wrapper">
        <div className="colle-control-wrapper">
          <div className="colle-control-left">
            <span className="share-failure-sum">总共11个文件</span>
            <span className="share-failure-title">
              <i className="icon-clock"></i>失效时间：
            </span>
            <span className="share-failure-state">已失效</span>
          </div>

          <div className="colle-control-right">
            <button className="button" onClick={this.batchDownloads}>
              <i className="icon-download"></i>
              下载
            </button>
          </div>
        </div>

        <div className="colle-list-wrapper">
          <div className="colle-list-inner">
            <div className="colle-bread-wrapper">
              {breadColleArg.length ? (
                <div className="colle-back-btn" onClick={this.backChangeBread}>
                  <i className="icon-back"></i>返回
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
                <div className="file-item-wrapper" key={i}>
                  <div className="file-info">
                    <input
                      type="checkbox"
                      name="file"
                      value={i}
                      checked={v.checked}
                      onChange={(e) => this.checkFile(e, v, i)}
                    />
                    <div className="file-icon">
                      <img
                        src={utils.mimeType(v.isFloder ? "floder" : v.name)}
                        alt=""
                      />
                    </div>
                    <div className="file-name ellipsis">
                      <span title={v.name} onClick={() => this.playerFile()}>
                        {v.name}
                      </span>
                    </div>
                  </div>

                  <div className="file-size">
                    <span>{v.isFloder ? null : "1.25M"}</span>
                    <a
                      href="javascript"
                      download="download"
                      className="file-download-btn"
                      title="下载"
                    >
                      <i className="icon-down-blue"></i>
                    </a>
                  </div>
                  <div className="file-share-time">2021-01-12 11:07</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 视频播放 */}
        <div
          className="player-video-wrapper"
          style={{ display: videoPupur ? "block" : "none" }}
        >
          <span className="player-video-close" onClick={this.closePlayer}>
            <i className="iconfont icon-cross"></i>
          </span>

          <video id="share_video_wrapper" className="video-js">
            <source src="//vjs.zencdn.net/v/oceans.webm" />
          </video>
        </div>

        {/* 图片预览 */}
        <div
          className="player-image-wrapper"
          style={{
            display: imagePupur ? "block" : "none",
            backgroundImage: `url(${imageSrc})`,
          }}
        >
          <span className="player-image-close" onClick={this.closeImage}>
            <i className="iconfont icon-cross"></i>
          </span>
        </div>

        {/* 音乐播放 */}
        <div
          className="player-music-wrapper"
          style={{ display: musicPupur ? "block" : "none" }}
        >
          <span className="player-music-close" onClick={this.closeMusic}>
            <i className="iconfont icon-cross"></i>
          </span>

          <audio id="share_audio_wrapper" src={musicSrc} preload="auto" />
        </div>
      </div>
    );
  }
}

Colle.defaultProps = {};

Colle.propTypes = {
  data: PropTypes.string,
};
