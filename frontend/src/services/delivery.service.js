import api from "./api";

export const deliveryService = {
  getDeliveries: async () => {
    const response = await api.get("/deliveries");
    return response.data?.data || [];
  },

  getDeliveryById: async (id) => {
    const response = await api.get(`/deliveries/${id}`);
    return response.data?.data || response.data;
  },

  createDelivery: async (deliveryData) => {
    const response = await api.post("/deliveries", deliveryData);
    return response.data?.data || response.data;
  },

  validateDelivery: async (id) => {
    const response = await api.post(`/deliveries/${id}/validate`);
    return response.data?.data || response.data;
  },
};

export default deliveryService;
