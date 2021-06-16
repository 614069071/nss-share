import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Over from "../../components/over";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Colle from "./Colle";
import Hold from "./Hold";

export default class PC extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    const { hasHold, isOver, isNoHold, change } = this.props;

    return (
      <Fragment>
        <Header isHold={hasHold}></Header>

        <div className="app-inner-wrapper">
          {isOver ? (
            <Over />
          ) : isNoHold ? (
            <Colle />
          ) : hasHold ? (
            <Colle />
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
  change: () => {},
};

PC.propTypes = {
  hasHold: PropTypes.bool,
  isOver: PropTypes.bool,
  isNoHold: PropTypes.bool,
  change: PropTypes.func,
};
