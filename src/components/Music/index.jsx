import React, { Component } from "react";
import PropTypes from "prop-types";
import Plyr from "plyr";
import * as utils from "../../utils";
import "./index.css";
const musicSrc = require("./music.mp3").default;

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
    this.closeMusic();
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

      this.musicImageMove();
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

  closeMusic = () => {
    clearInterval(musicInstanceTimer);
    musicInstanceTimer && musicInstance.destroy();
  };

  render() {
    const { musicImageRotate, isPlay, duration, currentTime } = this.state;
    const { visible, change } = this.props;

    return (
      <div
        className="music-fixed-wrapper"
        style={{ display: visible ? "flex" : "none" }}
      >
        <span className="music-fixed-close" onClick={() => change(false)}>
          <i className="iconfont icon-cross"></i>
        </span>
        <div
          className="music-fixed-image"
          style={{ transform: `rotate(${musicImageRotate}deg)` }}
        >
          music
        </div>
        <div className="music-fixed-title">阿西吧-阿西吧.mp3</div>
        <div className="music-fixed-time">
          <div className="music-fixed-time-process-wrapper">
            <div
              className="music-fixed-time-process-inner"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <div className="music-fixed-time-process-item">
            <span>{utils.formatTime(currentTime * 1000)}</span>
            <span>{utils.formatTime(duration * 1000)}</span>
          </div>
        </div>
        <div className="music-fixed-control">
          {isPlay ? (
            <div onClick={this.playMusicChange}>
              <i className="iconfont icon-tingzhi"></i>
            </div>
          ) : (
            <div onClick={this.playMusicChange}>
              <i className="iconfont icon-bofang"></i>
            </div>
          )}
        </div>

        <audio id="m_share_audio_wrapper" src={musicSrc} preload="auto" />
      </div>
    );
  }
}

Music.defaultProps = {
  data: {},
  visible: false,
  change: () => {},
};

Music.propTypes = {
  visible: PropTypes.bool,
  change: PropTypes.func,
  data: PropTypes.object,
};
