// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const port = 3003;

const app = express();
const baseUrl = "/py-asics";

app.use(bodyParser.json());
app.use(cookieParser());
app.use(baseUrl + '/api/auth', userRoutes);
app.use(baseUrl + '/api/user', userRoutes);
app.use(baseUrl + '/api/order', orderRoutes);

// Mulai server
app.listen(port, () => {
    console.log('Server started on port : ' + port);
});
