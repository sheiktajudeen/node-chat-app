const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Sheik',
      room: 'Node course'
    },
    {
      id: 2,
      name: 'Nisha',
      room: 'react course'
    },
    {
      id: 3,
      name: 'Aaliyah',
      room: 'Node course'
    }];
  });
  it('Should add new user', () => {
    var users = new Users();
    var user = {
      id:'123',
      name:'Sheik',
      room:'office fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('Should return name array for Node room' ,() => {
    var userList = users.getUserList('Node course');
    expect(userList).toEqual(['Sheik','Aaliyah']);
  });

  it('Should return name array for react room' ,() => {
    var userList = users.getUserList('react course');
    expect(userList).toEqual(['Nisha']);
  });

  it('Should remove a user', () => {
    var user = users.removeUser(1);
    expect(users.users.length).toBe(2);
  });

  it('Should not remove a user', () => {
    var user = users.removeUser(4);
    expect(users.users.length).toBe(3);
  });

  it('Should get user', () => {
    var user = users.getUser(1);
    expect(user.name).toBe('Sheik');
    expect(user.room).toBe('Node course');
  });

  it('Should not get user', () => {
    var user = users.getUser(4);
    expect(user).toNotExist();
  });
});
