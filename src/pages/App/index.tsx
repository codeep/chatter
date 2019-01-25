import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes, RouteConfig } from 'react-router-config';
import io from 'socket.io-client';

import { users } from 'store';

import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Grid from '@material-ui/core/Grid';

import NavBar from 'components/NavBar';

const styles = (theme: Theme) => ({
  navBar: {
    height: '75px',
    position: 'relative' as 'relative',
  },
  rootContainer: {
    padding: '75px 15px 0px 15px',
    position: 'relative' as 'relative',
    top: '-75px',
    minHeight: '100%',
    height: '100%',
  },
  rootGridContainer: {
    minHeight: '100%',
    height: '100%',
  },
});

type Props = {
  route?: RouteConfig;
  classes: any;
  history: any;
  fetchCurrentUser: any;
};

class App extends Component<Props, any> {
  constructor(props: any) {
    super(props);

    console.log("ASDASDASdASd");
    const socket = io('http://localhost:8000/');
    
    this.state = {
      currentUser: null,
      socket,
    };
  }

  componentDidMount() {
    const { fetchCurrentUser } = this.props;

    fetchCurrentUser()
      // tslint:disable-next-line:no-shadowed-variable
      .then(({ response: { entities: { users }, result } }: any) => this.setState({
        currentUser: users[result],
      }));
  }

  render() {
    const { route = {}, classes, history } = this.props;
    const { currentUser, socket } = this.state;

    if (!currentUser) {
      return <div/>;
    }

    return (
      <>
        <NavBar history={history} currentUser={currentUser} classes={{root: classes.navBar}} />
        <div className={classes.rootContainer}>
          <Grid container justify="center" classes={{container: classes.rootGridContainer}}>
            {renderRoutes(route.routes, {
              socket,
            })}
          </Grid>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchCurrentUser: () => dispatch(users.fetchCurrent()),
});

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(App));
