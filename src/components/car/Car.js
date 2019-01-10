import React, { Component } from 'react';

class Car extends Component {
  render() {
    return(
      <div>
        <div>
          <h1>{this.props.car.title}</h1>
          <p>{this.props.car.vin}</p>
          <p>{this.props.car.make}</p>
          <p>{this.props.car.mode}</p>
          <p>{this.props.car.year}</p>
        </div>
      </div>
    )
  }
}

export default Car;
