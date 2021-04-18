'use strict';

const articleExists = require(`./articleExists`);
const articleValidator = require(`./articleValidator`);
const commentValidator = require(`./commentValidator`);

module.exports = {
  articleExists,
  articleValidator,
  commentValidator
};
