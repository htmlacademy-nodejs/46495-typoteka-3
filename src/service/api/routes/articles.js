'use strict';

const {Router} = require(`express`);
const {HTTP_CODES} = require(`../../../constants`);
const {articleExists, articleValidator, commentValidator} = require(`../../middlewares`);

module.exports = (app, articlesService) => {
  const route = new Router();
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    return res.status(HTTP_CODES.SUCCESS).json(articlesService.getAll());
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articlesService.create(req.body);
    return res.status(HTTP_CODES.CREATED).json(article);
  });

  route.put(`/:articleId`, articleExists(articlesService), articleValidator, (req, res) => {
    const {articleId} = req.params;
    const article = articlesService.edit(articleId, req.body);
    return res.status(HTTP_CODES.SUCCESS).json(article);
  });

  route.get(`/:articleId`, articleExists(articlesService), (req, res) => {
    const {article} = res.locals;
    return res.status(HTTP_CODES.SUCCESS).json(article);
  });

  route.delete(`/:articleId`, articleExists(articlesService), (req, res) => {
    const {articleId} = req.params;
    const deletedArticle = articlesService.delete(articleId);
    return res.status(HTTP_CODES.SUCCESS).json(deletedArticle);
  });

  route.get(`/:articleId/comments`, articleExists(articlesService), (req, res) => {
    const {articleId} = req.params;
    const comments = articlesService.getComments(articleId);
    return res.status(HTTP_CODES.SUCCESS).json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExists(articlesService), (req, res) => {
    const {articleId, commentId} = req.params;
    const deletedComment = articlesService.deleteComment(articleId, commentId);

    if (!deletedComment) {
      return res.status(HTTP_CODES.NOT_FOUND).json({
        code: HTTP_CODES.NOT_FOUND,
        errorMessages: [`Comment with id "${commentId}" not found`]
      });
    }

    return res.status(HTTP_CODES.SUCCESS).json(deletedComment);
  });

  route.post(`/:articleId/comments`, articleExists(articlesService), commentValidator, (req, res) => {
    const {articleId} = req.params;
    const comment = articlesService.createComment(articleId, req.body);
    return res.status(HTTP_CODES.SUCCESS).json(comment);
  });

};
