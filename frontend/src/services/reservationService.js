import api from "../api/api";

// =====================================================
// GET ALL RESERVATIONS
// =====================================================

export const getReservations = () => {
    return api.get("/reservations");
};


// =====================================================
// GET RESERVATION BY ID
// =====================================================

export const getReservationById = (id) => {
    return api.get(`/reservations/${id}`);
};


// =====================================================
// CREATE RESERVATION
// =====================================================

export const createReservation = (reservation) => {
    return api.post("/reservations", reservation);
};


// =====================================================
// UPDATE RESERVATION
// =====================================================

export const updateReservation = (id, reservation) => {
    return api.put(`/reservations/${id}`, reservation);
};


// =====================================================
// DELETE RESERVATION
// =====================================================

export const deleteReservation = (id) => {
    return api.delete(`/reservations/${id}`);
};


// =====================================================
// FIND RESERVATIONS BY CUSTOMER
// =====================================================

export const getReservationsByCustomer = (customerId) => {
    return api.get(`/reservations/customer/${customerId}`);
};


// =====================================================
// FIND RESERVATIONS BY ROOM
// =====================================================

export const getReservationsByRoom = (roomId) => {
    return api.get(`/reservations/room/${roomId}`);
};


// =====================================================
// FIND RESERVATIONS BY EMPLOYEE
// =====================================================

export const getReservationsByEmployee = (employeeId) => {
    return api.get(`/reservations/employee/${employeeId}`);
};


// =====================================================
// FIND RESERVATIONS BY STATUS
// =====================================================

export const getReservationsByStatus = (status) => {
    return api.get(`/reservations/status/${status}`);
};