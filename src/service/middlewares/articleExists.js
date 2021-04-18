'use strict';

const {HTTP_CODES} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {articleId} = req.params;
  const article = service.getById(articleId);

  if (!article) {
    return res.status(HTTP_CODES.NOT_FOUND).json({
      code: HTTP_CODES.BAD_REQUEST,
      errorMessages: [`Article with id "${articleId}" not found`]
    });
  }

  res.locals.article = article;
  return next();
};
