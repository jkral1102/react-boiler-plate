// Material-UI App Bar with Buttons component found here - https://material-ui.com/demos/app-bar/
import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SimpleMenu from './Menu';


const styles = {
  root: {
    flexGrow: 1,
  },
  // grow: {
  //   flexGrow: 1,
  // },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  header: {
    backgroundColor: '#B5838D'
  },
  headerText: {
    textAlign: 'center',
    flexGrow: 1,
  },
  login: {
    color: 'white',
    backgroundColor: '#3f51b5'
  }
};

function ButtonAppBar(props) {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
        <SimpleMenu />
    <div style={{ 'width': '90vw'}}>
          <Typography className={classes.headerText} variant="h6" color="inherit">
           PHP Laravel/React Todo List
          </Typography>

          <Typography className={classes.headerText} variant="h6" color="inherit">
           Jennifer Kral
          </Typography>
</div>
          <Link to="/login" style={{ textDecoration: 'none'}}>
               <Button color='primary' style={styles.login}>Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(ButtonAppBar);
