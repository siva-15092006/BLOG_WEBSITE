var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

// Set default JWT secret for development
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'dev-secret-key-change-in-production';
}

// In-memory mock users
var mockUsers = [
  {
    _id: '1',
    name: 'Demo User',
    username: 'demo',
    email: 'demo@example.com',
    password: 'demo123',
    isEmailVerified: true
  }
];

var nextUserId = 2;

function generateToken(user) {
  return jwt.sign({
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    isEmailVerified: user.isEmailVerified
  }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Sign up
router.post('/users/signup', function(req, res, next) {
  var body = req.body;
  
  if (!body.name || !body.username || !body.email || !body.password) {
    return res.status(403).json({ message: 'All fields are required' });
  }

  // Check if username exists
  var existingUser = mockUsers.find(function(u) { return u.username === body.username; });
  if (existingUser) {
    return res.status(403).json({ username: 'Username already exists' });
  }

  var existingEmail = mockUsers.find(function(u) { return u.email === body.email; });
  if (existingEmail) {
    return res.status(403).json({ email: 'Email already exists' });
  }

  var newUser = {
    _id: String(nextUserId++),
    name: body.name,
    username: body.username,
    email: body.email,
    password: body.password, // In real app, this would be hashed
    isEmailVerified: true // Auto-verify in mock mode
  };

  mockUsers.push(newUser);

  var token = generateToken(newUser);
  
  res.json({
    user: {
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      isEmailVerified: newUser.isEmailVerified
    },
    token: token
  });
});

// Sign in
router.post('/users/signin', function(req, res, next) {
  var body = req.body;
  
  if (!body.username || !body.password) {
    return res.status(403).json({ message: 'Username and password are required' });
  }

  var user = mockUsers.find(function(u) { return u.username === body.username; });
  
  if (!user) {
    return res.status(403).json({ username: 'Username not found' });
  }

  // In mock mode, accept the password they registered with
  if (user.password !== body.password) {
    return res.status(403).json({ password: 'Invalid password' });
  }

  var token = generateToken(user);
  
  res.json({
    user: {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isEmailVerified: user.isEmailVerified
    },
    token: token
  });
});

// Get current user from token
router.get('/me/from/token', function(req, res, next) {
  var token = req.query.token || req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  token = token.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    var user = mockUsers.find(function(u) { return u._id === decoded._id; });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        isEmailVerified: user.isEmailVerified
      }
    });
  });
});

// Validate email token (mock - auto validates)
router.get('/validateEmail/:token', function(req, res, next) {
  res.json({
    user: mockUsers[0],
    message: 'Email validated successfully (mock mode)'
  });
});

// Validate user fields
router.post('/users/validate/fields', function(req, res, next) {
  var body = req.body;
  var errors = {};
  var hasErrors = false;

  if (body.username) {
    var existingUser = mockUsers.find(function(u) { return u.username === body.username; });
    if (existingUser) {
      errors.username = 'Username already exists';
      hasErrors = true;
    }
  }

  if (body.email) {
    var existingEmail = mockUsers.find(function(u) { return u.email === body.email; });
    if (existingEmail) {
      errors.email = 'Email already exists';
      hasErrors = true;
    }
  }

  if (hasErrors) {
    return res.status(403).json(errors);
  }
  res.json({ success: true });
});

// Resend validation email (mock)
router.post('/users/resendValidationEmail', function(req, res, next) {
  res.json({ message: 'Validation email sent (mock mode)' });
});

// Forgot password (mock)
router.post('/users/forgotpwd', function(req, res, next) {
  res.json({ message: 'Password reset email sent (mock mode)' });
});

// Update email
router.put('/users/email', function(req, res, next) {
  var user = req.user;
  if (!user) {
    return res.status(401).json({ message: 'Permission Denied!' });
  }

  var body = req.body;
  if (!body.email) {
    return res.status(403).json({ message: 'Email is required' });
  }

  var mockUser = mockUsers.find(function(u) { return u._id === user._id; });
  if (mockUser) {
    mockUser.email = body.email;
  }

  res.json({ email: body.email });
});

module.exports = router;
