import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import { validateUserFields, validateUserFieldsSuccess, validateUserFieldsFailure, resetValidateUserFields } from '../actions/validateUserFields';
import { signUpUser, signUpUserSuccess, signUpUserFailure, } from '../actions/users';

//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter a name';
    hasErrors = true;
  }
  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  if (!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Enter Confirm Password';
    hasErrors = true;
  }

  if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
    errors.password = 'Password And Confirm Password don\'t match';
    errors.password = 'Password And Confirm Password don\'t match';
    hasErrors = true;
  }
  return hasErrors && errors;
}



// //For instant async server validation
const asyncValidate = (values, dispatch) => {
  return dispatch(validateUserFields(values))
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload || !result.payload.response) { //1st onblur or no response
        return {};
      }

      let {data, status} = result.payload.response;

      //if status is not 200 or any one of the fields exist, then there is a field error
      if (status != 200 || data.username || data.email) {
        //let other components know of error by updating the redux` state
        dispatch(validateUserFieldsFailure(data));
        throw data;
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(validateUserFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
        return {};
      }
    })
    .catch((err) => {
      // If it's a validation error object, throw it
      if (err && typeof err === 'object' && (err.username || err.email)) {
        throw err;
      }
      // Otherwise return empty (no validation errors)
      return {};
    });
};



//For any field errors upon submission (i.e. not instant check)
const validateAndSignUpUser = (values, dispatch) => {
  return dispatch(signUpUser(values))
    .then((result) => {

      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(signUpUserFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }

      //Store JWT Token to browser session storage 
      //If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
      //sessionStorage = persisted only in current tab
      sessionStorage.setItem('jwtToken', result.payload.data.token);
      //let other components know that everything is fine by updating the redux` state
      dispatch(signUpUserSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
    });
};


class SignUpForm extends Component {
  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      this.props.history.push('/');
    }
  }

  render() {
    const {asyncValidating, handleSubmit, submitting, asyncValidate, validate} = this.props;
    return (
      <div className='container'>
        <h1><span style={{marginRight: '15px'}}>✨</span>Sign Up</h1>
        <form onSubmit={ handleSubmit(validateAndSignUpUser) }>
          <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <div style={{fontSize: '4rem', marginBottom: '10px'}}>🎉</div>
            <p style={{color: '#6b7280'}}>Join our community and start sharing!</p>
          </div>
          <Field
                 name="name"
                 type="text"
                 component={ renderField }
                 label="Full Name*" />
          <Field
                 name="username"
                 type="text"
                 component={ renderField }
                 label="Username*" />
          <Field
                 name="email"
                 type="email"
                 component={ renderField }
                 label="Email*" />
          <Field
                 name="password"
                 type="password"
                 component={ renderField }
                 label="Password*" />
          <Field
                 name="confirmPassword"
                 type="password"
                 component={ renderField }
                 label="Confirm Password*" />
          <div style={{marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center'}}>
            <button
                    type="submit"
                    className="btn btn-success"
                    disabled={ submitting }
                    style={{padding: '12px 30px', fontSize: '1rem', borderRadius: '25px'}}>
              <span style={{marginRight: '8px'}}>🚀</span>Create Account
            </button>
            <Link
                  to="/"
                  className="btn btn-error"
                  style={{padding: '12px 30px', fontSize: '1rem', borderRadius: '25px'}}>
              <span style={{marginRight: '8px'}}>❌</span>Cancel
            </Link>
          </div>
          <div style={{marginTop: '30px', textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '15px'}}>
            <p style={{color: '#4b5563', fontWeight: '500', margin: 0}}>🔐 Already have an account? <Link to="/signin" style={{fontWeight: '700', color: '#2563eb'}}>Sign in here</Link></p>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(reduxForm({
  form: 'SignUpForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  asyncValidate
})(SignUpForm))

