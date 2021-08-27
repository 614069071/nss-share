import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import axios from "axios";
import Plyr from "plyr";
// import ReactFileView from "react-file-viewer";
import Music from "@/components/Music";
import Popup from "@/components/Popup";
import * as utils from "@/utils";
import "./index.css";

/* 
  react-file-viewer 支持的格式

  const fileViewSupperArg = ["pdf", "csv", "xslx", "docx", "mp4", "webm", "mp3"]
*/

// const previewImagesColle = [
//   "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
//   "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
//   "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
//   "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
//   "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
//   "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
//   "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
// ];

let popupTimer = null;

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
      videoPlaySrc: "",
      videoPlayer: null,
      previewMusicData: {},
      fileColles: [],
      breadColleArg: [], //文件路径集合
      previewImageIndex: 0,
      isLoading: false,
      offset: 0,
      limit: 100,
      lazyStop: false,
      previewImagesColle: [],
      isFloderType: false,
      currentFloderCount: 0,
      popupVisible: false,
    };
  }

  componentDidMount() {
    this.fetchFileColles();
  }

  componentDidUpdate() {}

  // 请求列表
  fetchFileColles = () => {
    this.setState({ isLoading: true });

    const { url, key, linkType } = this.props.infos;
    const { offset, limit, fileColles } = this.state;
    const query = `get${
      linkType ? "Public" : ""
    }ShareInformationList?key=${key}&offset=${offset}&limit=${limit}`;

    return new Promise((resolve) => {
      url &&
        axios
          .get(url + query)
          .then(({ data = {} }) => {
            const { contents, count } = data;
            const list = [
              ...fileColles,
              ...contents.map((e) => ({ ...e, checked: false })),
            ];

            this.setState({
              isLoading: false,
              fileColles: list,
              offset: list.length,
              lazyStop: list.length === count || contents.length < 100,
              currentFloderCount: count,
            });

            resolve(true);
          })
          .catch((err) => {
            resolve(false);
          });
    });
  };

  getFloderFiles = (data) => {
    const { url, linkType } = this.props.infos;
    const { isFloderType, fileColles } = this.state;
    const link = `${url}get${
      linkType ? "Public" : ""
    }ShareFolderInformationList?file_id=${data.file_id}`;

    return new Promise((resolve) => {
      axios
        .get(link)
        .then((res) => {
          console.log(res);

          const { contents = [], count = 0 } = res.data;

          const list = [
            ...fileColles,
            ...contents.map((e) => ({ ...e, checked: false })),
          ];

          if (isFloderType) {
            this.setState({
              offset: list.length,
              lazyStop: list.length === count || contents.length < 100,
              fileColles: list,
              currentFloderCount: count,
            });
          } else {
            this.setState({
              offset: list.length,
              lazyStop: list.length === count || contents.length < 100,
              isFloderType: true,
              fileColles: list,
              currentFloderCount: count,
            });
          }

          resolve(true);
        })
        .catch((err) => {
          resolve(false);
        });
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
    let current = arr.slice(0, -1);

    this.setState({ fileColles: [] }, async () => {
      if (current.length) {
        const isHanve = await this.getFloderFiles(current[current.length - 1]);
        isHanve && this.setState({ breadColleArg: current });
      } else {
        const isHanve = await this.fetchFileColles();
        isHanve && this.setState({ breadColleArg: current });
      }
    });
  };

  // 全部文件
  changeAllBread = () => {
    this.setState({ breadColleArg: [], fileColles: [] }, () => {
      this.fetchFileColles("全部文件");
    });
  };

  // 切换路径
  checkChangeBread = (item, index) => {
    let arr = this.state.breadColleArg.slice(0, index + 1);

    this.setState({ fileColles: [] }, async () => {
      const isHave = await this.getFloderFiles(item);
      isHave && this.setState({ breadColleArg: arr });
    });
  };

  // 批量下载
  batchDownloads = () => {
    const { url, linkType } = this.props.infos;
    const checkFiles = this.state.fileColles
      .filter((e) => e.checked)
      .map(
        (e) =>
          `${url}download${linkType ? "Public" : ""}SharedFile?file_id=${
            e.file_id
          }`
      ); //选中的文件
    console.log(checkFiles);
    utils.downloads(checkFiles);
  };

  // 播放视频
  playerVideo = (id) => {
    this.setState({ videoPupur: true });

    const { url, linkType } = this.props.infos;
    const src = `${url}view${linkType ? "Public" : ""}SharedFile?file_id=${id}`;

    this.setState({ videoPlaySrc: src }, () => {
      if (!this.state.videoPlayer) {
        this.setState({ videoPlayer: new Plyr("#share_video_wrapper") });
      }
    });
  };

  closePlayer = () => {
    this.setState({ videoPupur: false }, () => {
      this.state.videoPlayer.pause();
    });
  };

  // 图片预览
  playerImage = (id) => {
    const { url, linkType } = this.props.infos;
    const src = `${url}view${linkType ? "Public" : ""}SharedFile?file_id=${id}`;
    this.setState({ imagePupur: true, previewImageSrc: src });

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
    const { url, linkType } = this.props.infos;
    this.setState({
      musicVisible: true,
      previewMusicData: {
        title: v.path.slice(1),
        src: `${url}view${linkType ? "Public" : ""}SharedFile?file_id=${
          v.file_id
        }`,
      },
    });
  };

  closeMusic = () => {
    this.setState({ musicVisible: false });
  };

  playerFile = (v) => {
    if (v.is_dir) {
      //请求新的列表
      this.setState({ fileColles: [] }, async () => {
        const isHave = await this.getFloderFiles(v);

        isHave &&
          this.setState({ breadColleArg: [...this.state.breadColleArg, v] });
      });
    } else {
      const ext = v.path.split(".").pop();
      const videoArg = ["mp4", "webm"];
      const audioArg = ["mp3", "ogg"];
      const imageArg = ["jpg", "png", "jpeg", "gif", "bmp"];

      if (videoArg.includes(ext)) {
        this.playerVideo(v.file_id);
      } else if (audioArg.includes(ext)) {
        this.playerMusic(v);
      } else if (imageArg.includes(ext)) {
        this.playerImage(v.file_id);
      } else {
        // 不支持的格式
        !this.state.popupVisible &&
          this.setState({ popupVisible: true }, () => {
            popupTimer = setTimeout(() => {
              this.setState({ popupVisible: false });
            }, 3000);
          });
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
    if (previewImageIndex >= this.previewImagesColle.length - 1) return;
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
      videoPlaySrc,
      imagePupur,
      musicVisible,
      previewMusicData,
      // previewImageIndex,
      // previewImagesColle,
      previewImageSrc,
      currentFloderCount,
      popupVisible,
    } = this.state;

    const { t, infos } = this.props;
    const checkedCollenArg = fileColles.filter((e) => e.checked);
    const isCheckAll =
      checkedCollenArg.length && checkedCollenArg.length === fileColles.length;

    return (
      <div className="colle-view-wrapper">
        <div className="colle-control-wrapper">
          <div className="colle-control-left">
            <span className="share-failure-sum">
              总共{currentFloderCount}个文件
            </span>
            <span className="share-create-time">
              {utils.formatTimeYYMS(infos.createTime * 1000)}
            </span>
            <span className="share-failure-title">
              <i className="iconfont icon-reloadtime"></i>失效时间：
            </span>
            {infos.expiredTime ? (
              <span className="share-failure-state">
                {utils.formatTimeYYMS(infos.expiredTime * 1000)}
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
                    {e.path.split("/").pop()}
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
                        {v.path.split("/").pop()}
                      </span>
                    </div>
                  </div>

                  <div className="file-size">
                    <span>
                      {v.is_dir ? null : utils.toBety(v.bytes / 1024)}
                    </span>
                    {v.is_dir ? null : (
                      <a
                        href={`${infos.url}download${
                          infos.linkType ? "Public" : ""
                        }SharedFile?file_id=${v.file_id}`}
                        download="download"
                        className="file-download-btn"
                        title="下载"
                      >
                        <i className="iconfont icon-xiazai"></i>
                      </a>
                    )}
                  </div>
                  <div className="file-share-time ellipsis">
                    {utils.formatTime(v.update_time * 1000)}
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

            <video id="share_video_wrapper" preload="auto">
              <source src={videoPlaySrc} />
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
            // style={{
            //   backgroundImage: `url(${previewImagesColle[previewImageIndex]})`,
            // }}

            style={{
              backgroundImage: `url(${previewImageSrc})`,
            }}
          ></div>
          <span className="player-image-close" onClick={this.closeImage}>
            <i className="iconfont icon-cross"></i>
          </span>

          {/* <span
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
          </span> */}
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
            data={previewMusicData}
            isPc
          ></Music>
        </div>

        {/* <ReactFileView
          fileType="doc"
          filePath={require("./test.doc").default}
        /> */}

        <Popup
          visible={popupVisible}
          title="该文件格式暂不支持预览"
          close={() => {
            clearTimeout(popupTimer);
            this.setState({ popupVisible: false });
          }}
        ></Popup>
      </div>
    );
  }
}

Colle.defaultProps = {
  infos: {},
};

Colle.propTypes = {
  infos: PropTypes.object,
};

export default withTranslation("translations")(Colle);
