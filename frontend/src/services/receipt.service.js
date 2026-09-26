import api from "./api";

export const receiptService = {
  getReceipts: async () => {
    const response = await api.get("/receipts");
    return response.data?.data || [];
  },

  getReceiptById: async (id) => {
    const response = await api.get(`/receipts/${id}`);
    return response.data?.data || response.data;
  },

  createReceipt: async (receiptData) => {
    const response = await api.post("/receipts", receiptData);
    return response.data?.data || response.data;
  },

  validateReceipt: async (id) => {
    const response = await api.post(`/receipts/${id}/validate`);
    return response.data?.data || response.data;
  },
};

export default receiptService;
