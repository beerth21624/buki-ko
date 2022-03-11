import BaseStore from './BaseStore';
import { API_URL } from '../config';
import axios from 'axios';
export class AmmuStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      allAmmu: [],
      createSuccess: true,
      ammuPageCount: '',
      AmmuData: {},
    });
  }
  async createAmmu(dataForm) {
    try {
      const { data } = await axios.post(`${API_URL}/ammu/create`, dataForm);
      return data;
    } catch (err) {
      throw err;
    }
  }
  setCreateSuccess() {
    this.createSuccess = !this.createSuccess;
  }
  setAllAmmu(data) {
    this.allAmmu = data;
  }

  async getAllAmmu(page, search) {
    try {
      const { data } = await axios.get(
        `${API_URL}/ammu/getallammu?page=${page}&search=${search}`
      );
      this.allAmmu = data.ammuData.rows;
      this.ammuPageCount = Math.ceil(data.ammuData.count / 8);
      if (data) {
        return 'success';
      }
    } catch (err) {
      throw err;
    }
  }

  async getAmmu(id) {
    try {
      const { data } = await axios.get(`${API_URL}/ammu/getammu?id=${id}`);
      if (data) {
        this.AmmuData = data.ammuData;
        return data;
      }
    } catch (err) {
      throw err;
    }
  }
  async updateAmmu(dataForm) {
    try {
      const { data } = await axios.post(`${API_URL}/ammu/update`, dataForm);
      return data;
    } catch (err) {
      throw err;
    }
  }
  async deleteAmmu(number) {
    try {
      const { data } = await axios.delete(
        `${API_URL}/ammu/delete?ammuLot=${number}`
      );
      if (data) return data;
    } catch (err) {
      throw err;
    }
  }
  async createAmmuBill(dataForm) {
    try {
      const { data } = await axios.post(`${API_URL}/subbill/create`, dataForm);
      return data;
    } catch (err) {
      throw err;
    }
  }
}
export default new AmmuStore();
