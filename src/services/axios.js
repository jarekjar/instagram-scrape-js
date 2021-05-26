import axios from 'axios';

export const getFollowers = data => {
  const { username, password, account } = data;
  return axios.get(`http://172.118.141.205:3000/followers?username=${username}&password=${password}&profile=${account}`);
};

export const getStatus = () => {
  return axios.get(`http://172.118.141.205:3000/followers/status`);
}