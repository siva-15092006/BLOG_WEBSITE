import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import { validatePostFields, validatePostFieldsSuccess, validatePostFieldsFailure } from '../actions/posts';
import { createPost, createPostSuccess, createPostFailure, resetNewPost } from '../actions/posts';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }
  if (!values.categories || values.categories.trim() === '') {
    errors.categories = 'Enter categories';
  }
  if (!values.content || values.content.trim() === '') {
    errors.content = 'Enter some content';
  }

  return errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {
  return dispatch(validatePostFields(values))
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload || !result.payload.response) { //1st onblur or no response
        return {};
      }

      let {data, status} = result.payload.response;
      //if status is not 200 or any one of the fields exist, then there is a field error
      if (status != 200 || data.title || data.categories || data.description) {
        //let other components know of error by updating the redux` state
        dispatch(validatePostFieldsFailure(data));
        throw data; //throw error
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(validatePostFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
        return {};
      }
    })
    .catch((err) => {
      // If it's a validation error object, throw it
      if (err && typeof err === 'object' && (err.title || err.categories || err.description)) {
        throw err;
      }
      // Otherwise return empty (no validation errors)
      return {};
    });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndCreatePost = (values, dispatch) => {
  return dispatch(createPost(values, sessionStorage.getItem('jwtToken')))
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createPostFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      //let other components know that everything is fine by updating the redux` state
      dispatch(createPostSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
    });
}



class PostsForm extends Component {
  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost.post && !nextProps.newPost.error) {
      this.props.history.push('/');
    }
  }

  renderError(newPost) {
    if (newPost && newPost.error && newPost.error.message) {
      return (
        <div className="alert alert-danger">
          { newPost ? newPost.error.message : '' }
        </div>
        );
    } else {
      return <span></span>
    }
  }
  render() {
    const {handleSubmit, submitting, newPost} = this.props;
    return (
      <div className='container'>
        <h1><span style={{marginRight: '15px'}}>✍️</span>Create New Post</h1>
        { this.renderError(newPost) }
        <form onSubmit={ handleSubmit(validateAndCreatePost) } autoComplete="off">
          <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <div style={{fontSize: '3rem', marginBottom: '10px'}}>📝</div>
            <p style={{color: '#6b7280'}}>Share your thoughts with the world! ✨</p>
          </div>
          <Field
                 name="title"
                 type="text"
                 component={ renderField }
                 label="Title*"
                 autoComplete="off" />
          <Field
                 name="categories"
                 type="text"
                 component={ renderField }
                 label="Categories* (comma separated)"
                 autoComplete="off" />
          <Field
                 name="content"
                 component={ renderTextArea }
                 label="Content*" />
          <div style={{marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center'}}>
            <button
                    type="submit"
                    className="btn btn-success"
                    disabled={ submitting }
                    style={{padding: '12px 30px', fontSize: '1rem', borderRadius: '25px'}}>
              <span style={{marginRight: '8px'}}>🚀</span>Publish Post
            </button>
            <Link
                  to="/"
                  className="btn btn-error"
                  style={{padding: '12px 30px', fontSize: '1rem', borderRadius: '25px'}}>
              <span style={{marginRight: '8px'}}>❌</span>Cancel
            </Link>
          </div>
          <div style={{marginTop: '25px', textAlign: 'center', padding: '15px', background: '#f0f9ff', borderRadius: '10px'}}>
            <p style={{color: '#0369a1', margin: 0, fontSize: '0.9rem'}}>💡 Tip: Use descriptive categories to help others find your post!</p>
          </div>
        </form>
      </div>
    )
  }
}


export default withRouter(reduxForm({
  form: 'PostsForm', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
  asyncValidate
})(PostsForm))
