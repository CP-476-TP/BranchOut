var express = require('express');
var router = express.Router();
var db = require('../db'); // Import database module

/* POST /user/create */
router.post('/create', async function(req, res, next) {
  try {
    const { email, password, githubLink } = req.body;
    
    if (!email || !password || !githubLink) {
      return res.status(400).json({ error: 'Email, password, and GitHub link are required' });
    }

    const existingUser = await db.query('SELECT * FROM Users WHERE Email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const result = await db.query(
      'INSERT INTO Users (Email, Password, GitHub_Link) VALUES ($1, $2, $3) RETURNING id, email, github_link, time_created',
      [email, password, githubLink]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0]
    });
  } catch (err) {
    console.error("Database error during registration:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* POST /user/login */
router.post('/login', async function(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await db.query('SELECT * FROM Users WHERE Email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        github_link: user.github_link
      }
    });
  } catch (err) {
    console.error("Database error during login:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* DELETE /user/delete */
router.delete('/delete', async function(req, res, next) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required for deletion' });
    }

    const result = await db.query('DELETE FROM Users WHERE ID = $1 RETURNING id', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully', deletedId: result.rows[0].id });
  } catch (err) {
    console.error("Database error during deletion:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* GET /user/:id */
router.get('/:id', async function(req, res, next) {
  try {
    const { id } = req.params;

    const result = await db.query(
      'SELECT id, github_link, time_created, email FROM Users WHERE ID = $1', 
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Database error while fetching user:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
