import overImage from "../../images/over.png";
import "./index.css";

const Over = (props) => {
  const { isOver } = props;

  return (
    <div className="file-over-wrapper">
      <div className="file-over-inner-wrapper">
        <div className="file-over-image-wrapper">
          <img src={overImage} alt="" />
        </div>
        <p>{isOver ? "您访问的链接已过期" : "文件已被删除"}</p>
      </div>
    </div>
  );
};

export default Over;
