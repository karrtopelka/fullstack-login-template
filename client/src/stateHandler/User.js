import { makeAutoObservable } from 'mobx';

// Model the application state.
class User {
  _id = '';
  email = '';
  name = '';
  lastName = '';
  isAuth = false;
  avatar = '';
  age = null;
  country = '';
  region = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this._id = user._id;
    this.email = user.email;
    this.name = user?.name;
    this.lastName = user?.lastName;
    this.avatar = user?.avatar;
    this.age = user?.age;
    this.country = user?.country;
    this.region = user?.region;
    this.isAuth = true;
  }

  setByField(value, field) {
    this[field] = value;
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

  setAge(age) {
    this.age = age;
  }

  setCountry(country) {
    this.country = country;
  }

  setRegion(region) {
    this.region = region;
  }

  reset() {
    this._id = '';
    this.email = '';
    this.name = '';
    this.lastName = '';
    this.avatar = '';
    this.age = null;
    this.country = '';
    this.region = '';
    this.isAuth = false;
  }
}

export default User;
