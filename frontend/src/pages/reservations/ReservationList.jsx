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

import ReservationTable
    from "../../components/reservations/ReservationTable";

import ReservationDialog
    from "../../components/reservations/ReservationDialog";

import ReservationFilter
    from "../../components/reservations/ReservationFilter";

import {
    getReservations,
    createReservation,
    updateReservation,
    deleteReservation
} from "../../services/reservationService";

import {
    getCustomers
} from "../../services/customerService";

import {
    getRooms
} from "../../services/roomService";

import {
    getEmployees
} from "../../services/employeeService";


function ReservationList() {

    // =====================================================
    // RESERVATIONS
    // =====================================================

    const [reservations, setReservations] =
        useState([]);


    // =====================================================
    // DATA FOR FILTER DROPDOWNS
    // =====================================================

    const [customers, setCustomers] =
        useState([]);

    const [rooms, setRooms] =
        useState([]);

    const [employees, setEmployees] =
        useState([]);


    // =====================================================
    // FILTER STATES
    // =====================================================

    const [selectedCustomerId, setSelectedCustomerId] =
        useState("");

    const [selectedRoomId, setSelectedRoomId] =
        useState("");

    const [selectedEmployeeId, setSelectedEmployeeId] =
        useState("");

    const [selectedStatus, setSelectedStatus] =
        useState("");


    // =====================================================
    // SNACKBAR STATES
    // =====================================================

    const [snackbarOpen, setSnackbarOpen] =
        useState(false);

    const [snackbarMessage, setSnackbarMessage] =
        useState("");

    const [snackbarSeverity, setSnackbarSeverity] =
        useState("success");


    // =====================================================
    // ADD / EDIT DIALOG STATES
    // =====================================================

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [
        selectedReservation,
        setSelectedReservation
    ] = useState(null);


    // =====================================================
    // DELETE DIALOG STATES
    // =====================================================

    const [
        deleteDialogOpen,
        setDeleteDialogOpen
    ] = useState(false);

    const [
        reservationToDelete,
        setReservationToDelete
    ] = useState(null);


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadReservations();

        loadCustomers();

        loadRooms();

        loadEmployees();

    }, []);


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

            showSnackbar(
                "Failed to load reservations.",
                "error"
            );

        }

    };


    // =====================================================
    // LOAD CUSTOMERS
    // =====================================================

    const loadCustomers = async () => {

        try {

            const response =
                await getCustomers();

            setCustomers(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Failed to load customers:",
                error
            );

        }

    };


    // =====================================================
    // LOAD ROOMS
    // =====================================================

    const loadRooms = async () => {

        try {

            const response =
                await getRooms();

            setRooms(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Failed to load rooms:",
                error
            );

        }

    };


    // =====================================================
    // LOAD EMPLOYEES
    // =====================================================

    const loadEmployees = async () => {

        try {

            const response =
                await getEmployees();

            setEmployees(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Failed to load employees:",
                error
            );

        }

    };


    // =====================================================
    // FILTER RESERVATIONS
    // =====================================================

    const filteredReservations = useMemo(() => {

        return reservations.filter(
            (reservation) => {

                // =============================================
                // CUSTOMER
                // =============================================

                const customerMatches =

                    selectedCustomerId === ""

                    ||

                    reservation.customerId ===
                        Number(selectedCustomerId);


                // =============================================
                // ROOM
                // =============================================

                const roomMatches =

                    selectedRoomId === ""

                    ||

                    reservation.roomId ===
                        Number(selectedRoomId);


                // =============================================
                // EMPLOYEE
                // =============================================

                const employeeMatches =

                    selectedEmployeeId === ""

                    ||

                    reservation.employeeId ===
                        Number(selectedEmployeeId);


                // =============================================
                // STATUS
                // =============================================

                const statusMatches =

                    selectedStatus === ""

                    ||

                    reservation.status ===
                        selectedStatus;


                // =============================================
                // ALL FILTERS
                // =============================================

                return (
                    customerMatches &&
                    roomMatches &&
                    employeeMatches &&
                    statusMatches
                );

            }
        );

    }, [
        reservations,
        selectedCustomerId,
        selectedRoomId,
        selectedEmployeeId,
        selectedStatus
    ]);


    // =====================================================
    // CUSTOMER FILTER
    // =====================================================

    const handleCustomerChange = (value) => {

        setSelectedCustomerId(value);

    };


    // =====================================================
    // ROOM FILTER
    // =====================================================

    const handleRoomChange = (value) => {

        setSelectedRoomId(value);

    };


    // =====================================================
    // EMPLOYEE FILTER
    // =====================================================

    const handleEmployeeChange = (value) => {

        setSelectedEmployeeId(value);

    };


    // =====================================================
    // STATUS FILTER
    // =====================================================

    const handleStatusChange = (value) => {

        setSelectedStatus(value);

    };


    // =====================================================
    // CLEAR FILTERS
    // =====================================================

    const handleClearFilters = () => {

        setSelectedCustomerId("");

        setSelectedRoomId("");

        setSelectedEmployeeId("");

        setSelectedStatus("");

    };


    // =====================================================
    // ADD RESERVATION
    // =====================================================

    const handleAddReservation = () => {

        setSelectedReservation(null);

        setDialogOpen(true);

    };


    // =====================================================
    // EDIT RESERVATION
    // =====================================================

    const handleEditReservation = (
        reservation
    ) => {

        setSelectedReservation(
            reservation
        );

        setDialogOpen(true);

    };


    // =====================================================
    // SAVE RESERVATION
    //
    // ADD  -> POST
    // EDIT -> PUT
    // =====================================================

    const handleSaveReservation = async (
        reservationData
    ) => {

        try {

            // =================================================
            // EDIT
            // =================================================

            if (
                selectedReservation !== null &&
                selectedReservation.reservationId
            ) {

                await updateReservation(
                    selectedReservation.reservationId,
                    reservationData
                );

                showSnackbar(
                    "Reservation updated successfully.",
                    "success"
                );

            }

            // =================================================
            // ADD
            // =================================================

            else {

                await createReservation(
                    reservationData
                );

                showSnackbar(
                    "Reservation created successfully.",
                    "success"
                );

            }


            // =================================================
            // CLOSE DIALOG
            // =================================================

            setDialogOpen(false);

            setSelectedReservation(null);


            // =================================================
            // REFRESH TABLE
            // =================================================

            await loadReservations();

        }
        catch (error) {

            console.error(
                "Failed to save reservation:",
                error
            );


            const backendMessage =
                error.response?.data?.message;


            showSnackbar(
                backendMessage ||
                    "Failed to save reservation.",
                "error"
            );

        }

    };


    // =====================================================
    // CLOSE ADD / EDIT DIALOG
    // =====================================================

    const handleCloseDialog = () => {

        setDialogOpen(false);

        setSelectedReservation(null);

    };


    // =====================================================
    // DELETE RESERVATION
    // OPEN CONFIRMATION
    // =====================================================

    const handleDeleteReservation = (
        reservation
    ) => {

        setReservationToDelete(
            reservation
        );

        setDeleteDialogOpen(
            true
        );

    };


    // =====================================================
    // CONFIRM DELETE
    // =====================================================

    const handleConfirmDeleteReservation =
        async () => {

            if (!reservationToDelete) {

                return;

            }

            try {

                await deleteReservation(
                    reservationToDelete.reservationId
                );


                setDeleteDialogOpen(false);

                setReservationToDelete(null);


                await loadReservations();


                showSnackbar(
                    "Reservation deleted successfully.",
                    "success"
                );

            }
            catch (error) {

                console.error(
                    "Failed to delete reservation:",
                    error
                );


                const backendMessage =
                    error.response?.data?.message;


                showSnackbar(
                    backendMessage ||
                        "Failed to delete reservation.",
                    "error"
                );

            }

        };


    // =====================================================
    // CANCEL DELETE
    // =====================================================

    const handleCancelDelete = () => {

        setDeleteDialogOpen(false);

        setReservationToDelete(null);

    };


    // =====================================================
    // SHOW SNACKBAR
    // =====================================================

    const showSnackbar = (
        message,
        severity
    ) => {

        setSnackbarMessage(message);

        setSnackbarSeverity(severity);

        setSnackbarOpen(true);

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
                        Reservations
                    </Typography>


                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                    >
                        Manage hotel reservations
                    </Typography>

                </Box>


                <Button

                    variant="contained"

                    startIcon={
                        <AddIcon />
                    }

                    onClick={
                        handleAddReservation
                    }

                >

                    Add Reservation

                </Button>

            </Box>


            {/* =================================================
                FILTERS
            ================================================= */}

            <ReservationFilter

                customers={
                    customers
                }

                rooms={
                    rooms
                }

                employees={
                    employees
                }


                customerId={
                    selectedCustomerId
                }

                roomId={
                    selectedRoomId
                }

                employeeId={
                    selectedEmployeeId
                }

                status={
                    selectedStatus
                }


                onCustomerChange={
                    handleCustomerChange
                }

                onRoomChange={
                    handleRoomChange
                }

                onEmployeeChange={
                    handleEmployeeChange
                }

                onStatusChange={
                    handleStatusChange
                }


                onClear={
                    handleClearFilters
                }

            />


            {/* =================================================
                RESERVATION TABLE
            ================================================= */}

            <ReservationTable

                rows={
                    filteredReservations
                }

                onEdit={
                    handleEditReservation
                }

                onDelete={
                    handleDeleteReservation
                }

            />


            {/* =================================================
                ADD / EDIT DIALOG
            ================================================= */}

            <ReservationDialog

                open={
                    dialogOpen
                }

                title={
                    selectedReservation
                        ? "Edit Reservation"
                        : "Add Reservation"
                }

                onClose={
                    handleCloseDialog
                }

                onSave={
                    handleSaveReservation
                }

                initialData={
                    selectedReservation
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

                    Delete Reservation

                </DialogTitle>


                <DialogContent>

                    <DialogContentText>

                        Are you sure you want to delete reservation{" "}

                        <strong>

                            #
                            {
                                reservationToDelete
                                    ?.reservationId
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
                            handleConfirmDeleteReservation
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

                    vertical:
                        "bottom",

                    horizontal:
                        "right"

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


export default ReservationList;