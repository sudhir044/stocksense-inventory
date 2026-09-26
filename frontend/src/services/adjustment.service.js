import api from "./api";

export const adjustmentService = {
  getAdjustments: async () => {
    const response = await api.get("/adjustments");
    return response.data?.data || [];
  },

  getAdjustmentById: async (id) => {
    const response = await api.get(`/adjustments/${id}`);
    return response.data?.data || response.data;
  },

  createAdjustment: async (adjustmentData) => {
    const response = await api.post("/adjustments", adjustmentData);
    return response.data?.data || response.data;
  },

  validateAdjustment: async (id) => {
    const response = await api.post(`/adjustments/${id}/validate`);
    return response.data?.data || response.data;
  },
};

export default adjustmentService;
