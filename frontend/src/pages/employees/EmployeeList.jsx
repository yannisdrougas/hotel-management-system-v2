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

import EmployeeTable
    from "../../components/employees/EmployeeTable";

import EmployeeDialog
    from "../../components/employees/EmployeeDialog";

import EmployeeFilter
    from "../../components/employees/EmployeeFilter";

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../../services/employeeService";


function EmployeeList() {

    // =====================================================
    // EMPLOYEES
    // =====================================================

    const [employees, setEmployees] =
        useState([]);


    // =====================================================
    // FILTER STATES
    // =====================================================

    const [lastNameFilter, setLastNameFilter] =
        useState("");

    const [positionFilter, setPositionFilter] =
        useState("");


    // =====================================================
    // ADD / EDIT DIALOG STATES
    // =====================================================

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedEmployee, setSelectedEmployee] =
        useState(null);


    // =====================================================
    // DELETE DIALOG STATES
    // =====================================================

    const [deleteDialogOpen, setDeleteDialogOpen] =
        useState(false);

    const [employeeToDelete, setEmployeeToDelete] =
        useState(null);


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
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadEmployees();

    }, []);


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

            showSnackbar(
                error.response?.data?.message ||
                    "Failed to load employees.",
                "error"
            );

        }

    };


    // =====================================================
    // FILTER EMPLOYEES
    // =====================================================

    const filteredEmployees = useMemo(() => {

        return employees.filter((employee) => {

            const lastNameMatches =

                lastNameFilter.trim() === ""

                ||

                employee.lastName
                    ?.toLowerCase()
                    .includes(
                        lastNameFilter
                            .trim()
                            .toLowerCase()
                    );


            const positionMatches =

                positionFilter === ""

                ||

                employee.position ===
                    positionFilter;


            return (
                lastNameMatches &&
                positionMatches
            );

        });

    }, [
        employees,
        lastNameFilter,
        positionFilter
    ]);


    // =====================================================
    // LAST NAME FILTER
    // =====================================================

    const handleLastNameChange = (value) => {

        setLastNameFilter(value);

    };


    // =====================================================
    // POSITION FILTER
    // =====================================================

    const handlePositionChange = (value) => {

        setPositionFilter(value);

    };


    // =====================================================
    // CLEAR FILTERS
    // =====================================================

    const handleClearFilters = () => {

        setLastNameFilter("");

        setPositionFilter("");

    };


    // =====================================================
    // ADD EMPLOYEE
    // =====================================================

    const handleAddEmployee = () => {

        setSelectedEmployee(null);

        setDialogOpen(true);

    };


    // =====================================================
    // EDIT EMPLOYEE
    // =====================================================

    const handleEditEmployee = (employee) => {

        setSelectedEmployee(employee);

        setDialogOpen(true);

    };


    // =====================================================
    // SAVE EMPLOYEE
    // ADD -> POST
    // EDIT -> PUT
    // =====================================================

    const handleSaveEmployee = async (
        employeeData
    ) => {

        try {

            if (
                selectedEmployee !== null &&
                selectedEmployee.employeeId
            ) {

                await updateEmployee(
                    selectedEmployee.employeeId,
                    employeeData
                );

                showSnackbar(
                    "Employee updated successfully.",
                    "success"
                );

            }
            else {

                await createEmployee(
                    employeeData
                );

                showSnackbar(
                    "Employee created successfully.",
                    "success"
                );

            }


            setDialogOpen(false);

            setSelectedEmployee(null);

            await loadEmployees();

        }
        catch (error) {

            console.error(
                "Failed to save employee:",
                error
            );

            const backendMessage =
                error.response?.data?.message;

            showSnackbar(
                backendMessage ||
                    "Failed to save employee.",
                "error"
            );

        }

    };


    // =====================================================
    // CLOSE ADD / EDIT DIALOG
    // =====================================================

    const handleCloseDialog = () => {

        setDialogOpen(false);

        setSelectedEmployee(null);

    };


    // =====================================================
    // DELETE EMPLOYEE
    // OPEN CONFIRMATION
    // =====================================================

    const handleDeleteEmployee = (employee) => {

        setEmployeeToDelete(employee);

        setDeleteDialogOpen(true);

    };


    // =====================================================
    // CONFIRM DELETE
    // =====================================================

    const handleConfirmDeleteEmployee =
        async () => {

            if (!employeeToDelete) {

                return;

            }

            try {

                await deleteEmployee(
                    employeeToDelete.employeeId
                );

                setDeleteDialogOpen(false);

                setEmployeeToDelete(null);

                await loadEmployees();

                showSnackbar(
                    "Employee deleted successfully.",
                    "success"
                );

            }
            catch (error) {

                console.error(
                    "Failed to delete employee:",
                    error
                );

                const backendMessage =
                    error.response?.data?.message;

                showSnackbar(
                    backendMessage ||
                        "Failed to delete employee.",
                    "error"
                );

            }

        };


    // =====================================================
    // CANCEL DELETE
    // =====================================================

    const handleCancelDelete = () => {

        setDeleteDialogOpen(false);

        setEmployeeToDelete(null);

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
                        Employees
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                    >
                        Manage hotel employees
                    </Typography>

                </Box>


                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddEmployee}
                >
                    Add Employee
                </Button>

            </Box>


            {/* =================================================
                EMPLOYEE FILTERS
            ================================================= */}

            <EmployeeFilter

                lastName={lastNameFilter}

                position={positionFilter}

                onLastNameChange={
                    handleLastNameChange
                }

                onPositionChange={
                    handlePositionChange
                }

                onClear={
                    handleClearFilters
                }

            />


            {/* =================================================
                EMPLOYEE TABLE
            ================================================= */}

            <EmployeeTable

                rows={filteredEmployees}

                onEdit={
                    handleEditEmployee
                }

                onDelete={
                    handleDeleteEmployee
                }

            />


            {/* =================================================
                ADD / EDIT EMPLOYEE DIALOG
            ================================================= */}

            <EmployeeDialog

                open={dialogOpen}

                title={
                    selectedEmployee
                        ? "Edit Employee"
                        : "Add Employee"
                }

                employee={selectedEmployee}

                onClose={handleCloseDialog}

                onSave={handleSaveEmployee}

            />


            {/* =================================================
                DELETE CONFIRMATION DIALOG
            ================================================= */}

            <Dialog
                open={deleteDialogOpen}
                onClose={handleCancelDelete}
            >

                <DialogTitle>
                    Delete Employee
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>

                        Are you sure you want to delete employee{" "}

                        <strong>
                            {employeeToDelete?.firstName}{" "}
                            {employeeToDelete?.lastName}
                        </strong>

                        ?

                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={handleCancelDelete}
                        variant="outlined"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={
                            handleConfirmDeleteEmployee
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


export default EmployeeList;