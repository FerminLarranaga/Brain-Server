const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const {saveUser} = require('./controllers/registerLogic');
const {enterUser} = require('./controllers/signinLogic');
const {getUserById} = require('./controllers/getUserById');
const {getEntriesById} = require('./controllers/getEntriesById');
const {handleApiCall} = require('./controllers/handleApiCall');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'fermin2138',
      database : 'smart_brain'
    }
});

app.get("/", (req, res) => { res.send('It is working!') });
app.post("/signin", enterUser(db, bcrypt));
app.post("/register", saveUser(db, bcrypt));
app.get("/profile/:id", getUserById(db));
app.put("/image", getEntriesById(db));
app.post('/imageUrl', (req, res) => handleApiCall(req, res));

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running in port ${process.env.PORT}`);
});