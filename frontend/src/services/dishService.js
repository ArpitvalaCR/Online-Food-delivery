import api from './api';

export const dishService = {
  getDishes: async (category = '', search = '') => {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    const query = params.toString() ? `?${params.toString()}` : '';
    return await api.get(`/dishes${query}`);
  },

  getDishById: async (id) => {
    return await api.get(`/dishes/${id}`);
  },

  addDish: async (dishData) => {
    return await api.post('/dishes', dishData);
  },

  updateDish: async (id, dishData) => {
    return await api.put(`/dishes/${id}`, dishData);
  },

  deleteDish: async (id) => {
    return await api.delete(`/dishes/${id}`);
  }
};
