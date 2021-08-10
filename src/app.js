const express = require("express");
const morgan = require("morgan");

const app = express();

app.get("/say/goodbye", (req, res) => {
  res.send("Sorry to see you go!");
});

app.get("/hello", (req, res) => {
  console.log(req.query);
  const name = req.query.name;
  const content = name ? `Hello, ${name}!` : `Hello!`;
  res.send(content);
});

app.get("/say/:greeting", (req, res) => {
  const greeting = req.params.greeting;
  const name = req.query.name;
  const content = greeting && name ? `${greeting}, ${name}!` : `${greeting}!`;
  res.send(content);
});

app.get("/states/:abbreviation", (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next("State abbreviation is invalid.");
  } else {
    res.send(`${abbreviation} is a nice state. I'd like to visit!`);
  }
});

module.exports = app;
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!!`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});
