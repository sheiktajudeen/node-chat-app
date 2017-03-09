var expect = require('expect');

var {generateMessage} = require('./message.js');

describe('Generate message', () => {
  it('Should generate correct message', () => {
    var from = 'Nisha';
    var text = 'Salam';

    var message = generateMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});
