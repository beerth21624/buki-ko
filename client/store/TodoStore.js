import BaseStore from './BaseStore';
import { API_URL } from '../config';
import axios from 'axios';
import auth from '../utilis/authen';

export class TodoStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      todoData: [],
    });
  }

  async createTodo(title, desc) {
    try {
      const { data } = await axios.post(`${API_URL}/todo/create`, {
        title,
        desc,
      });
      return data;
    } catch (err) {
      throw err;
    }
  }

  async getAllTodo() {
    try {
      const { data } = await axios.get(`${API_URL}/todo/getall`);
      if (data) {
        this.todoData = data.todo;
      }
    } catch (err) {
      throw err;
    }
  }
  async deleteTodo(id) {
    try {
      const { data } = await axios.delete(`${API_URL}/todo/delete?id=${id}`);
      if (data) return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new TodoStore();
