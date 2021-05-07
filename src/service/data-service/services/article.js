'use strict';

const {nanoid} = require(`nanoid`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  getAll() {
    return this._articles || [];
  }

  getById(articleId) {
    return this._articles.find((item) => item.id === articleId);
  }

  create({title, image, createdDate, category, announce, fullText}) {
    const article = {
      id: nanoid(),
      title,
      announce,
      fullText,
      image: image || ``,
      createdDate,
      category,
      comments: []
    };

    this._articles.push(article);
    return article;
  }

  edit(articleId, {title, image, createdDate, category, announce, fullText}) {
    this._articles.forEach((item) => {
      if (item.id === articleId) {
        item.title = title;
        item.image = image || ``;
        item.createdDate = createdDate;
        item.category = category;
        item.announce = announce;
        item.fullText = fullText;
      }
    });

    return this.getById(articleId);
  }

  delete(articleId) {
    this._articles = this._articles.filter((item) => item.id !== articleId);
  }

  getComments(articleId) {
    const article = this.getById(articleId);
    return article.comments;
  }

  deleteComment(articleId, commentId) {
    this._articles.forEach((item) => {
      if (item.id === articleId) {
        item.comments = item.comments.filter((comment) => comment.id !== commentId);
      }
    });
  }

  createComment(articleId, {text}) {
    const comment = {
      id: nanoid(),
      text
    };

    this._articles.forEach((item) => {
      if (item.id === articleId) {
        item.comments = [...item.comments, comment];
      }
    });

    return comment;
  }
}

module.exports = ArticleService;
