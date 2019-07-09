import React, { Component } from "react";

const styles = {};

class Slide extends Component {
  styles = {
    backgroundImage: `url(${this.props.image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 60%"
  };

  render() {
    return (
      <div
        onClick={this.props.handleSliderClick}
        className="slide"
        style={this.styles}
      />
    );
  }
}

export default Slide;
