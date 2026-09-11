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
HotelTable
============================================================

Props:

rows
onEdit
onDelete

============================================================
*/

function HotelTable({
    rows,
    onEdit,
    onDelete
}) {

    const columns = [

        // =====================================================
        // ID
        // =====================================================

        {
            field: "hotelId",
            headerName: "ID",
            width: 80
        },


        // =====================================================
        // HOTEL NAME
        // =====================================================

        {
            field: "name",
            headerName: "Hotel Name",
            flex: 1,
            minWidth: 180
        },


        // =====================================================
        // PHONE
        // =====================================================

        {
            field: "phone",
            headerName: "Phone",
            flex: 1,
            minWidth: 150
        },


        // =====================================================
        // STARS
        // =====================================================

        {
            field: "stars",
            headerName: "Stars",
            width:180,
            minWidth: 180,

            renderCell: (params) => {

                return (

                    <Box>

                        {"⭐".repeat(params.value || 0)}

                    </Box>

                );

            }

        },


        // =====================================================
        // ADDRESS
        // =====================================================

        {
            field: "address",
            headerName: "Address",
            flex: 1.5,
            width: 350,
            minWidth: 350,

            sortable: false,

            renderCell: (params) => {

                const address = params.row.address;

                if (!address) {

                    return "No Address";

                }

                return (

                    <Box>

                        {address.street}{" "}

                        {address.streetNumber},{" "}

                        {address.city},{" "}

                        {address.country}

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

                    <Tooltip title="Edit Hotel">

                        <IconButton
                            color="primary"
                            onClick={() =>
                                onEdit(params.row)
                            }
                        >

                            <EditIcon />

                        </IconButton>

                    </Tooltip>


                    <Tooltip title="Delete Hotel">

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
                        row.hotelId
                    }

                    disableRowSelectionOnClick

                    disableAutosize

                    columnHeaderHeight={56}

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
                        // HEADER AREA
                        // =================================================

                        "& .MuiDataGrid-columnHeaders": {

                            backgroundColor: "#1976d2 !important",

                            color: "#ffffff",

                            borderBottom:
                                "2px solid #1565c0"

                        },


                        // =================================================
                        // EACH HEADER CELL
                        // =================================================

                        "& .MuiDataGrid-columnHeader": {

                            backgroundColor:
                                "#1976d2 !important",

                            color:
                                "#ffffff !important"

                        },


                        // =================================================
                        // HEADER TEXT
                        // =================================================

                        "& .MuiDataGrid-columnHeaderTitle": {

                            color:
                                "#ffffff !important",

                            fontWeight:
                                "bold",

                            fontSize:
                                "15px"

                        },


                        // =================================================
                        // HEADER ICONS
                        // =================================================

                        "& .MuiDataGrid-columnHeader .MuiSvgIcon-root": {

                            color:
                                "#ffffff"

                        },


                        // =================================================
                        // CELLS
                        // =================================================

                        "& .MuiDataGrid-cell": {

                            fontSize:
                                "14px"

                        },


                        // =================================================
                        // ROW HOVER
                        // =================================================

                        "& .MuiDataGrid-row:hover": {

                            backgroundColor:
                                "#f5f5f5"

                        },


                        // =================================================
                        // FOOTER
                        // =================================================

                        "& .MuiDataGrid-footerContainer": {

                            borderTop:
                                "1px solid #ddd"

                        }

                    }}

                />

            </Box>

        </Paper>

    );

}


export default HotelTable;