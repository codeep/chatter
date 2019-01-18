import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

import { withStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Grid from '@material-ui/core/Grid';

import NavBar from 'components/NavBar';


const styles = (theme: Theme) => ({
  rootContainer: {
    padding: '15px',
  },
});

type Props = {
  route?: RouteConfig;
  classes: any;
  history: any;
};

const App = (props: Props) => {
  const { route = {}, classes, history } = props;

  return (
    <>
      <NavBar history={history} />
      <div className={classes.rootContainer}>
        <Grid container justify="center">
          {renderRoutes(route.routes)}
        </Grid>
      </div>
    </>
  );
};

export default withStyles(styles)(App);
