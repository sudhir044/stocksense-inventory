import api from "./api";

export const transferService = {
  getTransfers: async () => {
    const response = await api.get("/transfers");
    return response.data?.data || [];
  },

  getTransferById: async (id) => {
    const response = await api.get(`/transfers/${id}`);
    return response.data?.data || response.data;
  },

  createTransfer: async (transferData) => {
    const response = await api.post("/transfers", transferData);
    return response.data?.data || response.data;
  },

  validateTransfer: async (id) => {
    const response = await api.post(`/transfers/${id}/validate`);
    return response.data?.data || response.data;
  },
};

export default transferService;
