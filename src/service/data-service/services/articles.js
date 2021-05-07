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
      image,
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
        item.image = image;
        item.createdDate = createdDate;
        item.category = category;
        item.announce = announce;
        item.fullText = fullText;
      }
    });

    return this.getById(articleId);
  }

  delete(articleId) {
    const articleToDelete = this._articles.find((item) => item.id === articleId);
    this._articles = this._articles.filter((item) => item.id !== articleId);
    return articleToDelete;
  }

  getComments(articleId) {
    const article = this.getById(articleId);
    return article.comments;
  }

  deleteComment(articleId, commentId) {
    let commentToDelete;

    this._articles.forEach((item) => {
      if (item.id === articleId) {
        commentToDelete = item.comments.find((comment) => comment.id === commentId);
        item.comments = item.comments.filter((comment) => comment.id !== commentId);
      }
    });

    return commentToDelete;
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
