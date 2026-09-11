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


/*
============================================================
AddressTable
============================================================

Props:

rows
onEdit
onDelete

============================================================
*/

function AddressTable({

    rows,
    onEdit,
    onDelete

}) {

    const columns = [

        {
            field: "addressId",
            headerName: "ID",
            width: 80
        },

        {
            field: "country",
            headerName: "COUNTRY",
            flex: 1,
            minWidth: 150
        },

        {
            field: "city",
            headerName: "CITY",
            flex: 1,
            minWidth: 150
        },

        {
            field: "street",
            headerName: "STREET",
            flex: 1.2,
            minWidth: 180
        },

        {
            field: "streetNumber",
            headerName: "STREET NUMBER",
            flex: 0.8,
            minWidth: 130
        },

        {
            field: "actions",
            headerName: "ACTIONS",
            width: 140,
            sortable: false,
            filterable: false,

            renderCell: (params) => (

                <Box>

                    <Tooltip title="Edit Address">

                        <IconButton
                            color="primary"
                            onClick={() => onEdit(params.row)}
                        >

                            <EditIcon />

                        </IconButton>

                    </Tooltip>


                    <Tooltip title="Delete Address">

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

                    getRowId={(row) => row.addressId}

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

                        // =================================================
                        // COLUMN HEADERS
                        // =================================================

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

                        // =================================================
                        // CELLS
                        // =================================================

                        "& .MuiDataGrid-cell": {

                            fontSize: 14,
                            color: "#333333"

                        },

                        // =================================================
                        // ROW HOVER
                        // =================================================

                        "& .MuiDataGrid-row:hover": {

                            backgroundColor: "#f5f5f5"

                        },

                        // =================================================
                        // FOOTER
                        // =================================================

                        "& .MuiDataGrid-footerContainer": {

                            borderTop: "1px solid #ddd"

                        }

                    }}

                />

            </Box>

        </Paper>

    );

}

export default AddressTable;