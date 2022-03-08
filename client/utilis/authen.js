import store from 'store';

export const Authen = {
  TOKEN: 'TOKEN',
  USER_DATA: 'USER_DATA',
};

class Auth {
  isAuthenticated() {
    let userData = this.getUserData();
    let token = this.getToken();
    return token && userData?.id;
  }
  signIn(token, userData) {
    store.set(Authen.TOKEN, token);
    store.set(Authen.USER_DATA, userData);
  }
  getUserData() {
    return store.get(Authen.USER_DATA);
  }
  getToken() {
    return store.get(Authen.TOKEN);
  }
  signOutAndClear() {
    store.clearAll();
  }
}

const auth = new Auth();
export default auth;
