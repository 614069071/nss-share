import React, { Component } from "react";
import PropTypes from "prop-types";
import Plyr from "plyr";
import "./index.css";

// let musicInstance = null;
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
      musicPlaySrc: "",
      musicInstance: null,
    };
  }

  componentDidMount() {
    this.initMusic();
  }

  componentWillUnmount() {
    console.log("music unmount");
    this.distoryMusic();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.src !== this.props.data.src) {
      this.initMusic();
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log("getDerivedStateFromProps", props, state);
  //   return null;
  // }

  formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : "0" + n;
  };

  formatTime = (time) => {
    const date = new Date(time);
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [minute, second].map(this.formatNumber).join(":");
  };

  initMusic = () => {
    const { data } = this.props;

    if (!this.state.musicInstance && data.src) {
      console.log("create music", data);

      this.setState({ musicPlaySrc: data.src }, () => {
        const player = new Plyr("#m_share_audio_wrapper");

        player.on("ready", () => {
          console.log("ready", player.duration);
          this.setState({ duration: player.duration });

          // 获取当前时间
          player.on("timeupdate", () => {
            this.setState({ currentTime: player.currentTime });

            if (!this.state.duration && player.duration) {
              this.setState({ duration: player.duration });
            }
          });
          // 暂停
          player.on("pause", () => {
            console.log("pause");
          });

          // 播放
          player.on("play", () => {
            console.log("play");
          });

          // 停止
          player.on("ended", () => {
            console.log("ended");
            this.setState({ isPlay: false });
            clearInterval(musicInstanceTimer);
          });
        });

        this.setState({ musicInstance: player });
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
    this.state.musicInstance.play();
    // this.musicImageMove();
  };

  stopMusic = () => {
    this.state.musicInstance.pause();
    clearInterval(musicInstanceTimer);
  };

  playMusicChange = () => {
    const { isPlay } = this.state;

    this.setState({ isPlay: !isPlay }, () => {
      this.state.isPlay ? this.playerMusic() : this.stopMusic();
    });
  };

  distoryMusic = () => {
    clearInterval(musicInstanceTimer);
    musicInstanceTimer && this.state.musicInstance.destroy();
  };

  closeMusicView = () => {
    this.state.musicInstance.pause();
    clearInterval(musicInstanceTimer);
    this.setState({ isPlay: false });
    this.props.change(false);
  };

  render() {
    const {
      /* musicImageRotate,*/
      isPlay,
      duration,
      currentTime,
      musicPlaySrc,
    } = this.state;

    const { visible, isPc, data } = this.props;

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
        <div className="music-fixed-title">{data.title}</div>
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
            <span>{this.formatTime(currentTime * 1000)}</span>
            <span>{this.formatTime(duration * 1000)}</span>
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

        <audio id="m_share_audio_wrapper" preload="auto">
          <source src={musicPlaySrc} />
        </audio>
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
