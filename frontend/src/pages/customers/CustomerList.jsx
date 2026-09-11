import { useEffect, useState } from "react";
import { getAddresses } from "../../services/addressService";

import {
    Box,
    Button,
    Typography,
    Snackbar,
    Alert
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import CustomerTable from "../../components/customers/CustomerTable";
import CustomerDialog from "../../components/customers/CustomerDialog";

import {

    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer

} from "../../services/customerService";

function CustomerList() {

    // =====================================================
    // STATES
    // =====================================================

    const [customers, setCustomers] = useState([]);

    const [addresses, setAddresses] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [dialogTitle, setDialogTitle] = useState("Add Customer");

    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    // =====================================================
    // LOAD CUSTOMERS
    // =====================================================

    useEffect(() => {

        loadCustomers();
        loadAddresses();


    }, []);

    const loadCustomers = async () => {

        try {

            const response = await getCustomers();

            setCustomers(response.data);

        }

        catch (error) {

            console.error(error);

            setSnackbarSeverity("error");

            setSnackbarMessage("Failed to load customers.");

            setSnackbarOpen(true);

        }

    };

    const loadAddresses = async () => {

    try {

        const response = await getAddresses();

        setAddresses(response.data);

    }
    catch (error) {

        console.error("Failed to load addresses:", error);

    }

};

    // =====================================================
    // ADD CUSTOMER
    // =====================================================

    const handleAddCustomer = () => {

        setSelectedCustomer(null);

        setDialogTitle("Add Customer");

        setOpenDialog(true);

    };

    // =====================================================
    // EDIT CUSTOMER
    // =====================================================

    const handleEditCustomer = (customer) => {

        setSelectedCustomer(customer);

        setDialogTitle("Edit Customer");

        setOpenDialog(true);

    };

    // =====================================================
    // DELETE CUSTOMER
    // =====================================================

    const handleDeleteCustomer = async (customer) => {

        const confirmDelete = window.confirm(

            `Delete customer ${customer.firstName} ${customer.lastName}?`

        );

        if (!confirmDelete) {

            return;

        }

        try {

            await deleteCustomer(customer.customerId);

            await loadCustomers();

            setSnackbarSeverity("success");

            setSnackbarMessage("Customer deleted successfully.");

            setSnackbarOpen(true);

        }

        catch (error) {

            console.error(error);

            setSnackbarSeverity("error");

            setSnackbarMessage("Failed to delete customer.");

            setSnackbarOpen(true);

        }

    };

    // =====================================================
    // SAVE CUSTOMER
    // =====================================================

    const handleSaveCustomer = async (customerData) => {

        try {

            if (selectedCustomer == null) {

                await createCustomer(customerData);

                setSnackbarMessage("Customer created successfully.");

            }

            else {

                await updateCustomer(

                    selectedCustomer.customerId,

                    customerData

                );

                setSnackbarMessage("Customer updated successfully.");

            }

            setSnackbarSeverity("success");

            setOpenDialog(false);

            await loadCustomers();

            setSnackbarOpen(true);

        }

        catch (error) {

            console.error(error);

            setSnackbarSeverity("error");

            setSnackbarMessage("Operation failed.");

            setSnackbarOpen(true);

        }

    };

    // =====================================================
    // CLOSE DIALOG
    // =====================================================

    const handleCloseDialog = () => {

        setOpenDialog(false);

    };

    // =====================================================
    // CLOSE SNACKBAR
    // =====================================================

    const handleCloseSnackbar = () => {

        setSnackbarOpen(false);

    };

        return (

        <Box sx={{ p: 3 }}>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    Customers
                </Typography>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddCustomer}
                >
                    Add Customer
                </Button>

            </Box>

            <CustomerTable

                rows={customers}

                addresses={addresses}

                onEdit={handleEditCustomer}

                onDelete={handleDeleteCustomer}

            />

            <CustomerDialog

                open={openDialog}

                title={dialogTitle}

                customer={selectedCustomer}

                onClose={handleCloseDialog}

                onSave={handleSaveCustomer}

            />

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

                    sx={{ width: "100%" }}

                >

                    {snackbarMessage}

                </Alert>

            </Snackbar>

        </Box>

    );

}

export default CustomerList;