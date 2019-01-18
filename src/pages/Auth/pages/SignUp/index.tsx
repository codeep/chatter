import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

import InputRenderer from 'components/InputRenderer';

import { auth } from 'store';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';


const SignUpSchema = yup.object().shape({
  firstName: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  emailOrPhone: yup.string()
    .email('Invalid email')
    .required('Required'),
  gender: yup.string()
    .required('Required'),
  birthDay: yup.string()
    .required('Required'),
  password: yup.string()
    .min(6, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const signUpInputs = [{ 
  name: 'firstName',
  label: 'First name',
  type: 'text',
}, { 
  name: 'lastName',
  label: 'Last name',
  type: 'text',
}, { 
  name: 'emailOrPhone',
  label: 'Email',
  type: 'text',
}, { 
  name: 'gender',
  label: 'Gender',
  type: 'select',
  values: {
    male: "Male",
    female: "Female",
  },
}, { 
  name: 'birthDay',
  label: 'Birth day',
  type: 'date',
}, { 
  name: 'password',
  label: 'Password',
  type: 'password',
}];

class SignUpComponent extends Component<any, any> {
  render() {
    const { submitSignUp } = this.props;
    const initialValues: any = {};
    signUpInputs.forEach((input) => initialValues[input.name] = '');

    return (
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h2" gutterBottom>
          Sign up
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={SignUpSchema}
          onSubmit={(values, actions) => {
            submitSignUp(values);
          }}
          render={({ values, handleChange, errors, touched }: any) => (
            <Form>
              {
                signUpInputs.map((input) =>
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
              <FormControl fullWidth={true} margin="normal">
                <Button type="submit" variant="contained" size="large" color="primary">
                  Sign up
                </Button>
              </FormControl>
              <Typography align="center">or <Link to="/sign-in">Sign in</Link></Typography>
            </Form>
          )}
        />
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  submitSignUp: (values: any) => dispatch(auth.signUp(values)),
});

const CompareList = connect(
  null,
  mapDispatchToProps,
)(SignUpComponent)

export default CompareList;