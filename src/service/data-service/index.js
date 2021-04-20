'use strict';

const ArticleService = require(`./services/article`);
const CategoryService = require(`./services/category`);
const SearchServices = require(`./services/search`);

module.exports = {
  ArticleService,
  SearchServices,
  CategoryService
};
