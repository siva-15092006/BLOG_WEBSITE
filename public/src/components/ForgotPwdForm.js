import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { forgotPwd, forgotPwdSuccess, forgotPwdFailure, resetUserFields } from '../actions/users';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import renderField from './renderField';


//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  return hasErrors && errors;
}


//For any field errors upon submission (i.e. not instant check)
const validateAndForgotPwd = (values, dispatch) => {
  return dispatch(forgotPwd(values))
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload.response) { //1st onblur
        return;
      }

      let {data, status} = result.payload.response;
      //if status is not 200 or any one of the fields exist, then there is a field error
      if (response.payload.status != 200) {
        //let other components know of error by updating the redux` state
        dispatch(forgotPwdFailure(data));
        throw data; //throw error
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(forgotPwdSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
      }
    });

};

class ForgotPwdForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }


  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="container">
        <h1><span style={{marginRight: '15px'}}>🔑</span>Forgot Password</h1>
        <form onSubmit={ handleSubmit(validateAndForgotPwd) }>
          <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <div style={{fontSize: '4rem', marginBottom: '10px'}}>🤔</div>
            <p style={{color: '#6b7280'}}>
              No worries! Enter your email and we'll help you reset your password.
            </p>
          </div>
          <Field
                 name="email"
                 type="email"
                 component={ renderField }
                 label="Email*" />
          <div style={{marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center'}}>
            <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={ submitting }
                    style={{padding: '12px 30px', fontSize: '1rem', borderRadius: '25px'}}>
              <span style={{marginRight: '8px'}}>📧</span>Send Reset Link
            </button>
            <Link
                  to="/"
                  className="btn btn-error"
                  style={{padding: '12px 30px', fontSize: '1rem', borderRadius: '25px'}}>
              <span style={{marginRight: '8px'}}>❌</span>Cancel
            </Link>
          </div>
          <div style={{marginTop: '30px', textAlign: 'center', padding: '20px', background: '#f8fafc', borderRadius: '15px'}}>
            <p style={{color: '#4b5563', fontWeight: '500', margin: 0}}>🔐 Remember your password? <Link to="/signin" style={{fontWeight: '700', color: '#2563eb'}}>Sign in here</Link></p>
          </div>
        </form>
      </div>

      );
  }
}

export default reduxForm({
  form: 'ForgotPwdForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(ForgotPwdForm)