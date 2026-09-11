import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Typography,
    Snackbar,
    Alert
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import AddressTable from "../../components/addresses/AddressTable";
import AddressDialog from "../../components/addresses/AddressDialog";

import {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress
} from "../../services/addressService";


function AddressList() {

    // =====================================================
    // STATES
    // =====================================================

    const [addresses, setAddresses] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState(null);

    const [dialogTitle, setDialogTitle] = useState(
        "Add Address"
    );

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarSeverity, setSnackbarSeverity] = useState(
        "success"
    );


    // =====================================================
    // LOAD ADDRESSES
    // =====================================================

    useEffect(() => {

        loadAddresses();

    }, []);


    const loadAddresses = async () => {

        try {

            const response = await getAddresses();

            setAddresses(response.data);

        }
        catch (error) {

            console.error(error);

            setSnackbarSeverity("error");

            setSnackbarMessage(
                "Failed to load addresses."
            );

            setSnackbarOpen(true);

        }

    };


    // =====================================================
    // ADD ADDRESS
    // =====================================================

    const handleAddAddress = () => {

        setSelectedAddress(null);

        setDialogTitle("Add Address");

        setOpenDialog(true);

    };


    // =====================================================
    // EDIT ADDRESS
    // =====================================================

    const handleEditAddress = (address) => {

        setSelectedAddress(address);

        setDialogTitle("Edit Address");

        setOpenDialog(true);

    };


    // =====================================================
    // SAVE ADDRESS
    // =====================================================

    const handleSaveAddress = async (addressData) => {

        try {

            // =================================================
            // CREATE
            // =================================================

            if (selectedAddress === null) {

                await createAddress(addressData);

                setSnackbarSeverity("success");

                setSnackbarMessage(
                    "Address created successfully."
                );

            }

            // =================================================
            // UPDATE
            // =================================================

            else {

                await updateAddress(
                    selectedAddress.addressId,
                    addressData
                );

                setSnackbarSeverity("success");

                setSnackbarMessage(
                    "Address updated successfully."
                );

            }


            // =================================================
            // CLOSE DIALOG
            // =================================================

            setOpenDialog(false);

            setSelectedAddress(null);


            // =================================================
            // REFRESH TABLE
            // =================================================

            await loadAddresses();


            // =================================================
            // SHOW MESSAGE
            // =================================================

            setSnackbarOpen(true);

        }
        catch (error) {

            console.error(error);

            setSnackbarSeverity("error");

            setSnackbarMessage(
                "Failed to save address."
            );

            setSnackbarOpen(true);

        }

    };


    // =====================================================
    // DELETE ADDRESS
    // =====================================================

    const handleDeleteAddress = async (address) => {

        const confirmDelete = window.confirm(

            `Delete address ${address.street} ${address.streetNumber}, ${address.city}?`

        );

        if (!confirmDelete) {

            return;

        }


        try {

            await deleteAddress(address.addressId);

            await loadAddresses();

            setSnackbarSeverity("success");

            setSnackbarMessage(
                "Address deleted successfully."
            );

            setSnackbarOpen(true);

        }
        catch (error) {

            console.error(error);

            setSnackbarSeverity("error");

            setSnackbarMessage(
                "Cannot delete this address because it is used by a customer."
            );

            setSnackbarOpen(true);

        }

    };


    // =====================================================
    // CLOSE DIALOG
    // =====================================================

    const handleCloseDialog = () => {

        setOpenDialog(false);

        setSelectedAddress(null);

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
                        Addresses
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                    >
                        Manage customer addresses
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddAddress}
                >
                    Add Address
                </Button>

            </Box>


            {/* =================================================
                ADDRESS TABLE
            ================================================= */}

            <AddressTable

                rows={addresses}

                onEdit={handleEditAddress}

                onDelete={handleDeleteAddress}

            />


            {/* =================================================
                ADDRESS DIALOG
            ================================================= */}

            <AddressDialog

                open={openDialog}

                title={dialogTitle}

                address={selectedAddress}

                onClose={handleCloseDialog}

                onSave={handleSaveAddress}

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


export default AddressList;