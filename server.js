let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');

const path = require('path');

// Express Route
const todoRoute = require('./routes/todo.js');

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error);
  }
);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/todos', todoRoute);

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// PORT
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port);
});

// 404 Error
app.use((req, res, next) => {
  console.log('404 Error');
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});