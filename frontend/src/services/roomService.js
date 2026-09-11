import api from "../api/api";

// =====================================================
// GET ALL ROOMS
// =====================================================

export const getRooms = () => {

    return api.get("/rooms");

};


// =====================================================
// GET ROOM BY ID
// =====================================================

export const getRoomById = (id) => {

    return api.get(`/rooms/${id}`);

};


// =====================================================
// CREATE ROOM
// =====================================================

export const createRoom = (room) => {

    return api.post("/rooms", room);

};


// =====================================================
// UPDATE ROOM
// =====================================================

export const updateRoom = (id, room) => {

    return api.put(`/rooms/${id}`, room);

};


// =====================================================
// DELETE ROOM
// =====================================================

export const deleteRoom = (id) => {

    return api.delete(`/rooms/${id}`);

};


// =====================================================
// GET ROOMS BY HOTEL
// =====================================================

export const getRoomsByHotel = (hotelId) => {

    return api.get(`/rooms/hotel/${hotelId}`);

};


// =====================================================
// GET ROOMS BY STATUS
// =====================================================

export const getRoomsByStatus = (status) => {

    return api.get(`/rooms/status/${status}`);

};


// =====================================================
// GET ROOMS BY TYPE
// =====================================================

export const getRoomsByType = (roomType) => {

    return api.get(`/rooms/type/${roomType}`);

};