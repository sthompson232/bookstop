import { getCookie } from './cookies';

export const getRestAPIHeaders = () => {
  const token = getCookie('token');
  return {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
};

export const getUnauthorizedRestAPIHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
};
