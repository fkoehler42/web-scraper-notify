import scrapeData from './scraper/321cbd';
import notify from './notifier';

const main = async () => {
    const {
        title,
        data,
    } = await scrapeData();

    notify(title, data);
};

export default main;
