// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const setupSwagger = require('./swagger');
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



// Example for API key authentication
app.use((req, res, next) => {
    const apiKey = req.headers['authorization'];

    console.log(apiKey);

    if (!apiKey) {
        return res.status(401).json({ message: 'Unauthorized: API key missing' });
    }

    // Validasi API key (contoh: periksa dengan nilai tertentu)
    if (apiKey !== 'keyForAsics') {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }

    next();
});

// Endpoint untuk GET /order/api/web/v1/delivery-order
app.get(baseUrl + '/api/v1/order/delivery-order', (req, res) => {
    // Contoh respons JSON

    const fs = require('fs');
    const data = fs.readFileSync('./example.json');
    const deliveryOrders = JSON.parse(data);



    // const deliveryOrders = [
    //     { id: 1, orderNumber: 'DO-001', status: 'Delivered' },
    //     { id: 2, orderNumber: 'DO-002', status: 'Pending' }
    // ];

    res.status(200).json(deliveryOrders);
});




// Tambahkan konfigurasi Swagger dinamis
setupSwagger(app);

// Mulai server
app.listen(port, () => {
    console.log('Server started on port : ' + port);
});
