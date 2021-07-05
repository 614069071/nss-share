import React, { useState } from "react";
import "./index.css";

function Hold(props) {
  const [code, setCode] = useState("");

  const validCode = () => {
    const { change } = props;
    change();
    console.log("code", code);
  };

  return (
    <div className="hold-view-wrapper">
      {/* 输入提取码 */}
      <div className="hold-container-wrapper ps-center">
        <div className="hold-head-wrapper">
          <div className="hold-avator-wrapper">
            <img
              src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1593547847,1664926781&fm=26&gp=0.jpg"
              alt=""
            />
          </div>
          <div className="hold-user">刘昊然的分享</div>
        </div>

        <div className="hold-main-wrapper">
          <p>请输入文件提取码</p>
          <div className="hold-password-wrapper">
            <input
              type="text"
              maxLength="4"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="button" onClick={validCode}>
              提取文件
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hold;
