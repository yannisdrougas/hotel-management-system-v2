import api from "../api/api";

// =====================================================
// GET ALL CUSTOMERS
// =====================================================

export const getCustomers = () => {

    return api.get("/customers");

};

// =====================================================
// GET CUSTOMER BY ID
// =====================================================

export const getCustomerById = (id) => {

    return api.get(`/customers/${id}`);

};

// =====================================================
// CREATE CUSTOMER
// =====================================================

export const createCustomer = (customer) => {

    return api.post("/customers", customer);

};

// =====================================================
// UPDATE CUSTOMER
// =====================================================

export const updateCustomer = (id, customer) => {

    return api.put(`/customers/${id}`, customer);

};

// =====================================================
// DELETE CUSTOMER
// =====================================================

export const deleteCustomer = (id) => {

    return api.delete(`/customers/${id}`);

};