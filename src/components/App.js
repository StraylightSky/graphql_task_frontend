import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import CarList from './car/CarList';
import CreateCar from './car/CreateCar';

class App extends Component {
  render() {
    return(
      <div className="center w85">
        <Header/>
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" component={CarList} />
            <Route exact path="/create" component={CreateCar} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
