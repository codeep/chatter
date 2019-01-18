import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import InputRenderer from '../../../../components/InputRenderer';

import { auth, users } from 'store';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
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
      signedIn: false,
      wrongEmailOrPassword: false,
    };
  }

  render() {
    const { submitSignIn, currentUser } = this.props;
    const { signedIn, wrongEmailOrPassword } = this.state;
    const initialValues: any = {};
    signInInputs.forEach((input) => initialValues[input.name] = '');

    if(signedIn) {
      return (<Redirect to='/' />);
    }

    return (
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h2" gutterBottom>
          Sign in
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={(values, actions) => {
            submitSignIn(values)
              .then(({ response: { authToken } }: any) => {
                if(authToken) {
                  localStorage.setItem('auth-token', authToken);
                  return currentUser()
                    .then(() => this.setState({signedIn: true}));
                }

                this.setState({
                  wrongEmailOrPassword: true,
                });
              })
              .catch(() => {
                this.setState({
                  wrongEmailOrPassword: true,
                });
              })
          }}
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
                  />
                )
              }
              <Typography color='error' align='center'>
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
  currentUser: () => dispatch(users.fetchCurrent()),
});

const CompareList = connect(
  null,
  mapDispatchToProps,
)(SignInComponent)

export default CompareList;