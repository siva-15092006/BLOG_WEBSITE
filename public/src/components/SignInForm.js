import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import { signInUser, signInUserSuccess, signInUserFailure, resetUserFields } from '../actions/users';

//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  return hasErrors && errors;
}

//For any field errors upon submission (i.e. not instant check)
const validateAndSignInUser = (values, dispatch) => {
  return dispatch(signInUser(values))
    .then((result) => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(signInUserFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }

      //Store JWT Token to browser session storage 
      //If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
      //sessionStorage = persisted only in current tab
      sessionStorage.setItem('jwtToken', result.payload.data.token);
      //let other components know that everything is fine by updating the redux` state
      dispatch(signInUserSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
    });
};



class SignInForm extends Component {
  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      this.props.history.push('/');
    }

    //error
    //Throw error if it was not already thrown (check this.props.user.error to see if alert was already shown)
    //If u dont check this.props.user.error, u may throw error multiple times due to redux-form's validation errors
    if (nextProps.user.status === 'signin' && !nextProps.user.user && nextProps.user.error && !this.props.user.error) {
      alert(nextProps.user.error.message);
    }
  }

  render() {
    const {asyncValidating, handleSubmit, submitting} = this.props;
    return (
      <div className="container">
        <h1><span style={{marginRight: '15px'}}>🔐</span>Sign In</h1>
        <form onSubmit={ handleSubmit(validateAndSignInUser) }>
          <div style={{textAlign: 'center', marginBottom: '25px'}}>
            <div style={{fontSize: '4rem', marginBottom: '10px'}}>👋</div>
            <p style={{color: '#6b7280'}}>Welcome back! Please sign in to continue.</p>
          </div>
          <Field
                 name="username"
                 type="text"
                 component={ renderField }
                 label="Username*" />
          <Field
                 name="password"
                 type="password"
                 component={ renderField }
                 label="Password*" />
          <div style={{marginTop: '25px', display: 'flex', gap: '15px', justifyContent: 'center'}}>
            <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={ submitting }>
              <span style={{marginRight: '8px'}}>🚀</span>Sign In
            </button>
            <Link
                  to="/"
                  className="btn btn-error"><span style={{marginRight: '8px'}}>❌</span>Cancel
            </Link>
          </div>
          <div style={{marginTop: '30px', textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '15px'}}>
            <p style={{color: '#4b5563', fontWeight: '500', marginBottom: '10px'}}>✨ Don't have an account? <Link to="/signup" style={{fontWeight: '700', color: '#2563eb'}}>Sign up here</Link></p>
            <p style={{color: '#4b5563', fontWeight: '500', margin: 0}}>🔑 <Link to="/forgotPwd" style={{color: '#2563eb'}}>Forgot password?</Link></p>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(reduxForm({
  form: 'SignInForm', // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(SignInForm))

