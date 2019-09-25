import axios from 'axios';

export const getDonationProjects = async (): Promise<any> => {
  return axios.get('https://randomuser.me/api/?results=100');
};

export const getExecutionProjects = async (): Promise<any> => {
  return axios.get('https://randomuser.me/api/?results=100');
};

export const getDoneProjects = async (): Promise<any> => {
  return axios.get('https://randomuser.me/api/?results=100');
};

export const getAllProjects = async (): Promise<any> => {
  return axios.all([getDonationProjects(), getExecutionProjects(), getDoneProjects()]);
};