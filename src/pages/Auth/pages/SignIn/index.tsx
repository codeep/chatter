import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import InputRenderer from 'components/InputRenderer';

import { auth, users } from 'store';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const SignInSchema = yup.object().shape({
  emailOrPhone: yup.string()
    .email('Invalid email')
    .required('Required'),
  password: yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const signInInputs = [{
  name: 'emailOrPhone',
  label: 'Email',
  type: 'text',
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
}];

class SignInComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      wrongEmailOrPassword: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values: any, actions: any) {
    const { submitSignIn, fetchCurrentUser, history } = this.props;

    submitSignIn(values)
      .then(({ response: { token } }: any) => {
        if (token) {
          localStorage.setItem('auth-token', token);
          return fetchCurrentUser()
            .then(() => history.push('/'));
        }

        this.setState({
          wrongEmailOrPassword: true,
        });
      })
      .catch(() => {
        this.setState({
          wrongEmailOrPassword: true,
        });
      });
  }

  render() {
    const { wrongEmailOrPassword } = this.state;
    const initialValues: any = {};
    signInInputs.forEach((input) => initialValues[input.name] = '');

    return (
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h2" gutterBottom>
          Sign in
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={this.onSubmit}
          render={({ values, handleChange, errors, touched }: any) => (
            <Form>
              {
                signInInputs.map((input) =>
                  <InputRenderer
                    key={input.name}
                    {...input}
                    value={values[input.name]}
                    errors={errors}
                    touched={touched}
                    handler={handleChange}
                    formControlProps={{
                      fullWidth: true,
                      margin: 'normal',
                    }}
                  />)
              }
              <Typography color="error" align="center">
                {wrongEmailOrPassword && 'Wrong email or password'}
              </Typography>
              <FormControl fullWidth={true} margin="normal">
                <Button type="submit" variant="contained" size="large" color="primary">
                  Sign in
                </Button>
              </FormControl>
              <Typography align="center">or <Link to="/sign-up">Sign up</Link></Typography>
            </Form>
          )}
        />
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  submitSignIn: (values: any) => dispatch(auth.signIn(values)),
  fetchCurrentUser: () => dispatch(users.fetchCurrent()),
});

const CompareList = connect(
  null,
  mapDispatchToProps,
)(SignInComponent);

export default CompareList;
