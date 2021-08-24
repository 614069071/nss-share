import overImage from "@/images/over.png";
import "./index.css";

const Over = (props) => {
  const { code } = props;

  return (
    <div className="file-over-wrapper">
      <div className="file-over-inner-wrapper">
        <div className="file-over-image-wrapper">
          <img src={overImage} alt="" />
        </div>
        <p>{code === 1001 ? "外链已过期" : "外链不存在"}</p>
      </div>
    </div>
  );
};

export default Over;
