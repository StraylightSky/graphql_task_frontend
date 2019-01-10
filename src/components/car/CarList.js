import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Car from './Car';

const QUERY = gql`
  {
    cars {
      id
      title
      vin
      make
      model
      year
    }
  }
`

class CarList extends Component {
  render() {
    return(
      <Query query={QUERY}>
        {({ loading, error, data }) => {
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
