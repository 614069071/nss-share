import { useEffect } from "react";
import Header from "../Header";
import "./index.css";

function Hold(props) {
  useEffect(() => {
    console.log("componentDidMount");
  });

  const { change } = props;

  return (
    <div className="m-hold-view-wrapper">
      <Header></Header>

      <div className="m-hold-wrapper">
        <div>
          <input type="text" placeholder="请输入文件提取码" maxLength="4" />
        </div>
        <p>密码错误，请重新输入</p>
        <button className="m-button" onClick={change}>
          提取文件
        </button>
      </div>
    </div>
  );
}
export default Hold;
