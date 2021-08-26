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
      <span className="popup-close" onClick={close}>
        <i className="iconfont icon-cross"></i>
      </span>
    </div>
  );
}

export default Popup;
