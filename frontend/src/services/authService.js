import api from './api';

export const authService = {
  login: async (identifier, password, rememberThaliPreference) => {
    return await api.post('/auth/login', { identifier, password, rememberThaliPreference });
  },

  register: async (name, phone, email, password, rememberThaliPreference) => {
    return await api.post('/auth/register', { name, phone, email, password, rememberThaliPreference });
  },

  otpLogin: async (phone) => {
    return await api.post('/auth/otp-login', { phone });
  }
};
