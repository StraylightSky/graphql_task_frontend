import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  grow: {
    flexGrow: 1,
  },
  unvisited: {
    color: '#FF0000',
  },
  white: {
    color: '#FFFFFF',
  }
};

class Header extends Component {
  render() {
    const { classes } = this.props;
    return(
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={`${classes.grow} ${classes.white}`}>
              Toad's Garage
            </Typography>
            <Link to="/" className={classes.unvisited}>
              <Button className={classes.white}>Home</Button>
            </Link>
            <Link to="/create" className={classes.unvisited}>
              <Button className={classes.white}>Create Car</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Header));
