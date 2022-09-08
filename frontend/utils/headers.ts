import { getCookie } from './cookies';

export const getRestAPIHeaders = () => {
  const token = getCookie('token');
  const csrftoken = getCookie('csrftoken');
  return {
    'Authorization': `Token ${token}`,
    'X-CSRFToken': csrftoken,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
};

export const getUnauthorizedRestAPIHeaders = () => {
  const csrftoken = getCookie('csrftoken');
  return {
    'X-CSRFToken': csrftoken,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
};
