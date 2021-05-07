'use strict';

const express = require(`express`);
const request = require(`supertest`);
const {HTTP_CODES} = require(`../../../constants`);

const articles = require(`./articles`);
const DataService = require(`../../data-service/services/articles`);

const mockData = [
  {
    "id": `4jrEW_IzpA-XqY85kJ_yM`,
    "image": ``,
    "title": `Как достигнуть успеха не вставая с кресла`,
    "announce": `Простые ежедневные упражнения помогут достичь успеха. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    "fullText": `Простые ежедневные упражнения помогут достичь успеха. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Программировать не настолько сложно, как об этом говорят. Это один из лучших рок-музыкантов. Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    "createdDate": `2021-02-24 08:55:52`,
    "category": [
      `Без рамки`,
      `Программирование`
    ],
    "comments": [
      {
        "id": `29dyKitHfFbGCJ2f5pQ0a`,
        "text": `Хочу такую же футболку :-) Плюсую, но слишком много буквы!`
      }
    ]
  },
  {
    "id": `llCajA31GJ0phDGXhM9Qv`,
    "image": ``,
    "title": `Как начать программировать`,
    "announce": `Это один из лучших рок-музыкантов.`,
    "fullText": `Из под его пера вышло 8 платиновых альбомов. Золотое сечение — соотношение двух величин, гармоническая пропорция. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Программировать не настолько сложно, как об этом говорят. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Это один из лучших рок-музыкантов.`,
    "createdDate": `2021-03-21 19:45:37`,
    "category": [
      `IT`
    ],
    "comments": [
      {
        "id": `rmwbuwmIyuWj1Dg6m7dyF`,
        "text": `Плюсую, но слишком много буквы! Это где ж такие красоты?`
      },
      {
        "id": `mnsM6lxqTTa4agP74Gnw_`,
        "text": `Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `w9ZkzrHjRUz-fWgwV0u6f`,
        "text": `Хочу такую же футболку :-) Плюсую, но слишком много буквы! Согласен с автором!`
      }
    ]
  },
  {
    "id": `unGDVtFD1L-MRTKISoRtq`,
    "image": ``,
    "title": `Как достигнуть успеха не вставая с кресла`,
    "announce": `Достичь успеха помогут ежедневные повторения.`,
    "fullText": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов. Первая большая ёлка была установлена только в 1938 году. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Достичь успеха помогут ежедневные повторения. Он написал больше 30 хитов. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    "createdDate": `2021-04-05 10:58:45`,
    "category": [
      `Разное`,
      `Деревья`
    ],
    "comments": [
      {
        "id": `OyS0DymoGyZhMYL2KjJ6G`,
        "text": `Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-)`
      }
    ]
  },
  {
    "id": `PbvONXx4944eRoA-3vn5N`,
    "image": ``,
    "title": `Что такое золотое сечение`,
    "announce": `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Первая большая ёлка была установлена только в 1938 году. Из под его пера вышло 8 платиновых альбомов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    "fullText": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Как начать действовать? Для начала просто соберитесь. Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Программировать не настолько сложно, как об этом говорят. Он написал больше 30 хитов. Из под его пера вышло 8 платиновых альбомов. Ёлки — это не просто красивое дерево. Это прочная древесина. Первая большая ёлка была установлена только в 1938 году. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    "createdDate": `2021-04-20 01:54:08`,
    "category": [
      `Без рамки`
    ],
    "comments": [
      {
        "id": `Zef0sKb4BfSXG_KuTPKZa`,
        "text": `Хочу такую же футболку :-) Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `FO5IL02xVlkKAnlZEDn5Z`,
        "text": `Согласен с автором! Мне кажется или я уже читал это где-то? Совсем немного...`
      }
    ]
  },
  {
    "id": `gkDYSlwu71AKBRpvQeMTd`,
    "image": ``,
    "title": `Учим HTML и CSS`,
    "announce": `Программировать не настолько сложно, как об этом говорят. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Золотое сечение — соотношение двух величин, гармоническая пропорция. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
    "fullText": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Первая большая ёлка была установлена только в 1938 году. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Ёлки — это не просто красивое дерево. Это прочная древесина. Он написал больше 30 хитов. Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Золотое сечение — соотношение двух величин, гармоническая пропорция. Собрать камни бесконечности легко, если вы прирожденный герой.`,
    "createdDate": `2021-05-06 12:07:18`,
    "category": [
      `Музыка`
    ],
    "comments": [
      {
        "id": `7aAulT15WMPkeml1y-DPv`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  articles(app, new DataService(cloneData));
  return app;
};

describe(`API returns a list of all articles`, () => {

  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODES.SUCCESS));
  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));
  test(`First article id equals "4jrEW_IzpA-XqY85kJ_yM"`, () => expect(response.body[0].id).toBe(`4jrEW_IzpA-XqY85kJ_yM`));

});

describe(`API returns an article with given id`, () => {

  let response;

  beforeAll(async () => {
    const app = createAPI();
    response = await request(app)
      .get(`/articles/4jrEW_IzpA-XqY85kJ_yM`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODES.SUCCESS));
  test(`Article title is "Как достигнуть успеха не вставая с кресла"`, () => expect(response.body.title).toBe(`Как достигнуть успеха не вставая с кресла`));

});

describe(`API creates an article if data is valid`, () => {

  const newArticle = {
    image: `cat.jpg`,
    title: `title`,
    announce: `Announce`,
    fullText: `fulltext`,
    createdDate: `2021-02-24 08:55:52`,
    category: [`category`]
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HTTP_CODES.CREATED));
  test(`Returns created article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Article count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {

  const newArticle = {
    image: `cat.jpg`,
    title: `title`,
    announce: `Announce`,
    fullText: `fulltext`,
    createdDate: `2021-02-24 08:55:52`,
    category: [`category`]
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HTTP_CODES.BAD_REQUEST);
    }
  });

});

describe(`API changes existent article`, () => {

  const newArticle = {
    image: `cat.jpg`,
    title: `new title`,
    announce: `Announce`,
    fullText: `fulltext`,
    createdDate: `2021-02-24 08:55:52`,
    category: [`category`]
  };

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/4jrEW_IzpA-XqY85kJ_yM`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODES.SUCCESS));
  test(`Article is really changed`, () => request(app)
    .get(`/articles/4jrEW_IzpA-XqY85kJ_yM`)
    .expect((res) => expect(res.body.title).toBe(`new title`))
  );

});

test(`API returns status code 404 when trying to change non-existent article`, () => {

  const app = createAPI();

  const newArticle = {
    image: `cat.jpg`,
    title: `new title`,
    announce: `Announce`,
    fullText: `fulltext`,
    createdDate: `2021-02-24 08:55:52`,
    category: [`category`]
  };

  return request(app)
    .put(`/articles/NOEXST`)
    .send(newArticle)
    .expect(HTTP_CODES.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {

  const app = createAPI();

  const invalidArticle = {
    image: `cat.jpg`,
    title: `new title`,
    announce: `Announce`
  };

  return request(app)
    .put(`/articles/4jrEW_IzpA-XqY85kJ_yM`)
    .send(invalidArticle)
    .expect(HTTP_CODES.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/4jrEW_IzpA-XqY85kJ_yM`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HTTP_CODES.SUCCESS));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`4jrEW_IzpA-XqY85kJ_yM`));

  test(`Articles count is 4 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to delete non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HTTP_CODES.NOT_FOUND);

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `some comment`
    })
    .expect(HTTP_CODES.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/4jrEW_IzpA-XqY85kJ_yM/comments/NOEXST`)
    .expect(HTTP_CODES.NOT_FOUND);

});
