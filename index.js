const models = require('./models/index')
const { randomUUID } = require('crypto');

require('dotenv').config()
const port = process.env.PORT;

const express = require('express')
const app = express()       

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req,res,next)=>{
    req.context = {
        models,
        me: models.users[1],
    }
    next()
})

app.get('/session', (req,res) =>{
    return res.send(users[req.me.id])
})

app.get('/messages', (req, res) => {
    return res.send(Object.values(messages))
})

app.get('/messages/:messageId', (req,res) => {
    return res.send(messages[req.params.messageId])
})

app.post('/messages', (req,res) => {
    const id = randomUUID();
    const message = {
        id,
        text: req.body.text,
        userId: req.me.id,
    }
    messages[id] = message
    return res.send(message)

    //  once set app.use(express.json()); it is necessary to parse data coming into req.body.
    // const date = Date.parse(req.body.date);
    // const count = Number(req.body.count);
})

app.delete('/messages/:messageId', (req, res) =>{
    const { [req.params.messageId] : message, ...otherMessages } = messages 
    messages = otherMessages
    return res.send(message)
})

app.get('/users', (req, res) =>{
    return res.send(Object.values(users))
})

app.get('/users/:userId', (req, res)=>{
    return res.send(users[req.params.userId])
})

app.post('/users', (req, res) =>{
    return res.send('POST HTTP method on user resource')
})

app.put('/users/:userId', (req, res) =>{
    return res.send(`PUT HTTP method on user${req.params.userId} resource`)
})

app.delete('/users/:userId', (req,res) => {
    return res.send(`DELETE HTTP method on user${req.params.userId} resource`)
})


app.listen(process.env.PORT, () => 
    console.log(`Example app listening on port ${process.env.PORT}`)
)




