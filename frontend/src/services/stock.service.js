import api from "./api";

export const stockService = {
  getStock: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.productId) params.append("productId", filters.productId);
    if (filters.locationId) params.append("locationId", filters.locationId);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const response = await api.get(`/stock${queryString}`);
    return response.data?.data || [];
  },
};

export default stockService;
