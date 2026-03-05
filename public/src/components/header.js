import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


class Header extends Component {
  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.deletedPost.error && nextProps.deletedPost.error.message) {//delete failure
      alert(nextProps.deletedPost.error.message || 'Could not delete. Please try again.');
    } else if(nextProps.deletedPost.post && !nextProps.deletedPost.error) {//delete success
      this.props.history.push('/');
    } else if(this.props.user.user && !nextProps.user.user) {//logout (had user(this.props.user.user) but no loger the case (!nextProps.user.user))
      this.props.history.push('/');
    }
  }

  renderSignInLinks(authenticatedUser) {
    if(authenticatedUser) {
      return (
        <ul className="nav  nav-pills navbar-right">
            <li style={{paddingRight: '10px'}} role="presentation">      
              <Link role="presentation" style={{color:'#2563eb', fontWeight: '600', fontSize: '17px'}} to="/profile">
              <span style={{marginRight: '8px'}}>👤</span>{authenticatedUser.name}
              </Link>
            </li>
            <li style={{paddingRight: '10px'}} role="presentation">      
              <a style={{color:'#dc2626', fontWeight: '600', fontSize: '17px'}}  onClick={this.props.logout} href="javascript:void(0)">
              <span style={{marginRight: '8px'}}>🚪</span>Log out
              </a>
            </li>
        </ul>
      );
    }

    return (
      <ul className="nav  nav-pills navbar-right">
          <li style={{paddingRight: '10px'}} role="presentation">      
            <Link  role="presentation" style={{color:'#059669', fontWeight: '600', fontSize: '17px'}} to="/signup">
            <span style={{marginRight: '8px'}}>✨</span>Sign up
            </Link>
          </li>
          <li style={{paddingRight: '10px'}} role="presentation">      
            <Link style={{color:'#2563eb', fontWeight: '600', fontSize: '17px'}} to="/signin">
            <span style={{marginRight: '8px'}}>🔐</span>Sign in
            </Link>
          </li>
      </ul>
   );
  }
  
	renderLinks() {
		const { type, authenticatedUser } = this.props;
		if(type === 'posts_index') {
       return (
        <div className="container">
          <ul className="nav  nav-pills navbar-right">
      			<li style={{paddingRight: '10px'}} role="presentation">      
      				<Link style={{color:'#059669', fontWeight: '600', fontSize: '17px'}} to="/posts/new">
      				<span style={{marginRight: '8px'}}>✏️</span>New Post
    					</Link>
            </li>
    			</ul>
         {this.renderSignInLinks(authenticatedUser)}

        </div>
  		 );
  	} else if(type === 'posts_new') {
       return (
        <div className="container">
          {this.renderSignInLinks(authenticatedUser)}
          <ul className="nav  nav-pills navbar-left">
      			<li style={{paddingRight: '10px'}} role="presentation">      
      				<Link className="text-xs-right"  style={{color:'#2563eb', fontWeight: '600', fontSize: '17px'}}  to="/"><span style={{marginRight: '8px'}}>⬅️</span>Back To Index</Link>
      			</li>
    			</ul>
        </div>
  		 );  		
  	} else if(type === 'posts_show') {
  			return (
  			 <div className="container">
    			<ul className="nav  nav-pills navbar-left">
      			<li style={{paddingRight: '10px'}} role="presentation"><Link style={{color:'#2563eb', fontWeight: '600', fontSize: '17px'}} to="/"><span style={{marginRight: '8px'}}>⬅️</span>Back To Index</Link></li>
    			</ul>
         
    			<div className="navbar-form navbar-right" style={{paddingRight: '50px'}}>
      			<button className="btn btn-warning pull-xs-right"  onClick={()=> {this.props.onDeleteClick()}}><span style={{marginRight: '8px'}}>🗑️</span>Delete Post</button>
      		</div>
           {this.renderSignInLinks(authenticatedUser)}
    	   </div>
  		);
  	}
	};

	render() {
			return (
			 <nav className="navbar navbar-default navbar-static-top">
			      <div id="navbar" className="navbar-collapse collapse">
			      {this.renderLinks()}
	      		</div>     
			 </nav>				
			);
	}
}

export default withRouter(Header)