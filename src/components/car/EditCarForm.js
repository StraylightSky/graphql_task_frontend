import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import {
  Button,
  TextField,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { UPDATE_CAR_MUTATION } from '../../utils/queries';

class EditCarForm extends Component {
  constructor(props) {
    super(props);
    const { id, title, vin, make, model, year } = this.props.car;
    this.state = {
      id,
      title,
      vin,
      make,
      model,
      year,
    }
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
    const { id, title, vin, make, model, year } = this.state;
    const { classes } = this.props;

    return(
      <div>
        <Typography variant="h4">
          Editing Car
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
          mutation={UPDATE_CAR_MUTATION}
          variables={{ id, title, vin, make, model, year }}
        >
          {updateCarMutation => {
            return(
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={updateCarMutation}
                className={classes.mrgn5}
              >
                Update
              </Button>
            );
          }}
        </Mutation>
        <Link to="/">
          <Button
            variant="contained"
            color="default"
            size="medium"
            className={classes.mrgn5}
          >Cancel</Button>
        </Link>
      </div>
    )
  }
}

export default withStyles(styles)(EditCarForm);
