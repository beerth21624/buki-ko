import BaseStore from './BaseStore';
import { API_URL } from '../config';
import axios from 'axios';
export class PllStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      createSuccess: true,
      allPll: [],
      pllPageCount: '',
      PllData: {},
    });
  }
  async createPll(dataForm) {
    try {
      const { data } = await axios.post(`${API_URL}/pll/create`, dataForm);
      return data;
    } catch (err) {
      throw err;
    }
  }
  setCreateSuccess() {
    this.createSuccess = !this.createSuccess;
  }

  async getAllPll(page, search) {
    try {
      const { data } = await axios.get(
        `${API_URL}/pll/getallpll?page=${page}&search=${search}`
      );
      this.allPll = data.pllData.rows;
      this.pllPageCount = Math.ceil(data.pllData.count / 2);
      if (data) {
        return 'success';
      }
    } catch (err) {
      throw err;
    }
  }

  async getPll(id) {
    try {
      const { data } = await axios.get(`${API_URL}/pll/getpll?id=${id}`);
      if (data) {
        this.PllData = data.pllData;
        return data.pllData;
      }
    } catch (err) {
      throw err;
    }
  }
  async updatePll(dataForm) {
    try {
      const { data } = await axios.post(`${API_URL}/pll/update`, dataForm);
      return data;
    } catch (err) {
      throw err;
    }
  }
  async deletePll(number) {
    try {
      const { data } = await axios.delete(
        `${API_URL}/pll/delete?pllNumber=${number}`
      );
      if (data) return data;
    } catch (err) {
      throw err;
    }
  }
}
export default new PllStore();
