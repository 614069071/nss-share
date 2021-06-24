import React, { Component } from "react";
import PropTypes from "prop-types";
import Plyr from "plyr";
import * as utils from "../../utils";
import "./index.css";

var music = require("./music.m4r").default;

let musicInstance = null;
let musicInstanceTimer = null;

// 音乐播放器
export default class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musicImageRotate: 0,
      isPlay: false,
      duration: 0,
      currentTime: 0,
    };
  }

  componentDidMount() {
    console.log("did", this.props.data);
  }

  componentWillUnmount() {
    // console.log("music unmount");
    this.distoryMusic();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.name !== this.props.data.name) {
      this.initMusic();
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log("getDerivedStateFromProps", props, state);
  //   return null;
  // }

  initMusic = () => {
    if (!musicInstance) {
      console.log("create music");

      musicInstance = new Plyr("#m_share_audio_wrapper");
      // 获取当前时间
      musicInstance.on("timeupdate", () => {
        this.setState({ currentTime: musicInstance.currentTime });
      });

      // 播放
      musicInstance.on("play", () => {
        console.log("play");
      });

      musicInstance.on("ready", () => {
        this.setState({ duration: musicInstance.duration });
      });

      // 暂停
      musicInstance.on("pause", () => {
        console.log("pause");
      });

      // 停止
      musicInstance.on("ended", () => {
        console.log("ended");

        this.setState({ isPlay: false });
        clearInterval(musicInstanceTimer);
      });
    }
  };

  musicImageMove = () => {
    musicInstanceTimer = setInterval(() => {
      let rotate = this.state.musicImageRotate;

      this.setState({
        musicImageRotate: (rotate += 10),
      });
    }, 100);
  };

  // 音乐播放
  playerMusic = () => {
    this.setState({ musicPupur: false }, () => {
      musicInstance.play();

      // this.musicImageMove();
    });
  };

  stopMusic = () => {
    this.setState({ musicPupur: false }, () => {
      musicInstance.pause();
      clearInterval(musicInstanceTimer);
    });
  };

  playMusicChange = () => {
    const { isPlay } = this.state;

    this.setState({ isPlay: !isPlay }, () => {
      this.state.isPlay ? this.playerMusic() : this.stopMusic();
    });
  };

  distoryMusic = () => {
    clearInterval(musicInstanceTimer);
    musicInstanceTimer && musicInstance.destroy();
  };

  closeMusicView = () => {
    musicInstance.pause();
    clearInterval(musicInstanceTimer);
    this.setState({ isPlay: false });
    this.props.change(false);
  };

  render() {
    const { /* musicImageRotate,*/ isPlay, duration, currentTime } = this.state;
    const { visible, isPc } = this.props;

    return (
      <div
        className={`${isPc ? "pc-" : ""}music-fixed-wrapper`}
        style={{ display: visible ? "flex" : "none" }}
      >
        <span className="music-fixed-close" onClick={this.closeMusicView}>
          <i className="iconfont icon-cross"></i>
        </span>
        <div
          className={`music-fixed-image${isPlay ? " rotate" : ""}`}
          // className="music-fixed-image"
          // style={{ transform: `rotate(${musicImageRotate}deg)` }}
        ></div>
        <div className="music-fixed-title">阿西吧-阿西吧.mp3</div>
        <div className="music-fixed-time">
          <div className="music-fixed-time-process-wrapper">
            {/* 进度条 */}
            <div
              className="music-fixed-time-process-inner"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>

            {/* 进度条控制小圆点 */}

            <div className="music-process-control-wrapper">
              <div className="music-process-control-inner">
                <span
                  className="music-fixed-time-process-control"
                  style={{ left: `${(currentTime / duration) * 100}%` }}
                >
                  <span></span>
                </span>
              </div>
            </div>
          </div>
          <div className="music-fixed-time-process-item">
            <span>{utils.formatTime(currentTime * 1000)}</span>
            <span>{utils.formatTime(duration * 1000)}</span>
          </div>
        </div>

        <div className="music-fixed-control">
          <div className="prev-btn">
            <i className="iconfont icon-shangyishou-copy-copy"></i>
          </div>
          <div className="play-btn" onClick={this.playMusicChange}>
            <i
              className={`iconfont icon-${isPlay ? "zanting_1" : "bofang_11"}`}
            ></i>
          </div>
          <div className="next-btn">
            <i className="iconfont icon-shangyishou-copy"></i>
          </div>
        </div>

        {/* <audio id="m_share_audio_wrapper" src={musicSrc} preload="auto" /> */}
        <audio id="m_share_audio_wrapper" preload="auto" src={music} />

        {/* https://d.pcs.baidu.com/file/b16d1f099685eef9d1755d0e8247d8da?fid=41536675-250528-255046424959303&dstime=1624439104&rt=sh&sign=FDtAERVJouKy-DCb740ccc5511e5e8fedcff06b081203-0nstVpQEdzVUBVyX48jmdcZGZy8%3D&expires=8h&chkv=1&chkbd=0&chkpc=&dp-logid=570103787635108329&dp-callid=0&shareid=1964501874&r=762347489&clienttype=0&resvsflag=1-0-0-1-1-1&vuk=41536675&file_type=0 */}
      </div>
    );
  }
}

Music.defaultProps = {
  data: {},
  visible: false,
  change: () => {},
  isPc: false,
};

Music.propTypes = {
  visible: PropTypes.bool,
  change: PropTypes.func,
  data: PropTypes.object,
  isPc: PropTypes.bool,
};
