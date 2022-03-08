import BaseStore from './BaseStore';
import { API_URL } from '../config';
import axios from 'axios';

export class WeaponStore extends BaseStore {
  constructor() {
    super();
    this.observable({
      allWeapon: [],
      weaponPageCount: '',
      createSuccess: true,
      Weapon: {
        gunNumber: '-',
        gunName: '-',
        gunBill: '-',
        gunStore: '-',
      },
    });
  }

  async createWeapon(dataForm) {
    try {
      const { data } = await axios.post(`${API_URL}/weapon/create`, dataForm);
      return data;
    } catch (err) {
      throw err;
    }
  }
  async updateWeapon(dataForm) {
    console.log('sucessupdate', dataForm.get('gunName'));
    try {
      const { data } = await axios.post(`${API_URL}/weapon/update`, dataForm);
      return data;
    } catch (err) {
      throw err;
    }
  }
  async getAllWeapon(page, type, search) {
    try {
      const { data } = await axios.get(
        `${API_URL}/weapon/getallweapon?page=${page}&status=${type}&search=${search}`
      );
      this.allWeapon = data.weaponData.rows;
      this.weaponPageCount = Math.ceil(data.weaponData.count / 2);
      if (data) {
        return 'success';
      }
    } catch (err) {
      throw err;
    }
  }
  async getWeapon(id) {
    try {
      const { data } = await axios.get(`${API_URL}/weapon/getweapon?id=${id}`);
      if (data) {
        this.Weapon = data.weaponData;
        console.log('data', data.weaponData);
        return data.weaponData;
      }
    } catch (err) {
      throw err;
    }
  }

  setAllWeapon(data) {
    this.allWeapon = data;
  }

  setCreateSuccess() {
    this.createSuccess = !this.createSuccess;
  }

  async deleteWeapon(number) {
    try {
      const { data } = await axios.delete(
        `${API_URL}/weapon/delete?gunNumber=${number}`
      );
      if (data) return data;
    } catch (err) {
      throw err;
    }
  }
}

export default new WeaponStore();
