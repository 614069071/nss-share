import React, { Component } from "react";
import PropTypes from "prop-types";
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
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    const { fileColles } = this.state;
    return (
      <div className="m-colle-wrapper">
        <div className="m-control-wrapper">
          {/* <div className="no-check-state-wrapper">
            总共5个文件 <span>5月31日前有效</span>
          </div> */}

          <div className="check-state-wrapper">
            <span className="check-state-cancel">取消</span>
            <span className="check-state-info">
              已选中 <i>1</i> 个文件/文件夹
            </span>
            <span className="check-state-all">全选</span>
          </div>
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
                <div className="ellipsis">文件名字</div>
                <p>
                  <span>2021-05-24 11:34</span>
                  <span>1.25MB</span>
                </p>
              </div>
              <div className="m-file-check">
                <input type="checkbox" />
              </div>
            </div>
          ))}
        </div>

        <div className="download-files-wrapper">
          <button className="m-button m-download-button">下载</button>
        </div>
      </div>
    );
  }
}

Colle.defaultProps = {};

Colle.propTypes = {
  data: PropTypes.string,
};
