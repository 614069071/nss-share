import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Plyr from "plyr";
import { withTranslation } from "react-i18next";
// import ReactFileView from "react-file-viewer";
import Music from "@/components/Music";
import Popup from "@/components/Popup";
import * as utils from "@/utils";
import "./index.css";

/* 
  react-file-viewer 支持的格式

  const fileViewSupperArg = ["pdf", "csv", "xslx", "docx", "mp4", "webm", "mp3"]
*/

const previewImagesColle = [
  require("./1.jpg").default,
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
  "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
  "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
];

// 文件列表
class Colle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCheckedHidden: true,
      videoPupur: false,
      imagePupur: false,
      imageSrc: "",
      musicVisible: false,
      // musicSrc: "",
      musicData: {},
      fileColles: [],
      breadColleArg: [], //文件路径集合
      previewImageIndex: 0,
      isLoading: false,
      offset: 0,
      limit: 100,
      lazyStop: false,
    };
  }

  componentDidMount() {
    this.fetchFileColles();
  }

  componentDidUpdate() {}

  // 请求列表
  fetchFileColles = (data) => {
    this.setState({ isLoading: true });

    const { link } = this.props;
    const { offset, limit, fileColles } = this.state;
    const query = `&offset=${offset}&limit=${limit}`;

    link &&
      axios
        .get(link + query)
        .then(({ data = {} }) => {
          const { contents, count } = data;
          const list = [...fileColles, ...contents];

          this.setState({
            isLoading: false,
            fileColles: list,
            lazyStop: list.length === count,
          });
          console.log("contents,count", contents, count);
        })
        .catch((err) => {
          console.log(err);
        });
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

  // 批量下载
  batchDownloads = () => {
    // const checks = this.state.fileColles.filter((e) => e.checked);//选中的文件

    const arr = [
      "https://test-cloud-hospital-front.rubikstack.com/ms-hoc-material/v3/file/download/d1c8bc44c0f34f2f80778ad7a5222cfc.jpeg",
      "https://test-cloud-hospital-front.rubikstack.com/ms-hoc-material/v3/file/download/e9c12f0c8ae54ea8aa1e5de29a454b30.pdf",
      // "https://test-cloud-hospital-front.rubikstack.com/ms-hoc-material/v3/file/download/0f7c01f52635460e9bb1de1a31fbda44.pdf",
      // "https://test-cloud-hospital-front.rubikstack.com/ms-hoc-material/v3/file/download/851063dd3bf54219b6e6a03046f824ed.pdf",
    ];

    utils.downloads(arr);
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
  playerImage = () => {
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
  playerMusic = (v) => {
    this.setState({ musicVisible: true, musicData: v });
  };

  closeMusic = () => {
    this.setState({ musicVisible: false });
  };

  playerFile = (v) => {
    if (v.is_dir) {
      //请求新的列表
    } else {
      const ext = v.path.split(".").pop();
      console.log(ext);
      const videoArg = ["mp4"];
      const audioArg = ["mp3"];
      const imageArg = ["jpg", "png", "jpeg"];

      if (videoArg.includes(ext)) {
        this.playerVideo(v);
      } else if (audioArg.includes(ext)) {
        this.playerMusic(v);
      } else if (imageArg.includes(ext)) {
        this.playerImage(v);
      } else {
        // 不支持的格式
      }
    }
  };

  changeMusic = (v) => {
    this.setState({ musicVisible: v });
  };

  previewImageSwitchLeft = () => {
    const { previewImageIndex } = this.state;
    if (previewImageIndex === 0) return;
    this.setState({ previewImageIndex: previewImageIndex - 1 });
  };

  previewImageSwitchRight = () => {
    const { previewImageIndex } = this.state;
    if (previewImageIndex >= previewImagesColle.length - 1) return;
    this.setState({ previewImageIndex: previewImageIndex + 1 });
  };

  // 下拉触底
  lazyLoad = utils.throttle(() => {
    const { isLoading, lazyStop } = this.state;
    const { scrollTop, scrollHeight, clientHeight } = this.refScroll;
    const isBottom = scrollHeight - scrollTop - 50 <= clientHeight;

    if (!lazyStop && !isLoading && isBottom) {
      this.fetchFileColles();
    }
  });

  render() {
    const {
      fileColles,
      breadColleArg,
      videoPupur,
      imagePupur,
      musicVisible,
      musicData,
      previewImageIndex,
    } = this.state;

    const { t, user } = this.props;
    console.log("user", user);
    const checkedCollenArg = fileColles.filter((e) => e.checked);
    const isCheckAll =
      checkedCollenArg.length && checkedCollenArg.length === fileColles.length;

    return (
      <div className="colle-view-wrapper">
        <div className="colle-control-wrapper">
          <div className="colle-control-left">
            <span className="share-failure-sum">总共11个文件</span>
            <span className="share-create-time">
              {utils.formatTimeYYMS(user.createTime * 1000)}
            </span>
            <span className="share-failure-title">
              <i className="iconfont icon-reloadtime"></i>失效时间：
            </span>
            {user.expiredTime ? (
              <span className="share-failure-state">
                {utils.formatTimeYYMS(user.expiredTime * 1000)}
              </span>
            ) : (
              <span>永久</span>
            )}
          </div>

          <div className="colle-control-right">
            <button className="button" onClick={this.batchDownloads}>
              <i className="iconfont icon-xiazai"></i>
              {t("DOWNLOAD")}
            </button>
          </div>
        </div>

        <div className="colle-list-wrapper">
          <div className="colle-list-inner">
            <div className="colle-bread-wrapper">
              {breadColleArg.length ? (
                <div className="colle-back-btn" onClick={this.backChangeBread}>
                  <i className="iconfont icon-back"></i>返回
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
                      {t("DOWNLOAD")}
                    </button>
                  </Fragment>
                ) : (
                  <div>文件名</div>
                )}
              </div>
              <div className="file-size">文件大小</div>
              <div className="file-share-time">修改时间</div>
            </div>

            {/* 文件列表 */}
            <div
              className="file-list-wrapper scrollbar"
              ref={(e) => (this.refScroll = e)}
              onScroll={this.lazyLoad}
            >
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
                        src={utils.mimeType(v.is_dir ? "floder" : v.path)}
                        alt=""
                      />
                    </div>
                    <div className="file-name ellipsis">
                      <span title={v.path} onClick={() => this.playerFile(v)}>
                        {v.path.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="file-size">
                    <span>{v.is_dir ? null : "1.25M"}</span>
                    {v.is_dir ? null : (
                      <a
                        href="javascript"
                        download="download"
                        className="file-download-btn"
                        title="下载"
                      >
                        <i className="iconfont icon-xiazai"></i>
                      </a>
                    )}
                  </div>
                  <div className="file-share-time ellipsis">
                    {utils.formatTime(v.update_time)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 视频播放 */}
        <div
          className="player-video-wrapper"
          style={{ display: videoPupur ? "flex" : "none" }}
        >
          <div className="player-video-inner">
            <span className="player-video-close" onClick={this.closePlayer}>
              <i className="iconfont icon-cross"></i>
            </span>

            <video id="share_video_wrapper" className="video-js">
              <source src="//vjs.zencdn.net/v/oceans.webm" />
            </video>
          </div>
        </div>

        {/* 图片预览 */}
        <div
          className="player-image-wrapper"
          style={{ display: imagePupur ? "block" : "none" }}
        >
          <div
            className="player-image-inner"
            style={{
              backgroundImage: `url(${previewImagesColle[previewImageIndex]})`,
            }}
          ></div>
          <span className="player-image-close" onClick={this.closeImage}>
            <i className="iconfont icon-cross"></i>
          </span>
          <span
            className={`player-image-preview-btn left ${
              previewImageIndex === 0 ? "off" : ""
            }`}
            onClick={this.previewImageSwitchLeft}
          >
            <i className="iconfont icon-qiehuanzuo"></i>
          </span>
          <span
            className={`player-image-preview-btn right ${
              previewImageIndex === previewImagesColle.length - 1 ? "off" : ""
            }`}
            onClick={this.previewImageSwitchRight}
          >
            <i className="iconfont icon-qiehuanyou"></i>
          </span>
        </div>

        {/* 音乐播放 */}
        {/* <div
          className="player-music-wrapper"
          style={{ display: musicVisible ? "block" : "none" }}
        >
          <span className="player-music-close" onClick={this.closeMusic}>
            <i className="iconfont icon-cross"></i>
          </span>

          <audio id="share_audio_wrapper" src={musicSrc} preload="auto" />
        </div> */}

        <div
          className="p-music-fixed-wrapper"
          style={{ display: musicVisible ? "block" : "none" }}
        >
          <Music
            visible={musicVisible}
            change={this.changeMusic}
            data={musicData}
            isPc
          ></Music>
        </div>

        {/* <ReactFileView
          fileType="doc"
          filePath={require("./test.doc").default}
        /> */}

        <Popup visible={true}></Popup>
      </div>
    );
  }
}

Colle.defaultProps = {
  link: "",
};

Colle.propTypes = {
  link: PropTypes.string,
};

export default withTranslation("translations")(Colle);
