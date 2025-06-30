const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Add this line

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'my_secret_1234'; // Use env variable in production

// Middleware
app.use(cors()); // Add this line
app.use(bodyParser.json());

// Dummy users for demonstration
const users = [
    { username: 'admin', password: 'Admin@1234', role: 'ADMIN' },
    { username: 'user', password: 'User@5678', role: 'USER' }
];

// Routes
app.get('/api', (req, res) => {
    res.send('API is working!');
});

app.post('/api/users/login', (req, res) => {
    const { username, password } = req.body;
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
        // Generate JWT with username and role
        const token = jwt.sign(
            { username: foundUser.username, role: foundUser.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});