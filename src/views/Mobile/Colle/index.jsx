import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "../Header";
import Plyr from "plyr";
import Music from "@/components/Music";
import * as utils from "@/utils";
import "./index.css";

let videoInstance = null;
let startMoveClient = 0;

const previewImagesColle = [
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
  "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
  "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
];

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
      breadColleArg: [
        "文件夹文件夹1",
        "文件夹文件夹2",
        "文件夹文件夹3",
        "文件夹文件夹4",
        "文件夹文件夹5",
      ], //文件路径集合
      imagePupur: false,
      imageSrc: "",
      haveVideo: false, //是否有视频
      musicPupur: false,
      musicSrc: require("./music.mp3").default,
      currentImageIndex: 0,
      isPlay: false,
      musicImageRotate: 0,
      musicVisible: false,
      musicData: {},
      isLoading: false, //是否在加载请求数据中
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  // 请求列表
  fetchFileColles = (data) => {
    this.setState({ isLoading: true });

    setTimeout(() => {
      console.log("请求列表", data);
      this.setState({ isLoading: false });
    }, 3000);
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
    this.setState({ haveVideo: true }, () => {
      if (!videoInstance) {
        videoInstance = new Plyr("#m_share_video_wrapper");
      }

      videoInstance.play();
    });
  };

  closePlayer = () => {
    this.setState({ haveVideo: false }, () => {
      videoInstance.pause();
    });
  };

  // 图片预览
  playerImage = (src) => {
    this.setState({
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
  playerMusic = (data) => {
    this.setState({ musicVisible: true, musicData: data });
  };

  playerFile = (v) => {
    this.playerImage(v);
    // this.playerVideo(v);
    // this.playerMusic(v);
  };

  // 批量下载 //百度网盘限制50M
  batchDownloads = () => {
    // console.log(this.state.fileColles.filter((e) => e.checked));

    const arr = [
      "https://test-cloud-hospital-front.rubikstack.com/ms-hoc-material/v3/file/download/d1c8bc44c0f34f2f80778ad7a5222cfc.jpeg",
      "https://test-cloud-hospital-front.rubikstack.com/ms-hoc-material/v3/file/download/e9c12f0c8ae54ea8aa1e5de29a454b30.pdf",
      // "https://test-cloud-hospital-front.rubikstack.com/ms-hoc-material/v3/file/download/0f7c01f52635460e9bb1de1a31fbda44.pdf",
      // "https://test-cloud-hospital-front.rubikstack.com/ms-hoc-material/v3/file/download/851063dd3bf54219b6e6a03046f824ed.pdf",
    ];

    utils.downloads(arr);
  };

  changeMusic = (v) => {
    this.setState({ musicVisible: v });
  };

  previewImagesChangeStart = (e) => {
    const { clientX } = e.changedTouches[0];
    startMoveClient = clientX;
  };

  previewImagesChangeEnd = (e) => {
    const { clientX } = e.changedTouches[0];
    const gap = clientX - startMoveClient;
    const { currentImageIndex } = this.state;
    if (gap > 0) {
      if (currentImageIndex === 0) return;
      this.setState({ currentImageIndex: currentImageIndex - 1 });
    } else if (gap < 0) {
      if (currentImageIndex >= previewImagesColle.length - 1) return;
      this.setState({ currentImageIndex: currentImageIndex + 1 });
    }
  };

  // 下拉触底
  lazyLoad = utils.throttle(() => {
    const { isLoading } = this.state;
    const { scrollTop, scrollHeight, clientHeight } = this.refScroll;
    const isBottom = scrollHeight - scrollTop - 50 <= clientHeight;

    if (!isLoading && isBottom) {
      this.fetchFileColles();
    }
  });

  render() {
    const {
      fileColles,
      breadColleArg,
      imagePupur,
      haveVideo,
      musicVisible,
      musicData,
      currentImageIndex,
    } = this.state;

    // const checkArg = fileColles.filter((e) => e.checked);

    return (
      <div className="m-colle-wrapper">
        <div
          className="m-inner-wrapper"
          ref={(e) => (this.refScroll = e)}
          onScroll={this.lazyLoad}
        >
          <Header></Header>

          <div className="m-control-wrapper">
            {
              // checkArg.length ? (
              //   <div className="check-state-wrapper">
              //     <span className="check-state-cancel" onClick={this.toCancelAll}>
              //       取消
              //     </span>

              //     <span className="check-state-info">
              //       已选中 <i>{checkArg.length}</i> 个文件/文件夹
              //     </span>

              //     <span className="check-state-all" onClick={this.selectAll}>
              //       全选
              //     </span>
              //   </div>
              // ) :

              breadColleArg.length ? (
                <div className="m-colle-bread-wrapper">
                  {breadColleArg.length ? (
                    <div
                      className="m-colle-back-btn"
                      onClick={this.backChangeBread}
                    >
                      <i className="iconfont icon-back"></i>返回
                    </div>
                  ) : null}
                  <div
                    className="m-colle-all-btn"
                    onClick={this.changeAllBread}
                  >
                    全部文件
                  </div>
                  <div className="m-colle-bread-list-wrapper">
                    {breadColleArg.map((e, i) => (
                      <span key={i} onClick={() => this.checkChangeBread(e, i)}>
                        <i className="iconfont icon-arrow-right"></i>
                        <span
                          className={
                            i === breadColleArg.length - 1 ? "" : "ellipsis"
                          }
                        >
                          {e}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="no-check-state-wrapper">
                  总共5个文件 <span>2021-05-03</span> <span>5月31日前有效</span>
                </div>
              )
            }
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
                    <span
                      className="ellipsis"
                      onClick={() => this.playerFile(v)}
                    >
                      文件名字
                    </span>
                  </div>
                  <p>
                    <span>2021-05-24 11:34</span>
                    <span>1.25MB</span>
                  </p>
                </div>
                <div className="m-file-check">
                  {/* <input
                    type="checkbox"
                    checked={v.checked}
                    onChange={(e) => this.checkFile(e, v, i)}
                  /> */}
                  <button className="m-button m-download-btn">下载</button>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="blank-wrapper"></div> */}

          {/* 图片预览 */}
          <div
            className="m-player-image-wrapper"
            style={{
              display: imagePupur ? "block" : "none",
              backgroundImage: `url(${previewImagesColle[currentImageIndex]})`,
            }}
            onTouchStart={this.previewImagesChangeStart}
            onTouchEnd={this.previewImagesChangeEnd}
          >
            <div className="m-player-image-close-wrapper">
              <span className="m-player-image-close" onClick={this.closeImage}>
                <i className="iconfont icon-cross"></i>
              </span>
              <span className="m-player-image-paper">
                {currentImageIndex + 1}/{previewImagesColle.length}
              </span>
            </div>
          </div>

          {/* 视频播放 */}
          {haveVideo ? (
            <video className="m-player-video" id="m_share_video_wrapper">
              <source src="//vjs.zencdn.net/v/oceans.mp4" />
            </video>
          ) : null}

          {/* <div
            className="m-player-video-wrapper"
            style={{ display: haveVideo ? "block" : "none" }}
          >
            <span className="player-video-close" onClick={this.closePlayer}>
              <i className="iconfont icon-cross"></i>
            </span>

            <div className="m-plyr-inner-wrapper">
              <video id="m_share_video_wrapper" x5-video-player-type="h5">
                <source src="//vjs.zencdn.net/v/oceans.mp4" />
              </video>
            </div>
          </div> */}

          {/* 音乐播放 */}
          {/* <div
            className="m-player-music-wrapper"
            style={{ display: musicPupur ? "block" : "none" }}
          >
            <span className="player-music-close" onClick={this.closeMusic}>
              <i className="iconfont icon-cross"></i>
            </span>

            <audio id="m_share_audio_wrapper" src={musicSrc} preload="auto" />
          </div> */}

          <Music
            visible={musicVisible}
            change={this.changeMusic}
            data={musicData}
          ></Music>
        </div>

        {/* 批量下载 */}
        {/* <div className="download-files-wrapper">
          <button
            className="m-button m-download-button"
            onClick={this.batchDownloads}
            disabled={!checkArg.length}
          >
            下载
          </button>
        </div> */}
      </div>
    );
  }
}

Colle.defaultProps = {};

Colle.propTypes = {
  data: PropTypes.string,
};
