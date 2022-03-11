import BaseStore from './BaseStore';
import { API_URL } from '../config';
import axios from 'axios';
export class BillStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      allBill: [],
      billPageCount: '',
      allBillWeapon: [],
    });
  }
  async createBill(dataForm) {
    try {
      const { data } = await axios.post(`${API_URL}/bill/create`, dataForm);
      console.log(data);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getAllBill(page) {
    console.log('page', page);
    try {
      const { data } = await axios.get(
        `${API_URL}/bill/getallbill?page=${page}`
      );
      this.allBill = data.billData.rows;
      this.billPageCount = Math.ceil(data.billData.count / 6);
      if (data) {
        return 'success';
      }
    } catch (err) {
      throw err;
    }
  }
  async getAllBillWeapon(id) {
    try {
      const { data } = await axios.get(
        `${API_URL}/bill/getallweapon?billId=${id}`
      );
      this.allBillWeapon = data.data;
      console.log('weapon', data);
      if (data) {
        return 'success';
      }
    } catch (err) {
      throw err;
    }
  }
}
export default new BillStore();
