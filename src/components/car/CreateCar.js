import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import { CREATE_CAR_MUTATION } from '../../utils/queries';

class CreateCar extends Component {
  componentWillMount() {
    const year = new Date().getFullYear();
    this.setState({
      title: '',
      vin: '',
      make: '',
      model: '',
      year,
    });
  }

  onTitleChangeHandler = (ev) => this.updateCarProperty(ev);
  onVinChangeHandler = (ev) => this.updateCarProperty(ev);
  onMakeChangeHandler = (ev) => this.updateCarProperty(ev);
  onModelChangeHandler = (ev) => this.updateCarProperty(ev);
  onYearChangeHandler = (ev) => this.updateCarProperty(ev);

  updateCarProperty = (ev) => {
    const property = ev.target.name;
    let value = ev.target.value;
    if (property === 'year') {
      value  = parseInt(value);
    }
    this.setState({ [property]: value });
  }

  render() {
    const { title, vin, make, model, year } = this.state;

    return(
      <div>
        <Typography variant="h4" gutterBottom>
          Create New Car
        </Typography>
        <div className="flex flex-column mt3">
          <TextField
            required
            name="title"
            label="Title"
            value={title}
            onChange={this.onTitleChangeHandler}
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="vin"
            label="VIN"
            value={vin}
            onChange={this.onVinChangeHandler}
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="make"
            label="Make"
            value={make}
            onChange={this.onMakeChangeHandler}
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="model"
            label="Model"
            value={model}
            onChange={this.onModelChangeHandler}
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="year"
            label="Year"
            value={year}
            onChange={this.onYearChangeHandler}
            margin="normal"
            variant="outlined"
          />
        </div>
        <Mutation
          mutation={CREATE_CAR_MUTATION}
          variables={{ title, vin, make, model, year }}
          onCompleted={() => this.props.history.push('/')}
        >
          {createCarMutation => {
            return(
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={createCarMutation}
              >
                Create
              </Button>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default CreateCar;
