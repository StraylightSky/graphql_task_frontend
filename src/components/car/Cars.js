import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import {
  NEW_CARS_SUBSCRIPTION,
  DELETE_CAR_MUTATION,
} from '../../utils/queries';

class Cars extends Component {
  componentDidMount() {
    const subscribeToMore = this.props.subscription;
    this._subscribeToNewCars(subscribeToMore);
  }

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
    let { cars } = this.props;
    const { classes, className } = this.props;
    const tableHeaders = [
      { name: 'Title' },
      { name: 'VIN' },
      { name: 'Make' },
      { name: 'Model' },
      { name: 'Year' },
      { name: 'Actions' },
    ];

    return(
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, i) => {
                return(
                  <TableCell key={`${header}-${i}`}>{header.name}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car, i) => {
              const { id, title, vin, make, model, year } = car;
              return(
                <TableRow key={`${car}-${i}`}>
                  <TableCell>{title}</TableCell>
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
                        className={classNames(classes.mrgn5, className)}
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
                        );
                      }}
                    </Mutation>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(Cars);
