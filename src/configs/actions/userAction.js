import { default as axios } from '../axiosConfig';

import swal from 'sweetalert';

export const register = (data, history) => async (dispatch) => {
  try {
    await axios.post('/users', {
      username: data.username,
      email: data.email,
      password: data.password,
    });
    swal('Success', 'Register successful, check your email to activation', 'success');
    history.push('/login');
  } catch (error) {
    if (error.response.data.statusCode === 422) {
      swal('Failed', error.response.data.error[0].msg || 'Internal Server Error', 'error');
    } else {
      swal('Failed', error?.response?.data?.message || 'Internal Server Error', 'error');
    }
  }
  dispatch({ type: 'REQUEST' });
};

export const checkEmail = (data, history) => async (dispatch) => {
  try {
    await axios.post('/users/forgotPassword', {
      email: data.email,
    });
    swal('Success', 'check email to create a new password', 'success');
  } catch (error) {
    swal('Failed', error?.response?.data?.message || 'Internal Server Error', 'error');
  }
  dispatch({ type: 'REQUEST' });
};

export const login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await (await axios.post('users/login', formData)).data;
    dispatch({ type: 'LOGIN', payload: data });
    swal('Success', 'Login success', 'success');
    history.push('/dashboard');
  } catch (error) {
    if (error.response.data.statusCode === 400) {
      return { status: 'error', error: error.response.data };
    } else if (error.response.data.statusCode === 422) {
      return { status: 'error', error: error.response.data };
    } else {
      swal('error', 'failed', 'error');
    }
  }
};
