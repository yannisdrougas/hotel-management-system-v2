import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Typography,
    Snackbar,
    Alert
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import RoomTable from "../../components/rooms/RoomTable";
import RoomDialog from "../../components/rooms/RoomDialog";
import RoomFilter from "../../components/rooms/RoomFilter";

import {
    getRooms,
    getRoomsByHotel,
    getRoomsByStatus,
    getRoomsByType,
    createRoom,
    updateRoom,
    deleteRoom
} from "../../services/roomService";

import {
    getHotels
} from "../../services/hotelService";


function RoomList() {

    // =====================================================
    // STATES
    // =====================================================

    const [rooms, setRooms] = useState([]);

    const [hotels, setHotels] = useState([]);

    const [selectedHotel, setSelectedHotel] = useState("");

    const [selectedRoomType, setSelectedRoomType] = useState("");

    const [selectedStatus, setSelectedStatus] = useState("");

    const [openDialog, setOpenDialog] = useState(false);

    const [dialogTitle, setDialogTitle] = useState(
        "Add Room"
    );

    const [selectedRoom, setSelectedRoom] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarSeverity, setSnackbarSeverity] = useState(
        "success"
    );


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadRooms();

        loadHotels();

    }, []);


    // =====================================================
    // LOAD ROOMS
    // =====================================================

    const loadRooms = async () => {

        try {

            const response = await getRooms();

            setRooms(response.data);

        }
        catch (error) {

            console.error(error);

            showSnackbar(
                "Failed to load rooms.",
                "error"
            );

        }

    };


    // =====================================================
    // LOAD HOTELS
    // =====================================================

    const loadHotels = async () => {

        try {

            const response = await getHotels();

            setHotels(response.data);

        }
        catch (error) {

            console.error(error);

            showSnackbar(
                "Failed to load hotels.",
                "error"
            );

        }

    };


    // =====================================================
    // APPLY FILTERS
    // =====================================================

    const applyFilters = async (
        hotelId,
        roomType,
        status
    ) => {

        try {

            let response;


            // -------------------------------------------------
            // NO FILTER
            // -------------------------------------------------

            if (
                hotelId === "" &&
                roomType === "" &&
                status === ""
            ) {

                response = await getRooms();

            }


            // -------------------------------------------------
            // HOTEL + NO OTHER FILTER
            // -------------------------------------------------

            else if (
                hotelId !== "" &&
                roomType === "" &&
                status === ""
            ) {

                response =
                    await getRoomsByHotel(hotelId);

            }


            // -------------------------------------------------
            // STATUS + NO OTHER FILTER
            // -------------------------------------------------

            else if (
                hotelId === "" &&
                roomType === "" &&
                status !== ""
            ) {

                response =
                    await getRoomsByStatus(status);

            }


            // -------------------------------------------------
            // ROOM TYPE + NO OTHER FILTER
            // -------------------------------------------------

            else if (
                hotelId === "" &&
                roomType !== "" &&
                status === ""
            ) {

                response =
                    await getRoomsByType(roomType);

            }


            // -------------------------------------------------
            // MULTIPLE FILTERS
            // -------------------------------------------------

            else {

                response = await getRooms();

                let filteredRooms = response.data;


                if (hotelId !== "") {

                    filteredRooms =
                        filteredRooms.filter(
                            (room) =>
                                room.hotel?.hotelId ===
                                Number(hotelId)
                        );

                }


                if (roomType !== "") {

                    filteredRooms =
                        filteredRooms.filter(
                            (room) =>
                                room.roomType ===
                                roomType
                        );

                }


                if (status !== "") {

                    filteredRooms =
                        filteredRooms.filter(
                            (room) =>
                                room.status ===
                                status
                        );

                }


                setRooms(filteredRooms);

                return;

            }


            setRooms(response.data);

        }
        catch (error) {

            console.error(error);

            showSnackbar(
                "Failed to filter rooms.",
                "error"
            );

        }

    };


    // =====================================================
    // HOTEL FILTER
    // =====================================================

    const handleHotelChange = (value) => {

        setSelectedHotel(value);

        applyFilters(
            value,
            selectedRoomType,
            selectedStatus
        );

    };


    // =====================================================
    // ROOM TYPE FILTER
    // =====================================================

    const handleRoomTypeChange = (value) => {

        setSelectedRoomType(value);

        applyFilters(
            selectedHotel,
            value,
            selectedStatus
        );

    };


    // =====================================================
    // STATUS FILTER
    // =====================================================

    const handleStatusChange = (value) => {

        setSelectedStatus(value);

        applyFilters(
            selectedHotel,
            selectedRoomType,
            value
        );

    };


    // =====================================================
    // CLEAR FILTERS
    // =====================================================

    const handleClearFilters = () => {

        setSelectedHotel("");

        setSelectedRoomType("");

        setSelectedStatus("");

        loadRooms();

    };


    // =====================================================
    // ADD ROOM
    // =====================================================

    const handleAddRoom = () => {

        setSelectedRoom(null);

        setDialogTitle("Add Room");

        setOpenDialog(true);

    };


    // =====================================================
    // EDIT ROOM
    // =====================================================

    const handleEditRoom = (room) => {

        setSelectedRoom(room);

        setDialogTitle("Edit Room");

        setOpenDialog(true);

    };


    // =====================================================
    // SAVE ROOM
    // =====================================================

    const handleSaveRoom = async (roomData) => {

        try {

            if (selectedRoom) {

                await updateRoom(
                    selectedRoom.roomId,
                    roomData
                );

                showSnackbar(
                    "Room updated successfully.",
                    "success"
                );

            }
            else {

                await createRoom(roomData);

                showSnackbar(
                    "Room created successfully.",
                    "success"
                );

            }


            setOpenDialog(false);

            setSelectedRoom(null);

            await applyFilters(
                selectedHotel,
                selectedRoomType,
                selectedStatus
            );

        }
        catch (error) {

            console.error(error);

            showSnackbar(
                selectedRoom
                    ? "Failed to update room."
                    : "Failed to create room.",
                "error"
            );

        }

    };


    // =====================================================
    // DELETE ROOM
    // =====================================================

    const handleDeleteRoom = async (room) => {

        try {

            await deleteRoom(room.roomId);

            showSnackbar(
                "Room deleted successfully.",
                "success"
            );


            await applyFilters(
                selectedHotel,
                selectedRoomType,
                selectedStatus
            );

        }
        catch (error) {

            console.error(error);

            showSnackbar(
                "Failed to delete room.",
                "error"
            );

        }

    };


    // =====================================================
    // CLOSE DIALOG
    // =====================================================

    const handleCloseDialog = () => {

        setOpenDialog(false);

        setSelectedRoom(null);

    };


    // =====================================================
    // SNACKBAR
    // =====================================================

    const showSnackbar = (
        message,
        severity
    ) => {

        setSnackbarMessage(message);

        setSnackbarSeverity(severity);

        setSnackbarOpen(true);

    };


    const handleCloseSnackbar = () => {

        setSnackbarOpen(false);

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <Box sx={{ p: 3 }}>

            {/* =================================================
                HEADER
            ================================================= */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        Rooms
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                    >
                        Manage hotel rooms
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddRoom}
                >
                    Add Room
                </Button>

            </Box>


            {/* =================================================
                FILTERS
            ================================================= */}

            <RoomFilter

                hotels={hotels}

                hotelId={selectedHotel}

                roomType={selectedRoomType}

                status={selectedStatus}

                onHotelChange={handleHotelChange}

                onRoomTypeChange={
                    handleRoomTypeChange
                }

                onStatusChange={
                    handleStatusChange
                }

                onClear={handleClearFilters}

            />


            {/* =================================================
                TABLE
            ================================================= */}

            <RoomTable

                rows={rooms}

                onEdit={handleEditRoom}

                onDelete={handleDeleteRoom}

            />


            {/* =================================================
                DIALOG
            ================================================= */}

            <RoomDialog

                open={openDialog}

                title={dialogTitle}

                room={selectedRoom}

                onClose={handleCloseDialog}

                onSave={handleSaveRoom}

            />


            {/* =================================================
                SNACKBAR
            ================================================= */}

            <Snackbar

                open={snackbarOpen}

                autoHideDuration={4000}

                onClose={handleCloseSnackbar}

                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}

            >

                <Alert

                    onClose={handleCloseSnackbar}

                    severity={snackbarSeverity}

                    variant="filled"

                    sx={{
                        width: "100%"
                    }}

                >

                    {snackbarMessage}

                </Alert>

            </Snackbar>

        </Box>

    );

}


export default RoomList;