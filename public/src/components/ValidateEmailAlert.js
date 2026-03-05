import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class ValidateEmailAlert extends Component {
  componentDidMount() {
    //automatically verify for token if autoValidateToken is set to true (e.g. in ValidateEmail *page*)
    if(this.props.autoValidateToken) {
      this.props.validateEmail(this.props.token);
    }
  }

  componentWillReceiveProps(nextProps) {
    //if user is authenticated, then reroute the user to PostsList as authenticated user
    if(nextProps.user && nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount() {
    this.props.resetMe();
  }


  getAlertMessage() {
    const resendEmailError = this.props.resendEmail.error && this.props.resendEmail.error.message;
    const validationError = this.props.user.error &&  this.props.user.error.message;

    if(resendEmailError || validationError) {
      return resendEmailError || validationError;
    } else if(this.props.user.user && !this.props.user.user.isEmailVerified) {
      if(this.props.resendEmail.sentAgain) {//if the user has pressed the 'resend' button
        return 'Resent Email. Please verify';
      } else {
        return 'Please verify email';
      }
    }
  }

  render() {
    let alertMessage = this.getAlertMessage();

    if(alertMessage) {
      return (
        <div className="container">
          <div className="alert alert-warning" style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderRadius: '15px',
            padding: '18px 25px',
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            border: 'none',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.2)'
          }}>
            <span style={{display: 'flex', alignItems: 'center', fontWeight: '500', color: '#92400e'}}>
              <span style={{marginRight: '10px', fontSize: '1.2rem'}}>⚠️</span>
              {this.getAlertMessage()}
            </span>
            <span>
              <a 
                style={{marginLeft: '20px', cursor: 'pointer', color: '#2563eb', fontWeight: '600', textDecoration: 'none'}} 
                onClick={this.props.resend} 
                href="javascript:void(0)"
              >
                <span style={{marginRight: '5px'}}>📨</span>
                Resend
              </a>
              <Link style={{marginLeft: '20px', color: '#2563eb', fontWeight: '600', textDecoration: 'none'}} to='/profile'>
                <span style={{marginRight: '5px'}}>✏️</span>
                Update Email
              </Link>
            </span>
          </div>
        </div>
      );
    } else {
      return <span/>
    }
  }
}

export default withRouter(ValidateEmailAlert);