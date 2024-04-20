const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.router');
const adminRouter = require('./routes/admin.router');

const app = express();
const PORT = process.env.PORT || 3200;

dotenv.config();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// Middleware
app.use(express.json());

// Routes
app.use('/user', userRouter);
app.use('/admin', adminRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
