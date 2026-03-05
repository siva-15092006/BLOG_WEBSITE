import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostsList extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderCategories(categories) {
     return categories.map((c) => {
        c = c.trim();
        return (
          <Link to={"filter/" + c} key={c} className="list-group-item-text">{c}</Link>
        );
     });
  }

  getPostEmoji(title) {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('react')) return '⚛️';
    if (titleLower.includes('redux')) return '🔄';
    if (titleLower.includes('javascript') || titleLower.includes('js')) return '💛';
    if (titleLower.includes('tutorial') || titleLower.includes('learn')) return '📚';
    if (titleLower.includes('welcome') || titleLower.includes('hello')) return '👋';
    if (titleLower.includes('tip') || titleLower.includes('trick')) return '💡';
    if (titleLower.includes('code') || titleLower.includes('programming')) return '💻';
    if (titleLower.includes('design') || titleLower.includes('ui')) return '🎨';
    if (titleLower.includes('api') || titleLower.includes('backend')) return '🔌';
    if (titleLower.includes('database') || titleLower.includes('data')) return '🗄️';
    return '📝';
  }

  renderPosts(posts) {
    const currentUser = sessionStorage.getItem('jwtToken') ? JSON.parse(atob(sessionStorage.getItem('jwtToken').split('.')[1])) : null;
    
    return posts.map((post) => {
      const isMyPost = currentUser && post.authorId === currentUser._id;
      return (
        <li className="list-group-item" key={post._id} style={{borderLeft: isMyPost ? '4px solid #059669' : 'none'}}>
          <Link style={{color:'inherit', textDecoration: 'none'}} to={"posts/" + post._id}>
            <h3 className="list-group-item-heading">
              <span style={{marginRight: '12px', fontSize: '1.5rem'}}>{this.getPostEmoji(post.title)}</span>
              {post.title}
              {isMyPost && <span style={{marginLeft: '12px', background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '600'}}>✨ Your Post</span>}
            </h3>
          </Link>
          <div style={{marginTop: '12px'}}>
            <span style={{marginRight: '10px'}}>🏷️</span>
            {this.renderCategories(post.categories)}
          </div>
          <div style={{marginTop: '12px', color: '#4b5563', fontSize: '0.9rem', display: 'flex', alignItems: 'center'}}>
            <span style={{marginRight: '8px'}}>👤</span>
            <span style={{fontWeight: '600'}}>{post.authorName || 'Anonymous'}</span>
            <span style={{margin: '0 10px', color: '#d1d5db'}}>•</span>
            <span>📖 Click to read</span>
          </div>
        </li>
      );
    });
  }

  render() {
    const { posts, loading, error } = this.props.postsList;

    if(loading) {
      return (
        <div className="container">
          <h1><span style={{marginRight: '15px'}}>📰</span>Blog Posts</h1>
          <div className="loading" style={{background: '#fff', padding: '60px', borderRadius: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '3rem', marginBottom: '20px'}}>⏳</div>
            <h3 style={{color: '#374151'}}>Loading amazing posts...</h3>
          </div>
        </div>
      );      
    } else if(error) {
      return (
        <div className="container">
          <h1><span style={{marginRight: '15px'}}>📰</span>Blog Posts</h1>
          <div className="alert alert-danger" style={{borderRadius: '15px', padding: '25px'}}>
            <span style={{marginRight: '10px', fontSize: '1.5rem'}}>😕</span>
            Oops! {error.message}
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <h1><span style={{marginRight: '15px'}}>📰</span>Blog Posts</h1>
        {posts.length === 0 ? (
          <div style={{background: '#fff', padding: '60px', borderRadius: '20px', textAlign: 'center'}}>
            <div style={{fontSize: '4rem', marginBottom: '20px'}}>📭</div>
            <h3 style={{color: '#374151'}}>No posts yet!</h3>
            <p style={{color: '#6b7280'}}>Be the first to create an amazing post ✨</p>
          </div>
        ) : (
          <ul className="list-group">
            {this.renderPosts(posts)}
          </ul>
        )}
      </div>
    );
  }
}


export default PostsList;
