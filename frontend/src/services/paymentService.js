import api from "../api/api";

// =====================================================
// GET ALL PAYMENTS
// =====================================================

export const getPayments = () => {

    return api.get("/payments");

};


// =====================================================
// GET PAYMENT BY ID
// =====================================================

export const getPaymentById = (id) => {

    return api.get(`/payments/${id}`);

};


// =====================================================
// CREATE PAYMENT
// =====================================================

export const createPayment = (payment) => {

    return api.post("/payments", payment);

};


// =====================================================
// UPDATE PAYMENT
// =====================================================

export const updatePayment = (id, payment) => {

    return api.put(`/payments/${id}`, payment);

};


// =====================================================
// DELETE PAYMENT
// =====================================================

export const deletePayment = (id) => {

    return api.delete(`/payments/${id}`);

};


// =====================================================
// GET PAYMENTS BY RESERVATION
// =====================================================

export const getPaymentsByReservation = (reservationId) => {

    return api.get(
        `/payments/reservation/${reservationId}`
    );

};


// =====================================================
// GET PAYMENTS BY STATUS
// =====================================================

export const getPaymentsByStatus = (status) => {

    return api.get(
        `/payments/status/${status}`
    );

};


// =====================================================
// GET PAYMENTS BY METHOD
// =====================================================

export const getPaymentsByMethod = (method) => {

    return api.get(
        `/payments/method/${method}`
    );

};