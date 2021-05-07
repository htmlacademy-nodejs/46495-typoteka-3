'use strict';

const ArticleService = require(`./services/articles`);
const CategoryService = require(`./services/category`);
const SearchServices = require(`./services/search`);

module.exports = {
  ArticleService,
  SearchServices,
  CategoryService
};
