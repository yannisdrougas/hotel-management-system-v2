import api from "../api/api";

// =====================================================
// GET ALL HOTELS
// =====================================================

export const getHotels = () => {

    return api.get("/hotels");

};


// =====================================================
// GET HOTEL BY ID
// =====================================================

export const getHotelById = (id) => {

    return api.get(`/hotels/${id}`);

};


// =====================================================
// CREATE HOTEL
// =====================================================

export const createHotel = (hotel) => {

    return api.post("/hotels", hotel);

};


// =====================================================
// UPDATE HOTEL
// =====================================================

export const updateHotel = (id, hotel) => {

    return api.put(`/hotels/${id}`, hotel);

};


// =====================================================
// DELETE HOTEL
// =====================================================

export const deleteHotel = (id) => {

    return api.delete(`/hotels/${id}`);

};