import axios from 'axios';

export default async function getPermissions() {
  return axios
    .get('/permissions')
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });
}
