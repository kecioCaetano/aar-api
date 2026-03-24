import 'dotenv/config';
import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());

app.get("/", (req, res) => res.send("Hello, world!"));


app.listen(process.env.PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
