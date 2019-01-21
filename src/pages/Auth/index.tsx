import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) => ({
  rootContainer: {
    padding: '15px',
  },
});

type Props = {
  route?: RouteConfig;
  classes: any;
};

const Auth = (props: Props) => {
  const { route = {}, classes } = props;

  return (
    <div className={classes.rootContainer}>
      <Grid container justify="center">
        {renderRoutes(route.routes)}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Auth);
