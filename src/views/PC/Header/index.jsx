import logo from "@/images/logo.png";
import "./index.css";

function Header(props) {
  const { isHold } = props;

  return (
    <header className="header-wrapper">
      <div className="header-item-left">
        <img src={logo} alt="" />
      </div>

      {isHold ? (
        <div className="header-item-right">
          <div>分享者：</div>
          <div className="header-avator-wrapper">
            <img
              src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1593547847,1664926781&fm=26&gp=0.jpg"
              alt=""
            />
          </div>
          <div>蜘蛛子</div>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
