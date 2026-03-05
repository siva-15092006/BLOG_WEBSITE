import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from './pages/App';
import PostsIndex from './pages/PostsIndex';
import PostsNew from './pages/PostsNew';
import PostsShow from './pages/PostsShow';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPwd from './pages/ForgotPwd';
import ValidateEmail from './pages/ValidateEmail';
import Profile from './pages/Profile';

const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={PostsIndex} />
      <Route path="/posts/new" component={PostsNew} />
      <Route path="/posts/:id" component={PostsShow} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgotPwd" component={ForgotPwd} />
      <Route path="/validateEmail/:token" component={ValidateEmail} />
      <Route path="/profile" component={Profile} />
    </Switch>
  </App>
);

export default Routes;
