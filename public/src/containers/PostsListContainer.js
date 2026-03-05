import { connect } from 'react-redux'
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from '../actions/posts';
import PostsList from '../components/PostsList';


const mapStateToProps = (state) => {
  return { 
    postsList: state.posts.postsList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts()).then((response) => {
            if (!response.error && response.payload && response.payload.data) {
              dispatch(fetchPostsSuccess(response.payload.data));
            } else {
              const errorData = (response.payload && response.payload.response && response.payload.response.data) || { message: 'Network error - Backend server may not be running' };
              dispatch(fetchPostsFailure(errorData));
            }
          }).catch((err) => {
            dispatch(fetchPostsFailure({ message: 'Network error - Backend server may not be running' }));
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);