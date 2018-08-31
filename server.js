const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        },
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    for(let user of database.users) {
        if (req.body.email === user.email && 
        req.body.password === user.password) {
            return res.json(user);
        } else {
            return res.status(400).json('error logging in');
        }
    }
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    for (let user of database.users){
        if (user.id === id){
            found = true;
            return res.json(user);
        }
    }
    if(!found){
        res.status(400).json('not found');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    for (let user of database.users) {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    }
    if (!found) {
        res.status(400).json('not found');
    }
});

app.listen(3000, () => {
    console.log('server started');
});