import BaseStore from './BaseStore';
import { API_URL } from '../config';
import axios from 'axios';
import auth from '../utilis/authen';

export class UserStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      allUser: [],
    });
  }

  async getAllUser() {
    try {
      const { data } = await axios.get(`${API_URL}/user/getalluser`);
      console.log('alluser', data);
      if (data) {
        this.allUser = data.user;
      }
    } catch (err) {
      throw err;
    }
  }
  async updateRole(userId, userRole) {
    console.log('role', userId);
    console.log('role', userRole);
    try {
      const { data } = await axios.patch(`${API_URL}/user/updaterole`, {
        id: userId,
        role: userRole,
      });
      return data;
    } catch (err) {
      throw err;
    }
  }
  async updateApprove(userId) {
    try {
      const { data } = await axios.patch(`${API_URL}/user/userapprove`, {
        id: userId,
      });
      console.log(data);
      return data;
    } catch (err) {
      throw err;
    }
  }
  async deleteUser(id) {
    try {
      const { data } = await axios.delete(
        `${API_URL}/user/deleteuser?id=${id}`
      );
      if (data) return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new UserStore();
