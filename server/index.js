const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const authRouter = require('./routes/auth.routes');
const corsMiddleware = require('./middleware/cors.middleware');

const app = express();
const PORT = config.get('serverPort');

app.use(express.json());
app.use(corsMiddleware);
app.use('/api/auth', authRouter);

const start = async () => {
  try {
    const uri = config.get('mongoUrl');
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    });
  } catch (err) {
    console.warn(err);
  }
};

start();
