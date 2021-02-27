'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

articlesRouter.get(`/:id`, (req, res) => res.render(`post`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`post-edit`));
articlesRouter.get(`/add`, (req, res) => res.render(`post-new`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(`admin-categories`));


module.exports = articlesRouter;
