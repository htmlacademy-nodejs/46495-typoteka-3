'use strict';

const {HTTP_CODES} = require(`../../constants`);

module.exports = (req, res, next) => {
  const {title, createdDate, category, announce, fullText} = req.body;
  const errorMessages = [];

  if (!title) {
    errorMessages.push(`title is required`);
  }

  if (!createdDate) {
    errorMessages.push(`createdDate is required`);
  }

  if (!category || !Array.isArray(category)) {
    errorMessages.push(`category should be string array`);
  }

  if (Array.isArray(category) && !category.length) {
    errorMessages.push(`at least 1 category is required`);
  }

  if (!announce) {
    errorMessages.push(`announce is required`);
  }

  if (!fullText) {
    errorMessages.push(`fullText is required`);
  }

  if (errorMessages.length) {
    return res.status(HTTP_CODES.BAD_REQUEST).json({
      code: HTTP_CODES.BAD_REQUEST,
      errorMessages
    });
  }

  return next();
};
