require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = ('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJwt');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');
const PORT = process.env.PORT || 3500;
//const dal = require('./dal.js');

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// handle options credentials check before CORS
app.use(credentials);

app.use(cors({
    corsOptions,
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
// urlen middleware for form data
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// middleware for cookies
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '..', '/public')));



// routes
app.use('/', require('./routes/root'));
app.use('/createaccount', require('./routes/newuseraccount'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/accounts', require('./routes/api/accounts'));
app.use('/balance',  require('./routes/balance'));

app.use( '/deposit', require('./routes/deposit'));

app.use(verifyJWT);
app.use('/alldata', require('./routes/api/data'));


app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

