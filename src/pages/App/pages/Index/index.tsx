import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class SignInComponent extends Component<any, any> {
  render() {
    return (
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h2" gutterBottom>
          Main page
        </Typography>
      </Grid>
    );
  }
}

const CompareList = connect(
  null,
  null,
)(SignInComponent)

export default CompareList;