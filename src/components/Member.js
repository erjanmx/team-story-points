import React, { Component } from "react";

class Member extends Component {
  render() {
    return (<div>{this.props.type.name}</div>)
  }
}

export default Member;
