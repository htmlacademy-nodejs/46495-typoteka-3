'use strict';

const express = require(`express`);
const mainRouter = require(`./routes/main`);
const articlesRouter = require(`./routes/articles`);
const myRouter = require(`./routes/my`);
const chalk = require(`chalk`);
const {HTTP_FRONT_SERVICE_PORT} = require(`../constants`);

const app = express();

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.listen(HTTP_FRONT_SERVICE_PORT, (err) => {
  if (err) {
    return console.error(chalk.red(`Something went wrong...`, err));
  }

  return console.log(`${chalk.blue(`Front server starts on port:`)} ${HTTP_FRONT_SERVICE_PORT}`);
});
