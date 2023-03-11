import axios from 'axios';

export default async function fetchProducts() {
  return axios
    .get('/products')
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });
}
