import "./index.css";

function Popup(props) {
  const {
    type = "success",
    title = "提示",
    visible = false,
    close = () => {},
  } = props;

  return (
    <div
      className={`popup-wrapper ${type}`}
      style={{ display: visible ? "flex" : "none" }}
    >
      <span>
        <i className={`iconfont icon-${type}`}></i>
      </span>
      <div className="popup-title">{title}</div>
      <span onClick={close}>
        <i className="iconfont icon-close"></i>
      </span>
    </div>
  );
}

export default Popup;
