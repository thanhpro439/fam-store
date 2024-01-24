import axiosClient from './axiosApi';

const productApi = {
  getAll(params) {
    const url = '/products/allproducts';
    return axiosClient.get(url);
  },

  getCart(params) {
    const url = '/cart/getcart';
    return axiosClient.get(
      url,
      {},
      {
        headers: {
          Accept: 'application/form-data',
          'auth-token': params,
          'Content-Type': 'application/json',
        },
      }
    );
  },

  getCategory() {
    const url = '/products/category';
    return axiosClient.get(url);
  },

  add(data) {
    const url = '/products/addproduct';
    return axiosClient.post(url, data);
  },

  addToCart(data) {
    const url = '/cart/addtocart';
    return axiosClient.post(
      url,
      {},
      {
        Accept: 'application/form-data',
        'auth-token': `${localStorage.getItem('auth-token')}`,
        'Content-Type': 'application/json',
      }
    );
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
