import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../actions/posts';
import Header from '../containers/HeaderContainer.js';
import PostDetailsContainer from '../containers/PostDetailsContainer.js';

class PostsShow extends Component {
  onDeleteClick() {
    this.props.deletePost(this.props.match.params.id)
      .then(() => { this.props.history.push('/'); });
  }

  render() {
    return (
      <div className='container'>
        <Header type="posts_show" postId={this.props.match.params.id}/>
        <PostDetailsContainer id={this.props.match.params.id}/>
      </div>
    );
  }
}

export default withRouter(connect(null, { deletePost })(PostsShow));
