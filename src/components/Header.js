import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Header = ({ classes }) => {
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
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(withRouter(Header));
