import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class PostDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchPost(this.props.postId);
  }

  getPostEmoji(title) {
    if (!title) return '📝';
    const titleLower = title.toLowerCase();
    if (titleLower.includes('react')) return '⚛️';
    if (titleLower.includes('redux')) return '🔄';
    if (titleLower.includes('javascript') || titleLower.includes('js')) return '💛';
    if (titleLower.includes('tutorial') || titleLower.includes('learn')) return '📚';
    if (titleLower.includes('welcome') || titleLower.includes('hello')) return '👋';
    if (titleLower.includes('tip') || titleLower.includes('trick')) return '💡';
    return '📝';
  }

  renderCategories(categories) {
    if (!categories) return null;
    const catArray = typeof categories === 'string' ? categories.split(',') : categories;
    return catArray.map((c, index) => (
      <span key={index} className="list-group-item-text" style={{marginRight: '8px'}}>
        {c.trim()}
      </span>
    ));
  }

  render() {
    const { post, loading, error } = this.props.activePost;
    if (loading) {
      return (
        <div className="container">
          <div className="loading" style={{background: '#fff', padding: '80px', borderRadius: '25px', textAlign: 'center', marginTop: '30px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
            <div style={{fontSize: '4rem', marginBottom: '20px', animation: 'pulse 2s infinite'}}>📖</div>
            <h3 style={{color: '#374151', fontWeight: '600'}}>Loading your story...</h3>
            <p style={{color: '#6b7280', marginTop: '10px'}}>Just a moment ✨</p>
          </div>
        </div>
      );
    } else if(error) {
      return (
        <div className="container" style={{marginTop: '30px'}}>
          <div className="alert alert-danger" style={{borderRadius: '20px', padding: '30px', textAlign: 'center'}}>
            <div style={{fontSize: '3rem', marginBottom: '15px'}}>😢</div>
            <h4 style={{fontWeight: '600'}}>Oops! Something went wrong</h4>
            <p>{error.message}</p>
          </div>
        </div>
      );
    } else if(!post) {
      return <span />
    }

    return (
      <div className="container">
        <div style={{background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', padding: '50px', borderRadius: '25px', marginTop: '30px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
          
          {/* Header with emoji */}
          <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <div style={{fontSize: '4rem', marginBottom: '15px'}}>{this.getPostEmoji(post.title)}</div>
          </div>
          
          {/* Title */}
          <h1 style={{color: '#111827', fontWeight: '800', fontSize: '2.5rem', textAlign: 'center', marginBottom: '20px', lineHeight: '1.3'}}>
            {post.title}
          </h1>
          
          {/* Author info */}
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px'}}>
            <div style={{display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '10px 20px', borderRadius: '25px'}}>
              <span style={{marginRight: '8px'}}>👤</span>
              <span style={{fontWeight: '600', color: '#374151'}}>{post.authorName || 'Anonymous'}</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', background: '#f1f5f9', padding: '10px 20px', borderRadius: '25px'}}>
              <span style={{marginRight: '8px'}}>📅</span>
              <span style={{color: '#6b7280'}}>Just now</span>
            </div>
          </div>
          
          {/* Categories */}
          <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <span style={{marginRight: '10px'}}>🏷️</span>
            {this.renderCategories(post.categories)}
          </div>
          
          {/* Divider */}
          <div style={{width: '100px', height: '4px', background: 'linear-gradient(90deg, #2563eb, #7c3aed)', margin: '0 auto 35px', borderRadius: '2px'}}></div>
          
          {/* Content */}
          <div style={{fontSize: '1.2rem', lineHeight: '2', color: '#374151', textAlign: 'left', padding: '20px 0'}}>
            <p style={{marginBottom: '20px'}}>{post.content}</p>
          </div>
          
          {/* Footer */}
          <div style={{marginTop: '40px', paddingTop: '30px', borderTop: '2px solid #f1f5f9', textAlign: 'center'}}>
            <p style={{color: '#9ca3af', fontSize: '0.9rem'}}>
              Thanks for reading! 📖 Happy coding! 💻
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default PostDetails;
