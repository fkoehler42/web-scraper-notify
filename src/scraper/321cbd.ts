import scrapeIt from 'scrape-it';

const URL = 'https://www.321cbd.com/fr';

interface Data {
    discountBanner: string;
}

const scrapeData = async () => {
    const {
        data,
        response,
    } = await scrapeIt<Data>(
        URL,
        { discountBanner: '.banner-content' });

    let message = '';

    if (response.statusCode !== 200) {
        message = `Response error code: ${response.statusCode}`;
    } else if (!data.discountBanner) {
        message = 'Discount banner not found or empty';
    } else {
        message = data.discountBanner;
    }

    return {
        title: '321CBD',
        data: message,
    };
};

export default scrapeData;