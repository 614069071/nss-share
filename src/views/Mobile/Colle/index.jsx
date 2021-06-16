import React, { Component } from "react";
import PropTypes from "prop-types";
import Plyr from "plyr";
import * as utils from "../../../utils";
import "./index.css";

export default class Colle extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      isCheck: false,
      breadColleArg: ["文件夹1", "文件夹2"], //文件路劲集合
      imagePupur: false,
      imageSrc: "",
      videoPupur: false,
      musicPupur: false,
      musicSrc: "",
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  // 请求列表
  fetchFileColles = (data) => {
    console.log("请求列表", data);
  };

  // 全选
  selectAll = () => {
    const arr = this.state.fileColles;
    const checkArg = arr.filter((e) => e.checked);

    arr.forEach((e) => {
      e.checked = checkArg.length < arr.length;
    });

    this.setState({ fileColles: arr }, () => {
      console.log(this.state.fileColles);
    });
  };

  // 取消全选
  toCancelAll = () => {
    const arr = this.state.fileColles;
    arr.forEach((e) => (e.checked = false));

    this.setState({ fileColles: arr }, () => {
      console.log(this.state.fileColles);
    });
  };

  // 处理文件选择
  checkFile = (e, v, i) => {
    let arr = this.state.fileColles;
    arr[i].checked = e.target.checked;

    this.setState({ fileColles: arr });
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

  // 播放视频
  playerVideo = (src = "//vjs.zencdn.net/v/oceans.webm") => {
    this.setState({ videoPupur: true });

    new Plyr("#m_share_video_wrapper");
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

    /* 
    https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg
    https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1070003001,653753576&fm=26&gp=0.jpg
    */
  };

  closeImage = () => {
    this.setState({ imageSrc: "", imagePupur: false });
  };

  // 音乐播放
  playerMusic = (src = "") => {
    this.setState({
      musicPupur: true,
    });

    new Plyr("#m_share_audio_wrapper");
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
      imagePupur,
      imageSrc,
      videoPupur,
      musicPupur,
      musicSrc,
    } = this.state;
    const checkArg = fileColles.filter((e) => e.checked);

    return (
      <div className="m-colle-wrapper">
        <div className="m-control-wrapper">
          {checkArg.length ? (
            <div className="check-state-wrapper">
              <span className="check-state-cancel" onClick={this.toCancelAll}>
                取消
              </span>

              <span className="check-state-info">
                已选中 <i>1</i> 个文件/文件夹
              </span>

              <span className="check-state-all" onClick={this.selectAll}>
                全选
              </span>
            </div>
          ) : breadColleArg.length ? (
            <div className="m-colle-bread-wrapper">
              {breadColleArg.length ? (
                <div
                  className="m-colle-back-btn"
                  onClick={this.backChangeBread}
                >
                  <i className="iconfont icon-back"></i>返回
                </div>
              ) : null}
              <div className="m-colle-all-btn" onClick={this.changeAllBread}>
                全部文件
              </div>
              <div className="m-colle-bread-list-wrapper">
                {breadColleArg.map((e, i) => (
                  <span key={i} onClick={() => this.checkChangeBread(e, i)}>
                    <i className="iconfont icon-arrow-right"></i>
                    {e}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-check-state-wrapper">
              总共5个文件 <span>5月31日前有效</span>
            </div>
          )}
        </div>

        <div className="m-colle-list-wrapper">
          {fileColles.map((v, i) => (
            <div className="m-file-item-wrapper" key={i}>
              <div className="m-file-image">
                <img
                  src={utils.mimeType(v.isFloder ? "floder" : v.name)}
                  alt=""
                />
              </div>
              <div className="m-file-main">
                <div>
                  <span className="ellipsis" onClick={() => this.playerFile(v)}>
                    文件名字
                  </span>
                </div>
                <p>
                  <span>2021-05-24 11:34</span>
                  <span>1.25MB</span>
                </p>
              </div>
              <div className="m-file-check">
                <input
                  type="checkbox"
                  checked={v.checked}
                  onChange={(e) => this.checkFile(e, v, i)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="blank-wrapper"></div>

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

        {/* 视频播放 */}
        <div
          className="m-player-video-wrapper"
          style={{ display: videoPupur ? "block" : "none" }}
        >
          <span className="player-video-close" onClick={this.closePlayer}>
            <i className="iconfont icon-cross"></i>
          </span>

          <div className="m-plyr-inner-wrapper">
            <video id="m_share_video_wrapper">
              <source src="//vjs.zencdn.net/v/oceans.mp4" />
            </video>
          </div>
        </div>

        {/* 音乐播放 */}
        <div
          className="m-player-music-wrapper"
          style={{ display: musicPupur ? "block" : "none" }}
        >
          <span className="player-music-close" onClick={this.closeMusic}>
            <i className="iconfont icon-cross"></i>
          </span>

          <audio id="m_share_audio_wrapper" src={musicSrc} preload="auto" />
        </div>
      </div>
    );
  }
}

Colle.defaultProps = {};

Colle.propTypes = {
  data: PropTypes.string,
};
