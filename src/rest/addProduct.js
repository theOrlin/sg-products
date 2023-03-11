import axios from 'axios';

export default async function addProduct(product) {
  return axios
    .post('/products', product)
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });
}
