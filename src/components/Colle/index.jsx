import React from "react";
import PropTypes from "prop-types";

// 文件列表
export default class Colle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    return (
      <div>
        <header>files</header>
      </div>
    );
  }
}

Colle.defaultProps = {};

Colle.propTypes = {
  data: PropTypes.string,
};
