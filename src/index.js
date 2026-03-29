import 'dotenv/config';
import express from "express";
import cors from 'cors';
import {v4 as uuidv4} from 'uuid'
import models from './models/index.js'
import routes from './routes/index.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  }
  next();
});

app.use('/session',routes.session)
app.use('/users', routes.user)
app.use('/messages', routes.message)


app.listen(process.env.PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
