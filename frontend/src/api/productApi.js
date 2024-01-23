import axiosClient from './axiosApi';

const productApi = {
  getAll(params) {
    const url = '/products/allproducts';
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/products/addproduct';
    return axiosClient.post(url, data);
  },

  removeImage(id) {
    const url = '/delete';
    return axiosClient.post(url, { id: id });
  },

  removeProduct(id) {
    const url = '/products/removeproduct';
    return axiosClient.post(url, { id: id });
  },
};

export default productApi;
