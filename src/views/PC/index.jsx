import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Over from "./Over";
import Header from "./Header";
import Footer from "./Footer";
import Colle from "./Colle";
import Hold from "./Hold";

export default class PC extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { hasHold, isOver, isNoHold, change, link, overCode } = this.props;

    return (
      <Fragment>
        <Header isHold={hasHold}></Header>

        <div className="app-inner-wrapper">
          {isOver ? (
            <Over code={overCode} />
          ) : isNoHold ? (
            <Colle link={link} />
          ) : hasHold ? (
            <Colle link={link} />
          ) : (
            <Hold change={change} />
          )}
        </div>

        <Footer></Footer>
      </Fragment>
    );
  }
}

PC.defaultProps = {
  hasHold: false,
  isOver: false,
  isNoHold: false,
  link: "",
  change: () => {},
};

PC.propTypes = {
  hasHold: PropTypes.bool,
  isOver: PropTypes.bool,
  isNoHold: PropTypes.bool,
  link: PropTypes.string,
  change: PropTypes.func,
};
