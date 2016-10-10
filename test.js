import plural from './public/tools/plural';

const assert = require('assert');

const words = ['рубль', 'рубля', 'рублей'];

assert.equal(plural(1, words, 'rus'), 'рубль');
assert.equal(plural(2, words, 'rus'), 'рубля');
assert.equal(plural(7, words, 'rus'), 'рублей');
assert.equal(plural(52, words, 'rus'), 'рубля');
assert.equal(plural(876, words, 'rus'), 'рублей');
assert.equal(plural(3221, words, 'rus'), 'рубль');

