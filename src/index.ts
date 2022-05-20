import scrapeData from './scraper/321cbd';
import notify from './notifier';
import {
    initStore,
    saveStore,
} from './store';

const main = async () => {
    initStore();
    const {
        title,
        data,
    } = await scrapeData();
    await notify(title, data);
    await saveStore();
};

export default main;
