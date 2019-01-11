import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
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

  onTitleChangeHandler = (ev) => this.updateCarProperty('title', ev);
  onVinChangeHandler = (ev) => this.updateCarProperty('vin', ev);
  onMakeChangeHandler = (ev) => this.updateCarProperty('make', ev);
  onModelChangeHandler = (ev) => this.updateCarProperty('model', ev);
  onYearChangeHandler = (ev) => this.updateCarProperty('year', ev);

  updateCarProperty = (property, ev) => {
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
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            name="title"
            value={title}
            onChange={this.onTitleChangeHandler}
            type="text"
            placeholder="Title"
          />
          <input
            className="mb2"
            name="vin"
            value={vin}
            onChange={this.onVinChangeHandler}
            type="text"
            placeholder="vin"
          />
          <input
            className="mb2"
            name="make"
            value={make}
            onChange={this.onMakeChangeHandler}
            type="text"
            placeholder="make"
          />
          <input
            className="mb2"
            name="model"
            value={model}
            onChange={this.onModelChangeHandler}
            type="text"
            placeholder="model"
          />
          <input
            className="mb2"
            name="year"
            value={year}
            onChange={this.onYearChangeHandler}
            type="text"
            placeholder="year"
          />
        </div>
        <Mutation
          mutation={CREATE_CAR_MUTATION}
          variables={{ title, vin, make, model, year }}
          onCompleted={() => this.props.history.push('/')}
        >
          {createCarMutation => <button onClick={createCarMutation}>Create Car</button>}
        </Mutation>
      </div>
    );
  }
}

export default CreateCar;
