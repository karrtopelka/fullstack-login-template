import axios from 'axios';

export const registration = async (email, password, passwordConfirm) => {
  try {
    if (password !== passwordConfirm) {
      return {
        status: 400,
        data: {
          message: 'Password not match',
        },
      };
    }

    const response = await axios.post('http://localhost:5000/api/auth/registration', {
      email,
      password,
    });

    localStorage.setItem('token', JSON.stringify(response.data.token));

    return response;
  } catch (err) {
    console.warn(err.response);
    return err.response;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });

    localStorage.setItem('token', JSON.stringify(response.data.token));

    return response;
  } catch (err) {
    console.warn(err.response);
    return err.response;
  }
};

export const auth = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/auth', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    localStorage.setItem('token', response.data.token);

    return response;
  } catch (err) {
    console.warn(err);
    return err.response;
  }
};
