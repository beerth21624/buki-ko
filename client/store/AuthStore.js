import BaseStore from './BaseStore';
import { API_URL } from '../config';
import axios from 'axios';
import auth from '../utilis/authen';

export class AuthStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      loginFail:false
    });
  }
  async fetchRegister(formData) {
    console.log('step2', FormData);
    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, {
        name: formData.name,
        rank: formData.rank,
        username: formData.username,
        password: formData.password,
      });
      if (data) {
        return 'success';
      }
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
      console.log('loggin', data);
      if (data === 'validate') {
        return 'validate';
      }

      auth.signIn(data.token, data.userData);
    } catch (error) {
          return 'fail';
    }
  }
}

export default new AuthStore();
