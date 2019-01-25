import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

class SignInComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      socket: io('http://localhost:8000/'),
    };
  }

  onSubmit() {
    const { history } = this.props;
    const { socket } = this.state;

    socket.emit('client:chat:start', { aaa: 'aaa' });
    socket.on('server:chat:started', () => {
      history.push('/chat');
    });
  }

  render() {
    return (
      <Grid item xs={12} sm={8} md={6}>
        <FormControl margin="normal">
          <Button variant="contained" size="large" color="primary" onClick={this.onSubmit}>Start a conversation</Button>
        </FormControl>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => ({
  ...state,
});

const CompareList = connect(
  mapStateToProps,
)(SignInComponent);

export default CompareList;
