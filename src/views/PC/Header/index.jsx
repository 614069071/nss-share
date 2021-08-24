import logo from "@/images/logo.png";
import "./index.css";

function Header(props) {
  const { isHold, data = {} } = props;

  return (
    <header className="header-wrapper">
      <div className="header-item-left">
        <img src={logo} alt="" />
      </div>

      {isHold ? (
        <div className="header-item-right">
          <div>分享者：</div>
          <div className="header-avator-wrapper">
            <img src={data.url} alt="" />
          </div>
          <div>{data.name}</div>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
