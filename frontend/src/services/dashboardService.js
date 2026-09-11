import api from "../api/api";

// ==========================================
// CUSTOMER COUNT
// ==========================================

export const getCustomerCount = async () => {

    const response = await api.get("/customers");

    return response.data.length;

};

// ==========================================
// HOTEL COUNT
// ==========================================

export const getHotelCount = async () => {

    const response = await api.get("/hotels");

    return response.data.length;

};

// ==========================================
// ROOM COUNT
// ==========================================

export const getRoomCount = async () => {

    const response = await api.get("/rooms");

    return response.data.length;

};

// =====================================================
// EMPLOYEE COUNT
// =====================================================

export const getEmployeeCount = async () => {

    const response = await api.get("/employees");

    return response.data.length;

};


// =====================================================
// RESERVATION COUNT
// =====================================================

export const getReservationCount = async () => {

    const response = await api.get("/reservations");

    return response.data.length;

};


// =====================================================
// PAYMENT COUNT
// =====================================================

export const getPaymentCount = async () => {

    const response = await api.get("/payments");

    return response.data.length;

};

// =====================================================
// AVAILABLE ROOMS COUNT
// =====================================================

export const getAvailableRoomCount = async () => {

    const response = await api.get("/rooms");

    return response.data.filter(
        room => room.status === "AVAILABLE"
    ).length;

};


// =====================================================
// OCCUPIED ROOMS COUNT
// =====================================================

export const getOccupiedRoomCount = async () => {

    const response = await api.get("/rooms");

    return response.data.filter(
        room => room.status === "OCCUPIED"
    ).length;

};


// =====================================================
// PENDING RESERVATIONS COUNT
// =====================================================

export const getPendingReservationCount = async () => {

    const response = await api.get("/reservations");

    return response.data.filter(
        reservation =>
            reservation.status === "PENDING"
    ).length;

};


// =====================================================
// CONFIRMED RESERVATIONS COUNT
// =====================================================

export const getConfirmedReservationCount = async () => {

    const response = await api.get("/reservations");

    return response.data.filter(
        reservation =>
            reservation.status === "CONFIRMED"
    ).length;

};


// =====================================================
// TOTAL REVENUE
// =====================================================

export const getTotalRevenue = async () => {

    const response = await api.get("/payments");

    return response.data
        .filter(
            payment =>
                payment.paymentStatus === "PAID"
        )
        .reduce(
            (total, payment) =>
                total + Number(payment.amount),
            0
        );

};

// =====================================================
// RESERVED ROOMS COUNT
// =====================================================

export const getReservedRoomCount = async () => {

    const response = await api.get("/rooms");

    return response.data.filter(
        room => room.status === "RESERVED"
    ).length;

};


// =====================================================
// MAINTENANCE ROOMS COUNT
// =====================================================

export const getMaintenanceRoomCount = async () => {

    const response = await api.get("/rooms");

    return response.data.filter(
        room => room.status === "MAINTENANCE"
    ).length;

};


// =====================================================
// COMPLETED RESERVATIONS COUNT
// =====================================================

export const getCompletedReservationCount = async () => {

    const response = await api.get("/reservations");

    return response.data.filter(
        reservation =>
            reservation.status === "COMPLETED"
    ).length;

};


// =====================================================
// CANCELLED RESERVATIONS COUNT
// =====================================================

export const getCancelledReservationCount = async () => {

    const response = await api.get("/reservations");

    return response.data.filter(
        reservation =>
            reservation.status === "CANCELLED"
    ).length;

};