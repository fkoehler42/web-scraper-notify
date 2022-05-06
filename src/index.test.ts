import test from 'ava';

import { orderPizza } from './index';

test.before(async () => {
    console.log('Starting tests!');
});

test('can order a pizza', async t => {

    const result = await orderPizza({
        peppers: false,
        pineapple: false,
        bbqSauce: false,
        cheeseType: 'swiss'
    });

    t.true(result.message.includes('you ordered a pizza'));
    t.true(result.message.includes('swiss'));

});
