import axios from 'axios';

export default async function deleteProduct(productId) {
  axios
    .delete(`/products/${productId}`)
    .then((data) => data)
    .catch((error) => {
      console.error(error);
    });
}
