import BaseStore from './BaseStore';
import { API_URL } from '../config';
import axios from 'axios';
export class TargetStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      createSuccess: true,
      allTarget: [],
      targetPageCount: '',
      TargetData: {},
    });
  }

  async createTarget(dataForm) {
    try {
      const { data } = await axios.post(`${API_URL}/target/create`, dataForm);
      return data;
    } catch (err) {
      throw err;
    }
  }
  setCreateSuccess() {
    this.createSuccess = !this.createSuccess;
  }

  async getAllTarget(page, search) {
    try {
      const { data } = await axios.get(
        `${API_URL}/target/getalltarget?page=${page}&search=${search}`
      );
      this.allTarget = data.targetData.rows;
      this.targetPageCount = Math.ceil(data.targetData.count / 2);
      if (data) {
        return 'success';
      }
    } catch (err) {
      throw err;
    }
  }

  async getTarget(id) {
    try {
      const { data } = await axios.get(`${API_URL}/target/gettarget?id=${id}`);
      if (data) {
        this.TargetData = data.targetData;
        return data.targetData;
      }
    } catch (err) {
      throw err;
    }
  }
  async updateTarget(dataForm) {
    try {
      const { data } = await axios.post(`${API_URL}/target/update`, dataForm);
      return data;
    } catch (err) {
      throw err;
    }
  }
  async deleteTarget(number) {
    try {
      const { data } = await axios.delete(
        `${API_URL}/target/delete?targetBill=${number}`
      );
      if (data) return data;
    } catch (err) {
      throw err;
    }
  }
}
export default new TargetStore();
