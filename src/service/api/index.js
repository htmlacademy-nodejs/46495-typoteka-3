'use strict';

const {Router} = require(`express`);
const getMockData = require(`../lib/get-mock-data`);
const articles = require(`./routes/articles`);
const search = require(`./routes/search`);
const category = require(`./routes/category`);

const {
  ArticleService,
  SearchServices,
  CategoryService
} = require(`../data-service`);

async function getAPI() {
  const api = new Router();
  const mockData = await getMockData();

  articles(api, new ArticleService(mockData));
  search(api, new SearchServices(mockData));
  category(api, new CategoryService(mockData));

  return api;
}

module.exports = {getAPI};
