import api from "../api/api";

// =====================================================
// GET ALL ADDRESSES
// =====================================================

export const getAddresses = () => {

    return api.get("/addresses");

};

// =====================================================
// GET ADDRESS BY ID
// =====================================================

export const getAddressById = (id) => {

    return api.get(`/addresses/${id}`);

};

// =====================================================
// CREATE ADDRESS
// =====================================================

export const createAddress = (address) => {

    return api.post("/addresses", address);

};

// =====================================================
// UPDATE ADDRESS
// =====================================================

export const updateAddress = (id, address) => {

    return api.put(`/addresses/${id}`, address);

};

// =====================================================
// DELETE ADDRESS
// =====================================================

export const deleteAddress = (id) => {

    return api.delete(`/addresses/${id}`);

};