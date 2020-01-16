const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({
    extended: false
}));

app.get('/', (req, res) => res.json({
    msg: 'Hello World'
}));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/organization', require('./routes/organization'));
app.use('/api/organizations', require('./routes/organizations'));
app.use('/api/shifts', require('./routes/shifts'));
app.use('/api/shift', require('./routes/shift'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))