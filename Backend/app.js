const express = require('express');
const cors = require('cors');
const { db } = require('./Db/database');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/authRoutes');
const categories = require('./Routes/categories');
const transactions = require('./Routes/transactions');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categories);
app.use('/api/v1/transactions', transactions);

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('listening to port:', PORT);
    });
};

server();