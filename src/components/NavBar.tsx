import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const styles = (theme: any) => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class NavBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      signedOut: false,
    };

    this.handleSignOut =  this.handleSignOut.bind(this);
  }
  handleSignOut() {
    localStorage.removeItem('auth-token');

    this.setState({
      signedOut: true,
    });
  }

  render() {
    const { classes } = this.props;
    const { signedOut } = this.state;

    if(signedOut) {
      return <Redirect to='/sign-in' />; 
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              News
            </Typography>
            <Button color="inherit" onClick={this.handleSignOut}>Sign out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);