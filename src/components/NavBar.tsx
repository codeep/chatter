import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = (theme: any): any => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

type Props = {
  classes: any;
  history: any;
  currentUser: any;
};

class NavBar extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignOut() {
    const { history } = this.props;

    localStorage.removeItem('auth-token');
    history.push('/sign-in');
  }

  render() {
    const { classes, currentUser: { firstName } } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {firstName}
            </Typography>
            <Link to="/chat">Chat</Link>
            <Button color="inherit" onClick={this.handleSignOut}>Sign out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
