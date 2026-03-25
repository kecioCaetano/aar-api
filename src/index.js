import 'dotenv/config';
import express from "express";
import cors from 'cors';
import {v4 as uuidv4} from 'uuid'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  req.me = users[1];
  next();
});

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};

app.get('/messages', (req, res)=>{
  return res.send(Object.values(messages))
})

app.get('/messages/:messageId', (req, res)=>{
  return res.send(messages[req.params.messageId])
})

app.post('/messages', (req, res) =>{
  const id = uuidv4()
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id
  }

  messages[id] = message
  return res.send(message)
})

app.delete('/messages/:messageId', (req, res) =>{
  const {
    [req.params.messageId] : message, 
    ...otherMessages} = messages

    messages = otherMessages
    return res.send(messages)

})

app.get("/users", (req, res) => {
  return res.send(Object.values(users))
});

app.get("/users/:userId", (req, res) => {
  return res.send(users[req.params.userId])
});

app.post('/users/:userId', (req,res) =>{
  return res.send(`POST HTTP method on user/${req.params.userId} resource`)
}) 

app.put('/users/:userId', (req, res) =>{
  return res.send('PUT HTTP method on user resource')
})

app.delete('/users/:userId', (req, res) =>{
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`)
})





app.listen(process.env.PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
