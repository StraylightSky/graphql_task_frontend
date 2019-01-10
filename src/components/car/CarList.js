import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Car from './Car';
import {
  CAR_QUERY,
  NEW_CARS_SUBSCRIPTION
} from '../../utils/queries';

class CarList extends Component {
  _subscribeToNewCars = subscribeToMore => {
    subscribeToMore({
      document: NEW_CARS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }

        const newCar = subscriptionData.data.newCar;

        return Object.assign({}, prev, {
          cars: [...prev.cars, newCar],
          __typename: prev.cars.__typename,
        })
      }
    });
  }

  render() {
    return(
      <Query query={CAR_QUERY}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) {
            return <div>Fetching...</div>
          }
          if (error) {
            return <div>Error fetching data</div>
          }

          this._subscribeToNewCars(subscribeToMore);

          const cars = data.cars;

          return(
            <div>
              {cars.map(car => <Car key={car.id} car={car} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default CarList;
