import scrapeData from './scraper/321cbd';
import notify from './notifier';
import {
    initStore,
    saveStore,
} from './store';

const main = async () => {
    initStore();
    const {
        id,
        data,
        url,
    } = await scrapeData();
    await notify(id, data, url);
    await saveStore();
};

export default main;
