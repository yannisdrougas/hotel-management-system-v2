import {
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Box,
    Button,
    Typography,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import PaymentTable
    from "../../components/payments/PaymentTable";

import PaymentDialog
    from "../../components/payments/PaymentDialog";

import PaymentFilter
    from "../../components/payments/PaymentFilter";

import {
    getPayments,
    createPayment,
    updatePayment,
    deletePayment
} from "../../services/paymentService";

import {
    getReservations
} from "../../services/reservationService";


function PaymentList() {

    // =====================================================
    // PAYMENTS
    // =====================================================

    const [payments, setPayments] =
        useState([]);


    // =====================================================
    // RESERVATIONS FOR FILTER
    // =====================================================

    const [reservations, setReservations] =
        useState([]);


    // =====================================================
    // FILTER STATES
    // =====================================================

    const [
        selectedReservationId,
        setSelectedReservationId
    ] = useState("");

    const [
        selectedPaymentMethod,
        setSelectedPaymentMethod
    ] = useState("");

    const [
        selectedPaymentStatus,
        setSelectedPaymentStatus
    ] = useState("");


    // =====================================================
    // ADD / EDIT DIALOG STATES
    // =====================================================

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [
        selectedPayment,
        setSelectedPayment
    ] = useState(null);


    // =====================================================
    // DELETE DIALOG STATES
    // =====================================================

    const [
        deleteDialogOpen,
        setDeleteDialogOpen
    ] = useState(false);

    const [
        paymentToDelete,
        setPaymentToDelete
    ] = useState(null);


    // =====================================================
    // SNACKBAR STATES
    // =====================================================

    const [
        snackbarOpen,
        setSnackbarOpen
    ] = useState(false);

    const [
        snackbarMessage,
        setSnackbarMessage
    ] = useState("");

    const [
        snackbarSeverity,
        setSnackbarSeverity
    ] = useState("success");


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadPayments();

        loadReservations();

    }, []);


    // =====================================================
    // LOAD PAYMENTS
    // =====================================================

    const loadPayments = async () => {

        try {

            const response =
                await getPayments();

            setPayments(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Failed to load payments:",
                error
            );

            showSnackbar(
                error.response?.data?.message ||
                    "Failed to load payments.",
                "error"
            );

        }

    };


    // =====================================================
    // LOAD RESERVATIONS
    // =====================================================

    const loadReservations = async () => {

        try {

            const response =
                await getReservations();

            setReservations(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Failed to load reservations:",
                error
            );

        }

    };


    // =====================================================
    // FILTER PAYMENTS
    // =====================================================

    const filteredPayments = useMemo(() => {

        return payments.filter(
            (payment) => {

                // =============================================
                // RESERVATION FILTER
                // =============================================

                const reservationMatches =

                    selectedReservationId === ""

                    ||

                    payment.reservationId ===
                        Number(
                            selectedReservationId
                        );


                // =============================================
                // PAYMENT METHOD FILTER
                // =============================================

                const methodMatches =

                    selectedPaymentMethod === ""

                    ||

                    payment.paymentMethod ===
                        selectedPaymentMethod;


                // =============================================
                // PAYMENT STATUS FILTER
                // =============================================

                const statusMatches =

                    selectedPaymentStatus === ""

                    ||

                    payment.paymentStatus ===
                        selectedPaymentStatus;


                // =============================================
                // ALL FILTERS
                // =============================================

                return (
                    reservationMatches &&
                    methodMatches &&
                    statusMatches
                );

            }
        );

    }, [
        payments,
        selectedReservationId,
        selectedPaymentMethod,
        selectedPaymentStatus
    ]);


    // =====================================================
    // RESERVATION FILTER
    // =====================================================

    const handleReservationChange = (value) => {

        setSelectedReservationId(value);

    };


    // =====================================================
    // PAYMENT METHOD FILTER
    // =====================================================

    const handlePaymentMethodChange = (value) => {

        setSelectedPaymentMethod(value);

    };


    // =====================================================
    // PAYMENT STATUS FILTER
    // =====================================================

    const handlePaymentStatusChange = (value) => {

        setSelectedPaymentStatus(value);

    };


    // =====================================================
    // CLEAR FILTERS
    // =====================================================

    const handleClearFilters = () => {

        setSelectedReservationId("");

        setSelectedPaymentMethod("");

        setSelectedPaymentStatus("");

    };


    // =====================================================
    // ADD PAYMENT
    // =====================================================

    const handleAddPayment = () => {

        setSelectedPayment(null);

        setDialogOpen(true);

    };


    // =====================================================
    // EDIT PAYMENT
    // =====================================================

    const handleEditPayment = (
        payment
    ) => {

        setSelectedPayment(
            payment
        );

        setDialogOpen(true);

    };


    // =====================================================
    // SAVE PAYMENT
    //
    // ADD  -> POST
    // EDIT -> PUT
    // =====================================================

    const handleSavePayment = async (
        paymentData
    ) => {

        try {

            // =================================================
            // EDIT
            // =================================================

            if (
                selectedPayment !== null &&
                selectedPayment.paymentId
            ) {

                await updatePayment(
                    selectedPayment.paymentId,
                    paymentData
                );

                showSnackbar(
                    "Payment updated successfully.",
                    "success"
                );

            }

            // =================================================
            // ADD
            // =================================================

            else {

                await createPayment(
                    paymentData
                );

                showSnackbar(
                    "Payment created successfully.",
                    "success"
                );

            }


            // =================================================
            // CLOSE DIALOG
            // =================================================

            setDialogOpen(false);

            setSelectedPayment(null);


            // =================================================
            // REFRESH TABLE
            // =================================================

            await loadPayments();

        }
        catch (error) {

            console.error(
                "Failed to save payment:",
                error
            );


            const backendMessage =
                error.response?.data?.message;


            showSnackbar(
                backendMessage ||
                    "Failed to save payment.",
                "error"
            );

        }

    };


    // =====================================================
    // CLOSE ADD / EDIT DIALOG
    // =====================================================

    const handleCloseDialog = () => {

        setDialogOpen(false);

        setSelectedPayment(null);

    };


    // =====================================================
    // DELETE PAYMENT
    // OPEN CONFIRMATION
    // =====================================================

    const handleDeletePayment = (
        payment
    ) => {

        setPaymentToDelete(
            payment
        );

        setDeleteDialogOpen(
            true
        );

    };


    // =====================================================
    // CONFIRM DELETE
    // =====================================================

    const handleConfirmDeletePayment =
        async () => {

            if (!paymentToDelete) {

                return;

            }

            try {

                await deletePayment(
                    paymentToDelete.paymentId
                );


                setDeleteDialogOpen(false);

                setPaymentToDelete(null);


                await loadPayments();


                showSnackbar(
                    "Payment deleted successfully.",
                    "success"
                );

            }
            catch (error) {

                console.error(
                    "Failed to delete payment:",
                    error
                );


                const backendMessage =
                    error.response?.data?.message;


                showSnackbar(
                    backendMessage ||
                        "Failed to delete payment.",
                    "error"
                );

            }

        };


    // =====================================================
    // CANCEL DELETE
    // =====================================================

    const handleCancelDelete = () => {

        setDeleteDialogOpen(false);

        setPaymentToDelete(null);

    };


    // =====================================================
    // SHOW SNACKBAR
    // =====================================================

    const showSnackbar = (
        message,
        severity
    ) => {

        setSnackbarMessage(
            message
        );

        setSnackbarSeverity(
            severity
        );

        setSnackbarOpen(
            true
        );

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

        <Box
            sx={{
                p: 3
            }}
        >

            {/* =================================================
                HEADER
            ================================================= */}

            <Box

                sx={{

                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems:
                        "center",

                    mb: 3

                }}

            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        Payments
                    </Typography>


                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                    >
                        Manage hotel payments
                    </Typography>

                </Box>


                <Button

                    variant="contained"

                    startIcon={
                        <AddIcon />
                    }

                    onClick={
                        handleAddPayment
                    }

                >

                    Add Payment

                </Button>

            </Box>


            {/* =================================================
                PAYMENT FILTERS
            ================================================= */}

            <PaymentFilter

                reservations={
                    reservations
                }

                reservationId={
                    selectedReservationId
                }

                paymentMethod={
                    selectedPaymentMethod
                }

                paymentStatus={
                    selectedPaymentStatus
                }

                onReservationChange={
                    handleReservationChange
                }

                onPaymentMethodChange={
                    handlePaymentMethodChange
                }

                onPaymentStatusChange={
                    handlePaymentStatusChange
                }

                onClear={
                    handleClearFilters
                }

            />


            {/* =================================================
                PAYMENT TABLE
            ================================================= */}

            <PaymentTable

                rows={
                    filteredPayments
                }

                onEdit={
                    handleEditPayment
                }

                onDelete={
                    handleDeletePayment
                }

            />


            {/* =================================================
                ADD / EDIT PAYMENT DIALOG
            ================================================= */}

            <PaymentDialog

                open={
                    dialogOpen
                }

                title={
                    selectedPayment
                        ? "Edit Payment"
                        : "Add Payment"
                }

                payment={
                    selectedPayment
                }

                onClose={
                    handleCloseDialog
                }

                onSave={
                    handleSavePayment
                }

            />


            {/* =================================================
                DELETE CONFIRMATION DIALOG
            ================================================= */}

            <Dialog

                open={
                    deleteDialogOpen
                }

                onClose={
                    handleCancelDelete
                }

            >

                <DialogTitle>

                    Delete Payment

                </DialogTitle>


                <DialogContent>

                    <DialogContentText>

                        Are you sure you want to delete payment{" "}

                        <strong>

                            #
                            {
                                paymentToDelete
                                    ?.paymentId
                            }

                        </strong>

                        ?

                    </DialogContentText>

                </DialogContent>


                <DialogActions>

                    <Button

                        onClick={
                            handleCancelDelete
                        }

                        variant="outlined"

                    >

                        Cancel

                    </Button>


                    <Button

                        onClick={
                            handleConfirmDeletePayment
                        }

                        color="error"

                        variant="contained"

                    >

                        Delete

                    </Button>

                </DialogActions>

            </Dialog>


            {/* =================================================
                SNACKBAR
            ================================================= */}

            <Snackbar

                open={
                    snackbarOpen
                }

                autoHideDuration={
                    4000
                }

                onClose={
                    handleCloseSnackbar
                }

                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}

            >

                <Alert

                    onClose={
                        handleCloseSnackbar
                    }

                    severity={
                        snackbarSeverity
                    }

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


export default PaymentList;