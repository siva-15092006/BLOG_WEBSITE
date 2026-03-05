var express = require('express');
var router = express.Router();

// In-memory mock data
var mockPosts = [
  {
    _id: '1',
    title: 'Welcome to React Redux Blog',
    categories: ['react', 'redux', 'javascript'],
    content: 'This is a sample blog post demonstrating the React Redux blog application. The app is running in mock mode without MongoDB.',
    authorName: 'Demo User',
    authorUsername: 'demo',
    authorId: '1'
  },
  {
    _id: '2',
    title: 'Getting Started with React',
    categories: ['react', 'tutorial'],
    content: 'React is a JavaScript library for building user interfaces. It allows you to create reusable UI components.',
    authorName: 'Demo User',
    authorUsername: 'demo',
    authorId: '1'
  },
  {
    _id: '3',
    title: 'Understanding Redux',
    categories: ['redux', 'state-management'],
    content: 'Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently.',
    authorName: 'Demo User',
    authorUsername: 'demo',
    authorId: '1'
  }
];

var nextId = 4;

router.get('/posts', function(req, res, next) {
  var posts = mockPosts.map(function(post) {
    return {
      _id: post._id,
      title: post.title,
      categories: post.categories,
      authorName: post.authorName,
      authorUsername: post.authorUsername,
      authorId: post.authorId
    };
  });
  res.json(posts);
});

router.post('/posts', function(req, res, next) {
  var user = req.user;
  if (!user) {
    return res.status(401).json({
      message: 'Permission Denied! Please sign in first.'
    });
  }

  var body = req.body;
  var title = body.title;
  var categories = body.categories;
  var content = body.content;

  if (!title || !categories || !content) {
    return res.status(403).json({
      message: 'Title, categories and content are required'
    });
  }

  var newPost = {
    _id: String(nextId++),
    title: title,
    categories: typeof categories === 'string' ? categories.split(',').map(function(c) { return c.trim(); }) : categories,
    content: content,
    authorName: user.name || 'Demo User',
    authorUsername: user.username || 'demo',
    authorId: user._id || '1'
  };

  mockPosts.unshift(newPost);
  res.json(newPost);
});

router.get('/posts/:id', function(req, res, next) {
  var post = mockPosts.find(function(p) { return p._id === req.params.id; });
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});

router.delete('/posts/:id', function(req, res, next) {
  var user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Permission Denied!' });
  }

  var postIndex = mockPosts.findIndex(function(p) { return p._id === req.params.id; });
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  var deletedPost = mockPosts.splice(postIndex, 1)[0];
  res.json(deletedPost);
});

router.post('/posts/validate/fields', function(req, res, next) {
  var body = req.body;
  var errors = {};
  var hasErrors = false;

  if (!body.title || body.title.trim() === '') {
    errors.title = 'Title is required';
    hasErrors = true;
  }
  if (!body.categories || body.categories.trim() === '') {
    errors.categories = 'Categories is required';
    hasErrors = true;
  }

  if (hasErrors) {
    return res.status(403).json(errors);
  }
  res.json({ success: true });
});

module.exports = router;
