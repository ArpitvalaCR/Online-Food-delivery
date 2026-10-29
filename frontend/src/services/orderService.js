import api from './api';

export const orderService = {
  createOrder: async (orderPayload) => {
    return await api.post('/orders', orderPayload);
  },

  getOrderById: async (orderId) => {
    const encoded = encodeURIComponent(orderId);
    return await api.get(`/orders/${encoded}`);
  },

  getAllOrders: async () => {
    return await api.get('/orders');
  },

  updateOrderStage: async (orderId, stage) => {
    const encoded = encodeURIComponent(orderId);
    return await api.patch(`/orders/${encoded}/stage`, { stage });
  }
};
