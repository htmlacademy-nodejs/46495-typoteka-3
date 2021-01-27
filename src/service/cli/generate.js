'use strict';

const color = require(`cli-color`);
const fs = require(`fs`);
const path = require(`path`);
const mockData = require(`./mock-data`);
const {EXIT_CODES} = require(`../../constants`);
const {getRandomNumber} = require(`../../utils`);

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

const generate = (count) => {
  const out = [];

  for (let i = 0; i < count; i++) {
    out.push({
      title: mockData.titles[getRandomNumber(0, mockData.titles.length - 1)],
      announce: stringPicker(mockData.descriptions, 1, 5).join(` `),
      fullText: stringPicker(mockData.descriptions, 5, mockData.descriptions.length).join(` `),
      createdDate: randomDate(startDate(), new Date()),
      category: stringPicker(mockData.categories, 1, 3)
    });
  }

  return out;
};

module.exports = {
  name: `--generate`,
  run(args) {
    const [countProp] = args;
    const itemsCount = !countProp ? 1 : Number(countProp);

    if (!Number.isInteger(itemsCount) || itemsCount === 0 || itemsCount > 1000) {
      console.log(color.red(`Нужно ввести число от 1 до 1000`));
      return;
    }

    fs.writeFile(path.join(__dirname, `../../../mocks.json`), JSON.stringify(generate(itemsCount), null, 2), (err) => {
      if (err) {
        console.log(color.red(`Что-то пошло не так...`));
        process.exit(EXIT_CODES.error);
      } else {
        console.log(color.green(`Успешно! Данные можно найти в файле mocks.json`));
        process.exit(EXIT_CODES.success);
      }
    });
  }
};
