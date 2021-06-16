import Header from "../Header";
import over from "../../../images/over.png";
import "./index.css";

function Over(props) {
  const { isOver } = props;
  return (
    <div className="m-over-wrapper">
      <Header></Header>

      <div className="m-over-container">
        <div className="m-over-img-wrapper">
          <img src={over} alt="" />
        </div>

        <p>{isOver ? "您访问的链接已过期" : "文件已被删除"}</p>
      </div>
    </div>
  );
}

export default Over;
