const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const corsMiddleware = require('./middleware/cors.middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(corsMiddleware);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

const start = async () => {
  try {
    const uri = process.env.MONGO_URL;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (err) {
    console.warn(err);
  }
};

start();
