import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { Button } from '@material-ui/core';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ReusableTable from '../Table';
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
    const tableHeader = [
      { name: 'Title' },
      { name: 'VIN' },
      { name: 'Make' },
      { name: 'Model' },
      { name: 'Year' },
      { name: 'Actions' },
    ];
    cars = cars.map((car) => {
      const { id, title, vin, make, model, year } = car;
      return {
        cells: [
          { data: title },
          { data: vin },
          { data: make },
          { data: model },
          { data: year },
          { data: (
              <div>
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
              </div>
            )
          },
        ],
      }
    });

    return(
      <ReusableTable
        headers={tableHeader}
        rows={cars}
      />
    );
  }
}

export default withStyles(styles)(Cars);
