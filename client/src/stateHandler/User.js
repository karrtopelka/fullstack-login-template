import { makeAutoObservable } from 'mobx';

// Model the application state.
class User {
  _id = '';
  email = '';
  name = '';
  lastName = '';
  isAuth = false;
  avatar = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this._id = user._id;
    this.email = user.email;
    this.name = user?.name;
    this.lastName = user?.lastName;
    this.avatar = user?.avatar;
    this.isAuth = true;
  }

  setEmail(email) {
    this.email = email;
  }

  setName(name) {
    this.name = name;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setAvatar(avatar) {
    this.avatar = avatar;
  }

  reset() {
    this._id = '';
    this.email = '';
    this.name = '';
    this.lastName = '';
    this.avatar = '';
    this.isAuth = false;
  }
}

export default User;
