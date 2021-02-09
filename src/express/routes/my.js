'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.send(`my articles`));
myRouter.get(`/comments`, (req, res) => res.send(`my comments`));

module.exports = myRouter;
