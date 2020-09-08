import React from "react";

const img = require('../resouces/earth.jpg');
const divStyle = {
  width: '100%',
  height: '1000px',
  backgroundImage: `url(${img})`,
  backgroundSize: 'cover',
};

export default class Mycomponent extends React.Component {
  render() {
    return (
      <div style={divStyle} >
        {this.props.children}
      </div>
    );
  }
}