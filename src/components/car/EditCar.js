import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { CircularProgress } from '@material-ui/core';
import { CAR_QUERY } from '../../utils/queries';
import EditCarForm from './EditCarForm';

class EditCar extends Component {
  render() {
    const id = this.props.match.params.id;

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
}

export default EditCar;
