import axiosClient from './axiosApi';

const productApi = {
  getAll(params) {
    const url = '/products/allproducts';
    return axiosClient.get(url, { params });
  },

  add(data) {
    const url = '/products/addproduct';
    return axiosClient.post(url, data);
  },

  remove(id) {
    const url = '/products/removeproduct/';
    return axiosClient.post(url, {id: id});
  },
};

export default productApi;
