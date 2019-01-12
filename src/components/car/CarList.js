import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import {
  Button,
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Cars from './Cars';
import styles from './styles';
import { CARS_QUERY } from '../../utils/queries';

const CarList = ({ classes }) => {
  return(
    <div>
      <Link to="/create">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          className={`${classes.mrgn5} ${classes.pullRight}`}
        >
          Add Car
        </Button>
      </Link>
      <Query query={CARS_QUERY}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) {
            return <CircularProgress />
          }
          if (error) {
            return <div>Error fetching data</div>
          }

          const cars = data.cars;

          return(
            <Cars cars={cars} subscription={subscribeToMore} />
          )
        }}
      </Query>
    </div>
  );
}

export default withStyles(styles)(CarList);
