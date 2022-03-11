import BaseStore from './BaseStore';
import { API_URL } from '../config';
import axios from 'axios';
import auth from '../utilis/authen';

export class DocStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      docData: [],
    });
  }

  async create(dataForm) {
    try {
      const { data } = await axios.post(`${API_URL}/doc/create`, dataForm);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getAll() {
    try {
      const { data } = await axios.get(`${API_URL}/doc/getall`);
      if (data) {
        this.docData = data.doc;
      }
    } catch (err) {
      throw err;
    }
  }
  async loadDoc(id) {
    try {
      window.open(`${API_URL}/doc/getDoc?id=${id}`);
      return 'success';
    } catch (err) {
      throw err;
    }
  }
  async deleteDoc(id) {
    try {
      const { data } = await axios.delete(`${API_URL}/doc/delete?id=${id}`);
      if (data) return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new DocStore();
