import { makeAutoObservable } from 'mobx';

// Model the application state.
class User {
  _id = '';
  email = '';
  name = '';
  lastName = '';
  isAuth = false;
  avatar = '';
  age = 0;
  country = '';
  region = '';
  socials = [];

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
    this.socials = user?.socials;
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

  setSocials(socials) {
    this.socials = socials;
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
    this.socials = [];
    this.isAuth = false;
  }
}

export default User;
