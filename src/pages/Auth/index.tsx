import React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import Grid from '@material-ui/core/Grid';

type Props = {
  route?: RouteConfig;
};

const App = (props: Props) => {
  const { route = {} } = props;

  return (
    <Grid container justify="center">
      {renderRoutes(route.routes)}
    </Grid>
  );
};

export default App;
