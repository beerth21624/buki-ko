import BaseStore from './BaseStore';
import { API_URL } from '../config';
import axios from 'axios';
import auth from '../utilis/authen';

export class HomeStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      weaponCountData: {},
      ammuCountData: 0,
    });
  }

  async getCountWeapon() {
    try {
      const { data } = await axios.get(`${API_URL}/weapon/getcount`);
      if (data) {
        this.weaponCountData = data;
      }
    } catch (err) {
      throw err;
    }
  }
  async getCountAmmu() {
    try {
      const { data } = await axios.get(`${API_URL}/ammu/getcount`);
      if (data) {
        this.ammuCountData = data;
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new HomeStore();
