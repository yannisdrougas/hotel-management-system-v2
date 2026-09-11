import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Typography,
    Snackbar,
    Alert
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import HotelTable from "../../components/hotels/HotelTable";
import HotelDialog from "../../components/hotels/HotelDialog";

import {
    getHotels,
    createHotel,
    updateHotel,
    deleteHotel
} from "../../services/hotelService";


function HotelList() {

    // =====================================================
    // STATES
    // =====================================================

    const [hotels, setHotels] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [dialogTitle, setDialogTitle] = useState(
        "Add Hotel"
    );

    const [selectedHotel, setSelectedHotel] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarSeverity, setSnackbarSeverity] = useState(
        "success"
    );


    // =====================================================
    // LOAD HOTELS
    // =====================================================

    useEffect(() => {

        loadHotels();

    }, []);


    const loadHotels = async () => {

        try {

            const response = await getHotels();

            setHotels(response.data);

        }
        catch (error) {

            console.error(error);

            setSnackbarSeverity("error");

            setSnackbarMessage(
                "Failed to load hotels."
            );

            setSnackbarOpen(true);

        }

    };


    // =====================================================
    // ADD HOTEL
    // =====================================================

    const handleAddHotel = () => {

        setSelectedHotel(null);

        setDialogTitle("Add Hotel");

        setOpenDialog(true);

    };


    // =====================================================
    // EDIT HOTEL
    // =====================================================

    const handleEditHotel = (hotel) => {

        console.log(
            "EDIT HOTEL:",
            hotel
        );

        setSelectedHotel(hotel);

        setDialogTitle("Edit Hotel");

        setOpenDialog(true);

    };


    // =====================================================
    // SAVE HOTEL
    // =====================================================

    const handleSaveHotel = async (hotelData) => {

        try {

            // =================================================
            // CREATE
            // =================================================

            if (!selectedHotel) {

                await createHotel(hotelData);

                setSnackbarSeverity("success");

                setSnackbarMessage(
                    "Hotel created successfully."
                );

            }

            // =================================================
            // UPDATE
            // =================================================

            else {

                await updateHotel(
                    selectedHotel.hotelId,
                    hotelData
                );

                setSnackbarSeverity("success");

                setSnackbarMessage(
                    "Hotel updated successfully."
                );

            }


            // =================================================
            // CLOSE DIALOG
            // =================================================

            setOpenDialog(false);

            setSelectedHotel(null);


            // =================================================
            // REFRESH TABLE
            // =================================================

            await loadHotels();


            // =================================================
            // SHOW MESSAGE
            // =================================================

            setSnackbarOpen(true);

        }
        catch (error) {

            console.error(error);

            setSnackbarSeverity("error");

            setSnackbarMessage(
                "Failed to save hotel."
            );

            setSnackbarOpen(true);

        }

    };


    // =====================================================
    // DELETE HOTEL
    // =====================================================

    const handleDeleteHotel = async (hotel) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete hotel "${hotel.name}"?`
        );


        if (!confirmed) {

            return;

        }


        try {

            await deleteHotel(
                hotel.hotelId
            );

            setSnackbarSeverity("success");

            setSnackbarMessage(
                "Hotel deleted successfully."
            );

            await loadHotels();

            setSnackbarOpen(true);

        }
        catch (error) {

            console.error(error);

            setSnackbarSeverity("error");

            setSnackbarMessage(
                "Failed to delete hotel."
            );

            setSnackbarOpen(true);

        }

    };


    // =====================================================
    // CLOSE DIALOG
    // =====================================================

    const handleCloseDialog = () => {

        setOpenDialog(false);

        setSelectedHotel(null);

    };


    // =====================================================
    // CLOSE SNACKBAR
    // =====================================================

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
                        Hotels
                    </Typography>


                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                    >
                        Manage hotels
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddHotel}
                >
                    Add Hotel
                </Button>

            </Box>


            {/* =================================================
                HOTEL TABLE
            ================================================= */}

            <HotelTable

                rows={hotels}

                onEdit={handleEditHotel}

                onDelete={handleDeleteHotel}

            />


            {/* =================================================
                HOTEL DIALOG
            ================================================= */}

            <HotelDialog

                open={openDialog}

                title={dialogTitle}

                hotel={selectedHotel}

                onClose={handleCloseDialog}

                onSave={handleSaveHotel}

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


export default HotelList;