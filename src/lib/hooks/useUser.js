import axios from 'axios';

const useUser = () => {
  const isAuthenticated = async () => {
    const response = await axios.get('/api/auth/user');

    return response.data.success;
  };

  return { isAuthenticated };
};

export default useUser;
