import React from 'react';
import { Query } from 'react-apollo';
import { CircularProgress } from '@material-ui/core';
import { CAR_QUERY } from '../../utils/queries';
import EditCarForm from './EditCarForm';

const EditCar = ({ match }) => {
  const { id } = match.params;
  return(
    <Query query={CAR_QUERY} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <CircularProgress />
        }
        if (error) {
          return <div>Error fetching data</div>
        }

        return(
          <EditCarForm car={data.car} />
        )
      }}
    </Query>
  )
}

export default EditCar;
