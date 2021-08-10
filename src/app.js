const express = require("express");
const morgan = require("morgan");

const app = express();

const checkForAbbreviationLength = (req, res, next) => {
  const abbreviation = req.params.abbreviation;
  if (abbreviation.length !== 2) {
    next("State abbreviation is invalid.");
  } else {
    next();
  }
};

app.get(
  "/states/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    res.send(`${req.params.abbreviation} is a nice state, I'd like to visit.`);
  }
);

app.get(
  "/travel/:abbreviation",
  checkForAbbreviationLength,
  (req, res, next) => {
    res.send(`Enjoy your trip to ${req.params.abbreviation}!`);
  }
);

module.exports = app;
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.send(`The route ${req.path} does not exist!!`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send(err);
});
