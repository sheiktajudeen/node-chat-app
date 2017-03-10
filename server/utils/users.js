// [{
//   id:'/#adad',
//   name: 'Sheik',
//   room: 'The office fans'
// }]

//add user(id,name,room)
//remove user(socketid)
//getUser(id)
//getUserList(room)

class Users {
  constructor(){
    this.users = [];
  }

  addUser(id,name,room){
    var user = {id,name,room};
    this.users.push(user);
    return user;
  };

  removeUser(id){
    var user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  };

  getUser(id){
    return this.users.filter((user) => user.id === id)[0];
  };

  getUserList(room){
    var users = this.users.filter((user) => user.room === room);
    var nameArray = users.map((user) => user.name);

    return nameArray;
  };
}

module.exports = {
  Users
}
// class Person{
//   constructor(name,age){
//     this.name = name;
//     this.age = age
//   }
//
//   getUserDescription(){
//     return `${this.name} is ${this.age} years old`
//   }
// }
