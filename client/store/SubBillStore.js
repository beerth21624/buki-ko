import BaseStore from './BaseStore';
import { API_URL } from '../config';
import axios from 'axios';
export class SubBillStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      allSubBill: [],
      subBillPageCount: '',
    });
  }
  async getAllSubBill(page, type) {
    try {
      const { data } = await axios.get(
        `${API_URL}/subbill/getallsubbill?page=${page}&type=${type}`
      );
      this.allSubBill = data.subbillData.rows;
      this.subBillPageCount = Math.ceil(data.subbillData.count / 6);
      if (data) {
        return 'success';
      }
    } catch (err) {
      throw err;
    }
  }
}
export default new SubBillStore();
