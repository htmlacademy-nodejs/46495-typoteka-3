'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const path = require(`path`);
const {nanoid} = require(`nanoid`);
const {getRandomNumber} = require(`../../utils`);

const FILE_PATH = {
  destination: path.join(__dirname, `../../../mocks.json`),
  source: {
    titles: path.join(__dirname, `../../../data/titles.txt`),
    sentences: path.join(__dirname, `../../../data/sentences.txt`),
    categories: path.join(__dirname, `../../../data/categories.txt`),
    comments: path.join(__dirname, `../../../data/comments.txt`)
  }
};

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    throw new Error();
  }
};

const stringPicker = (source, minCount, maxCount) => {
  const out = [];
  const arr = [...source];
  const count = getRandomNumber(minCount, maxCount);

  for (let i = 0; i < count; i++) {
    const item = arr[getRandomNumber(0, arr.length - 1)];
    const index = arr.indexOf(item);
    out.push(item);
    arr.splice(index, 1);
  }

  return out;
};

const startDate = () => {
  const d = new Date();
  d.setMonth(d.getMonth() - 3);
  return d;
};

const randomDate = (start, end) => {
  const moment = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  const y = moment.getFullYear();
  const m = moment.getMonth() + 1;
  const d = moment.getDate();
  const hours = moment.getHours();
  const minutes = moment.getMinutes();
  const seconds = moment.getSeconds();

  const checkFormat = (input) => input < 10 ? `0${input}` : input;

  const date = `${y}-${checkFormat(m)}-${checkFormat(d)}`;
  const time = `${checkFormat(hours)}:${checkFormat(minutes)}:${checkFormat(seconds)}`;

  return `${date} ${time}`;
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(),
    text: stringPicker(comments, 1, 4).join(` `)
  }))
);

const generate = async (count) => {
  const out = [];
  const mockData = {
    sentences: await readContent(FILE_PATH.source.sentences),
    titles: await readContent(FILE_PATH.source.titles),
    categories: await readContent(FILE_PATH.source.categories),
    comments: await readContent(FILE_PATH.source.comments)
  };

  for (let i = 0; i < count; i++) {
    out.push({
      id: nanoid(),
      image: '',
      title: mockData.titles[getRandomNumber(0, mockData.titles.length - 1)],
      announce: stringPicker(mockData.sentences, 1, 5).join(` `),
      fullText: stringPicker(mockData.sentences, 5, mockData.sentences.length).join(` `),
      createdDate: randomDate(startDate(), new Date()),
      category: stringPicker(mockData.categories, 1, 3),
      comments: generateComments(getRandomNumber(1, 4), mockData.comments)
    });
  }

  return out;
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [countProp] = args;
    const itemsCount = !countProp ? 1 : Number(countProp);

    if (!Number.isInteger(itemsCount) || itemsCount === 0 || itemsCount > 1000) {
      console.log(chalk.red(`Please, set number from 1 to 1000`));
      return;
    }

    try {
      await fs.writeFile(FILE_PATH.destination, JSON.stringify(await generate(itemsCount), null, 2));
      console.log(chalk.green(`Success! You can find generated data in file "mocks.json"`));
    } catch (err) {
      console.error(chalk.red(`Something went wrong...`));
    }
  }
};
