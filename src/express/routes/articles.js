'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/:id`, (req, res) => res.send(`article page, id: ${req.params.id}`));
articlesRouter.get(`/edit/:id`, (req, res) => res.send(`edit article, id: ${req.params.id}`));
articlesRouter.get(`/add`, (req, res) => res.send(`add new article`));
articlesRouter.get(`/category/:id`, (req, res) => res.send(`articles in category, id: ${req.params.id}`));


module.exports = articlesRouter;
