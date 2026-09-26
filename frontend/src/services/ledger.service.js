import api from "./api";

export const ledgerService = {
  getLedger: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.productId) params.append("productId", filters.productId);
    if (filters.locationId) params.append("locationId", filters.locationId);
    if (filters.warehouseId) params.append("warehouseId", filters.warehouseId);
    if (filters.movementType) params.append("movementType", filters.movementType);
    if (filters.referenceType) params.append("referenceType", filters.referenceType);
    if (filters.fromDate) params.append("fromDate", filters.fromDate);
    if (filters.toDate) params.append("toDate", filters.toDate);
    if (filters.search) params.append("search", filters.search);

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const response = await api.get(`/ledger${queryString}`);
    return response.data?.data || [];
  },

  getLedgerById: async (id) => {
    const response = await api.get(`/ledger/${id}`);
    return response.data?.data || response.data;
  },
};

export default ledgerService;
