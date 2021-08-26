import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function Hold(props) {
  const shortKey = window.location.href.split("/").pop();
  const [code, setCode] = useState("");

  const validCode = () => {
    const { change } = props;

    axios
      .post("http://192.168.8.160:8080/checkLink", {
        pwd: code,
        shortKey: shortKey,
      })
      .then(
        ({
          data: {
            resp_code,
            datas: { key, url },
          },
        }) => {
          console.log(resp_code);

          if (resp_code === 0) {
            change({ key, url });
          } else {
            // 弹窗提示错误
          }
        }
      )
      .catch((err) => {
        console.log(err);
      });

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
