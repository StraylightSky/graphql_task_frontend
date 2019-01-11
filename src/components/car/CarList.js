import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation, Query } from 'react-apollo';
import classNames from 'classnames';
import {
  Button,
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ReusableTable from '../Table';
import {
  CARS_QUERY,
  DELETE_CAR_MUTATION,
  NEW_CARS_SUBSCRIPTION,
} from '../../utils/queries';

const styles = {
  mrgn5: {
    margin: '5px',
  },
};

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
    const { classes, className } = this.props;
    const tableHeader = [
      { name: 'Title' },
      { name: 'VIN' },
      { name: 'Make' },
      { name: 'Model' },
      { name: 'Year' },
      { name: 'Actions' },
    ];

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

          const cars = data.cars.map((car) => {
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
          })

          return(
            <ReusableTable
              headers={tableHeader}
              rows={cars}
            />
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(CarList);
