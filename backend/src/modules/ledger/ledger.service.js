import {
    findLedgerEntries,
    findLedgerEntryById,
} from "./ledger.repository.js";


export const getLedgerEntries = async (filters) => {
    return await findLedgerEntries(filters);
};


export const getLedgerEntry = async (id) => {
    const entry = await findLedgerEntryById(id);

    if (!entry) {
        throw new Error("Ledger entry not found");
    }

    return entry;
};