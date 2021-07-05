import logo from "@/images/logo.png";
import "./index.css";

function Header() {
  return (
    <header className="m-app-header-wrapper">
      <div className="m-app-header-inner">
        <div
          className="m-header-avator-wrapper"
          style={{ backgroundImage: `url(${logo})` }}
        ></div>
      </div>

      <div className="m-share-user-wrapper">
        <div className="m-share-user-inner-wrapper">
          <div className="m-user-image-wrapper">
            <img
              src="https://dss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/netdisk.1.18ad9bc4.-suxkK7XcG8XVe7JNQGaMg.jpg"
              alt=""
            />
          </div>
          <div>离子007的分享</div>
        </div>
      </div>
    </header>
  );
}
export default Header;
