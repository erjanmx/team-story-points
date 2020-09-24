import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <i>{this.props.value}</i>
    );
  }
}

export default Card;
