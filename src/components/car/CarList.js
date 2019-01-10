import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Car from './Car';
import { CAR_QUERY } from '../../utils/queries';

class CarList extends Component {
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
