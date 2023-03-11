import axios from 'axios';

export default async function editProduct(productId, product) {
  return axios
    .put(`/products/${productId}`, product)
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });
}
