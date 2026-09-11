import { useState } from "react";

import {
    DataGrid
} from "@mui/x-data-grid";

import {
    Box,
    IconButton,
    Tooltip,
    Paper,
    Typography,
    Popover,
    ButtonBase
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


/*
============================================================
Customer Address Cell
============================================================

Displays the customer's address with a dropdown arrow.

============================================================
*/

function AddressCell({ address }) {

    const [anchorEl, setAnchorEl] = useState(null);


    const handleOpen = (event) => {

        setAnchorEl(event.currentTarget);

    };


    const handleClose = () => {

        setAnchorEl(null);

    };


    const open = Boolean(anchorEl);


    // -----------------------------------------------------
    // No address
    // -----------------------------------------------------

    if (!address) {

        return (

            <Typography
                color="text.secondary"
                fontSize={14}
            >
                No address
            </Typography>

        );

    }


    // -----------------------------------------------------
    // Address text
    // -----------------------------------------------------

    const addressText =
        `${address.country} - ${address.city} - ${address.street} ${address.streetNumber}`;


    return (

        <>

            <ButtonBase
                onClick={handleOpen}
                sx={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "space-between",
                    textAlign: "left",
                    borderRadius: 1,
                    px: 1
                }}
            >

                <Typography
                    noWrap
                    fontSize={14}
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                    }}
                >

                    {addressText}

                </Typography>


                <ExpandMoreIcon
                    color="action"
                    sx={{
                        flexShrink: 0,
                        ml: 1
                    }}
                />

            </ButtonBase>


            <Popover

                open={open}

                anchorEl={anchorEl}

                onClose={handleClose}

                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}

                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}

            >

                <Box
                    sx={{
                        p: 2,
                        minWidth: 280
                    }}
                >

                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ mb: 1 }}
                    >
                        Address
                    </Typography>


                    <Typography variant="body2">
                        <strong>Country:</strong>{" "}
                        {address.country}
                    </Typography>


                    <Typography variant="body2">
                        <strong>City:</strong>{" "}
                        {address.city}
                    </Typography>


                    <Typography variant="body2">
                        <strong>Street:</strong>{" "}
                        {address.street}
                    </Typography>


                    <Typography variant="body2">
                        <strong>Number:</strong>{" "}
                        {address.streetNumber}
                    </Typography>

                </Box>

            </Popover>

        </>

    );

}


/*
============================================================
CustomerTable
============================================================

Props:

rows
addresses
onEdit
onDelete

============================================================
*/

function CustomerTable({

    rows,
    addresses,
    onEdit,
    onDelete

}) {


    // =====================================================
    // COLUMNS
    // =====================================================

    const columns = [

        {
            field: "customerId",
            headerName: "ID",
            width: 80
        },


        {
            field: "firstName",
            headerName: "First Name",
            flex: 1,
            minWidth: 150
        },


        {
            field: "lastName",
            headerName: "Last Name",
            flex: 1,
            minWidth: 150
        },


        {
            field: "phone",
            headerName: "Phone",
            flex: 1,
            minWidth: 150
        },


        {
            field: "email",
            headerName: "Email",
            flex: 1.3,
            minWidth: 220
        },


        // =================================================
        // ADDRESS
        // =================================================

       {
        field: "address",
        headerName: "Address",
        flex: 1.5,
        minWidth: 300,

        renderCell: (params) => {

            const address = params.row.address;

            if (!address) {
                return "No address";
            }

            return `${address.country} - ${address.city} - ${address.street} ${address.streetNumber}`;

        }

    },

        // =================================================
        // ACTIONS
        // =================================================

        {
            field: "actions",
            headerName: "Actions",
            width: 140,
            sortable: false,
            filterable: false,

            renderCell: (params) => (

                <Box>

                    <Tooltip title="Edit Customer">

                        <IconButton
                            color="primary"
                            onClick={() => onEdit(params.row)}
                        >

                            <EditIcon />

                        </IconButton>

                    </Tooltip>


                    <Tooltip title="Delete Customer">

                        <IconButton
                            color="error"
                            onClick={() => onDelete(params.row)}
                        >

                            <DeleteIcon />

                        </IconButton>

                    </Tooltip>

                </Box>

            )

        }

    ];


    // =====================================================
    // RENDER
    // =====================================================

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

                    disableAutosize

                    rows={rows}

                    columns={columns}

                    getRowId={(row) => row.customerId}

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
    // COLUMN HEADERS
    // =====================================================

    "& .MuiDataGrid-columnHeaders": {

        backgroundColor: "#1976d2",
        color: "#ffffff",
        minHeight: "56px !important",
        maxHeight: "56px !important"

    },

    "& .MuiDataGrid-columnHeader": {

        backgroundColor: "#1976d2",
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold"

    },

    "& .MuiDataGrid-columnHeaderTitle": {

        fontWeight: "bold",
        color: "#ffffff"

    },

    // =====================================================
    // CELLS
    // =====================================================

    "& .MuiDataGrid-cell": {

        fontSize: 14,
        color: "#333333"

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


export default CustomerTable;