// controllers/userController.js
const db = require('../config/db');
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });
    db.query('INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?)', [refreshToken, user.id]);
    return refreshToken;
};

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        res.status(201).json({ id: result[0].insertId, username, email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await db.query('SELECT * FROM users_api WHERE username = ? AND password = ?', [username, password]);

        if (rows.length > 0) {
            const user = { id: rows[0].id, username: rows[0].username };
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            res.cookie('token', accessToken, { httpOnly: true });
            res.cookie('refreshToken', refreshToken, { httpOnly: true });
            res.json({
                message: 'Login successful',
                token: accessToken,
                refreshToken: refreshToken
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.logoutUser = async (req, res) => {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
        await db.query('DELETE FROM refresh_tokens WHERE token = ?', [refreshToken]);
        res.clearCookie('token');
        res.clearCookie('refreshToken');
        res.json({ message: 'Logout successful' });
    } else {
        res.status(400).json({ message: 'No refresh token found' });
    }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
        const [rows] = await db.query('SELECT * FROM refresh_tokens WHERE token = ?', [refreshToken]);

        if (rows.length > 0) {
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
                if (err) {
                    return res.sendStatus(403); // Forbidden
                }
                const newAccessToken = generateAccessToken({ id: user.id, username: user.username });
                res.cookie('token', newAccessToken, { httpOnly: true });
                res.json({ accessToken: newAccessToken });
            });
        } else {
            res.sendStatus(403); // Forbidden
        }
    } else {
        // res.sendStatus(401); // Unauthorized
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query('SELECT id, username, email FROM users_api WHERE id = ?', [userId]);

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT username FROM users_api');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        res.status(201).json({ id: result[0].insertId, username, email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tambahkan metode lain seperti updateUser, deleteUser sesuai kebutuhan
