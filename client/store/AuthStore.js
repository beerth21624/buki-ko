import BaseStore from './BaseStore';
import { API_URL } from '../config';
import axios from 'axios';
import auth from '../utilis/authen';

export class AuthStore extends BaseStore {
  constructor() {
    super();
    this.observable({});
  }
  async fetchRegister() {
    try {
    } catch (error) {
      throw error;
    }
  }
  async fetchLogin(formData) {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, {
        username: formData.username,
        password: formData.password,
      });
      auth.signIn(data.token, data.user);
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthStore();
