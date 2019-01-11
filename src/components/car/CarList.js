import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import {
  CARS_QUERY,
  DELETE_CAR_MUTATION,
  NEW_CARS_SUBSCRIPTION,
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
      <Query query={CARS_QUERY}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) {
            return <CircularProgress />
          }
          if (error) {
            return <div>Error fetching data</div>
          }

          this._subscribeToNewCars(subscribeToMore);

          const cars = data.cars;

          return(
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>VIN</TableCell>
                    <TableCell>Make</TableCell>
                    <TableCell>Model</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cars.map(car => {
                    const { id, title, vin, make, model, year } = car;
                    return(
                      <TableRow key={id}>
                        <TableCell component="th" scope="row">
                          {title}
                        </TableCell>
                        <TableCell>{vin}</TableCell>
                        <TableCell>{make}</TableCell>
                        <TableCell>{model}</TableCell>
                        <TableCell>{year}</TableCell>
                        <TableCell>
                          <Link to={`/edit/${id}`}>
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              Edit
                            </Button>
                          </Link>
                          <Mutation
                            mutation={DELETE_CAR_MUTATION}
                            variables={{ id }}
                          >
                            {deleteCarMutation => {
                              return(
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  size="small"
                                  onClick={deleteCarMutation}
                                >
                                  Delete
                                </Button>
                              )
                            }}
                          </Mutation>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Paper>
          )
        }}
      </Query>
    )
  }
}

export default CarList;
