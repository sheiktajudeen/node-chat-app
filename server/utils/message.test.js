var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message.js');

describe('Generate message', () => {
  it('Should generate correct message', () => {
    var from = 'Nisha';
    var text = 'Salam';

    var message = generateMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});

describe('Generate location message', () => {
  it('should generate correct location object',() => {
    var lat = 1;
    var lng = 1;
    var url =`https://www.google.com/maps?q=${lat},${lng}`;
    var locationMessage = generateLocationMessage('Admin',lat,lng);

    expect(locationMessage.createdAt).toBeA('number');
    expect(locationMessage.url).toBe(url);
    expect(locationMessage.from).toBe('Admin');
  })
});
