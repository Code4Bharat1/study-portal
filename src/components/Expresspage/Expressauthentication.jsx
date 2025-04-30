import React from 'react';

function Expressauthentication() {
  return (
    <div className="p-6 ml-60">
      <h1 className="text-3xl text-gray-800 font-bold mb-4">Authentication in Express.js</h1>

      {/* Introduction */}
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-5xl mx-auto">
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">What is Authentication?</h2>
          <p className="text-lg text-gray-800 mb-6">
            Authentication is the process of verifying the identity of a user or service. In Express.js, authentication is commonly implemented using middleware libraries like <strong>Passport.js</strong> or <strong>JWT</strong> (JSON Web Tokens).
          </p>
        </section>

        {/* JWT Authentication Example */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Using JWT for Authentication</h2>
          <p className="mb-4">
            Here's an example of how you can use JWTs for securing routes:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
            <code className="text-yellow-600">
{`// login route
app.post('/login', (req, res) => {
  const user = { id: 1, username: "admin" };
  const token = jwt.sign(user, 'secretKey', { expiresIn: '1h' });
  res.json({ token });
});

// middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// protected route
app.get('/dashboard', authenticateToken, (req, res) => {
  res.send('Welcome to the protected dashboard!');
});`}
            </code>
          </pre>
        </section>

        {/* Passport.js Overview */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Using Passport.js</h2>
          <p className="mb-4">
            Passport.js is a popular authentication middleware for Node.js that supports many strategies like Local, OAuth, Google, Facebook, etc.
          </p>
          <p className="mb-4">
            Example for local strategy:
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-6">
            <code className="text-yellow-600">
{`const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
  if (username === 'admin' && password === '1234') {
    return done(null, { id: 1, username: 'admin' });
  } else {
    return done(null, false, { message: 'Incorrect credentials.' });
  }
}));`}
            </code>
          </pre>
        </section>

        {/* Best Practices */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-yellow-500 mb-4">Best Practices</h2>
          <ul className="list-disc pl-6 text-gray-800 space-y-2 mb-6">
            <li>Always hash passwords using bcrypt or argon2 before storing.</li>
            <li>Store tokens securely, e.g., HTTP-only cookies.</li>
            <li>Use HTTPS to protect authentication credentials in transit.</li>
            <li>Implement rate limiting and login throttling to prevent brute force attacks.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Expressauthentication;
