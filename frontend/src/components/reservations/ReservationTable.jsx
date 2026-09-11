import {
    DataGrid
} from "@mui/x-data-grid";

import {
    Box,
    IconButton,
    Tooltip,
    Paper
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// =====================================================
// ReservationTable
//
// Props:
// rows
// onEdit
// onDelete
// =====================================================

function ReservationTable({
    rows,
    onEdit,
    onDelete
}) {

    const columns = [

        // =====================================================
        // ID
        // =====================================================

        {
            field: "reservationId",
            headerName: "ID",
            width: 80
        },


        // =====================================================
        // CUSTOMER
        // =====================================================

        {
            field: "customer",
            headerName: "Customer",
            flex: 1.3,
            minWidth: 180,

            sortable: false,

            renderCell: (params) => {

                return (
                    <Box>

                        {params.row.customerFirstName}{" "}

                        {params.row.customerLastName}

                    </Box>
                );

            }

        },
		
		// =====================================================
		// HOTEL
		// =====================================================

{
    field: "hotelName",
    headerName: "Hotel",
    flex: 1.3,
    minWidth: 180,

    renderCell: (params) => {

        return (
            <Box>
                {params.row.hotelName || "-"}
            </Box>
        );

    }

},


        // =====================================================
        // ROOM
        // =====================================================

        {
            field: "room",
            headerName: "Room",
            flex: 1,
            minWidth: 130,

            sortable: false,

            renderCell: (params) => {

                return (
                    <Box>

                        {params.row.roomNumber}{" "}

                        {params.row.roomType
                            ? `(${params.row.roomType})`
                            : ""
                        }

                    </Box>
                );

            }

        },


        // =====================================================
        // EMPLOYEE
        // =====================================================

        {
            field: "employee",
            headerName: "Employee",
            flex: 1.3,
            minWidth: 180,

            sortable: false,

            renderCell: (params) => {

                return (
                    <Box>

                        {params.row.employeeFirstName}{" "}

                        {params.row.employeeLastName}

                    </Box>
                );

            }

        },


        // =====================================================
        // CHECK-IN
        // =====================================================

        {
            field: "checkIn",
            headerName: "Check-in",
            width: 130
        },


        // =====================================================
        // CHECK-OUT
        // =====================================================

        {
            field: "checkOut",
            headerName: "Check-out",
            width: 130
        },


        // =====================================================
        // GUESTS
        // =====================================================

        {
            field: "guests",
            headerName: "Guests",
            width: 100
        },


        // =====================================================
        // STATUS
        // =====================================================

        {
            field: "status",
            headerName: "Status",
            width: 140,

            renderCell: (params) => {

                return (
                    <Box
                        sx={{
                            fontWeight: "bold"
                        }}
                    >

                        {params.value}

                    </Box>
                );

            }

        },


        // =====================================================
        // ACTIONS
        // =====================================================

        {
            field: "actions",
            headerName: "Actions",
            width: 140,

            sortable: false,
            filterable: false,

            renderCell: (params) => (

                <Box>

                    <Tooltip title="Edit Reservation">

                        <IconButton
                            color="primary"
                            onClick={() =>
                                onEdit(params.row)
                            }
                        >

                            <EditIcon />

                        </IconButton>

                    </Tooltip>


                    <Tooltip title="Delete Reservation">

                        <IconButton
                            color="error"
                            onClick={() =>
                                onDelete(params.row)
                            }
                        >

                            <DeleteIcon />

                        </IconButton>

                    </Tooltip>

                </Box>

            )

        }

    ];


    return (

        <Paper
            elevation={3}
            sx={{
                width: "100%",
                p: 2,
                borderRadius: 3
            }}
        >

            <Box
                sx={{
                    height: 600,
                    width: "100%"
                }}
            >

                <DataGrid

                    rows={rows}

                    columns={columns}

                    getRowId={(row) =>
                        row.reservationId
                    }

                    disableRowSelectionOnClick

                    pageSizeOptions={[
                        5,
                        10,
                        20,
                        50
                    ]}

                    initialState={{

                        pagination: {

                            paginationModel: {

                                page: 0,
                                pageSize: 10

                            }

                        }

                    }}

                   sx={{

    border: 0,

    // =====================================================
    // TABLE HEADER
    // =====================================================

    "& .MuiDataGrid-columnHeaders": {

        backgroundColor: "#1976d2 !important",

        color: "#ffffff !important",

        minHeight: "56px !important",

        maxHeight: "56px !important",

        height: "56px !important"

    },


    // =====================================================
    // INDIVIDUAL HEADER CELLS
    // =====================================================

    "& .MuiDataGrid-columnHeader": {

        backgroundColor: "#1976d2 !important",

        color: "#ffffff !important"

    },


    // =====================================================
    // HEADER TITLE
    // =====================================================

    "& .MuiDataGrid-columnHeaderTitle": {

        color: "#ffffff !important",

        fontWeight: "bold",

        fontSize: "15px"

    },


    // =====================================================
    // HEADER ICONS
    // =====================================================

    "& .MuiDataGrid-iconButtonContainer": {

        color: "#ffffff !important"

    },


    "& .MuiDataGrid-sortIcon": {

        color: "#ffffff !important"

    },


    // =====================================================
    // CELLS
    // =====================================================

    "& .MuiDataGrid-cell": {

        fontSize: "14px"

    },


    // =====================================================
    // ROW HOVER
    // =====================================================

    "& .MuiDataGrid-row:hover": {

        backgroundColor: "#f5f5f5"

    },


    // =====================================================
    // FOOTER
    // =====================================================

    "& .MuiDataGrid-footerContainer": {

        borderTop: "1px solid #ddd"

    }

}}

                />

            </Box>

        </Paper>

    );

}

export default ReservationTable;