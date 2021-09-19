import axios from 'axios';
// const production = 'http://91.201.235.235:7000/api';
const local = 'http://localhost:7000/api';

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

    const response = await axios.post(`${local}/auth/registration`, {
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
    const response = await axios.post(`${local}/auth/login`, {
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
    const response = await axios.get(`${local}/auth/auth`, {
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

export const infoUpdate = async ({ id, name, lastName, avatar, age, country, region, socials }) => {
  try {
    const response = await axios.patch(`${local}/user/update`, {
      id,
      name,
      lastName,
      avatar,
      age,
      country,
      region,
      socials
    });

    return response;
  } catch (err) {
    console.warn(err);
    return err.response;
  }
};

export const privateInfoUpdate = async ({ id, email, password }) => {
  try {
    const response = await axios.patch(`${local}/user/private-update`, {
      id,
      email,
      password,
    });

    localStorage.removeItem('token');

    return response;
  } catch (err) {
    console.warn(err);
    return err.response;
  }
};

export const avatarUpdate = async ({ id, avatar }) => {
  try {
    const formData = new FormData();

    formData.append('avatar', avatar);
    formData.append('userId', id);

    const response = await axios.post(`${local}/user/avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (err) {
    console.warn(err);
    return err.response;
  }
};

export const getUser = async ({ id }) => {
  try {
    const response = await axios.get(`${local}/user/${id}`);

    return response;
  } catch (err) {
    console.warn(err);
    return err.response;
  }
};
