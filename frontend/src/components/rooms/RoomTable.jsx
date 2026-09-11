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
RoomTable

Props:

rows
onEdit
onDelete

============================================================
*/


function RoomTable({
    rows,
    onEdit,
    onDelete
}) {


    const columns = [

        // =====================================================
        // ID
        // =====================================================

        {
            field: "roomId",
            headerName: "ID",
            width: 80
        },


        // =====================================================
        // ROOM NUMBER
        // =====================================================

        {
            field: "roomNumber",
            headerName: "Room Number",
            flex: 1,
            minWidth: 130
        },


        // =====================================================
        // ROOM TYPE
        // =====================================================

        {
            field: "roomType",
            headerName: "Room Type",
            flex: 1,
            minWidth: 140
        },


        // =====================================================
        // FLOOR
        // =====================================================

        {
            field: "floor",
            headerName: "Floor",
            width: 100
        },


        // =====================================================
        // PRICE
        // =====================================================

        {
            field: "price",
            headerName: "Price",
            width: 120,

            renderCell: (params) => {

                if (params.value === null ||
                    params.value === undefined) {

                    return "—";

                }

                return `€ ${Number(params.value).toFixed(2)}`;

            }

        },


        // =====================================================
        // STATUS
        // =====================================================

        {
            field: "status",
            headerName: "Status",
            flex: 1,
            minWidth: 140,

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
        // HOTEL
        // =====================================================

        {
            field: "hotel",
            headerName: "Hotel",
            flex: 1.5,
            minWidth: 220,

            sortable: false,

            renderCell: (params) => {

                const hotel = params.row.hotel;

                if (!hotel) {

                    return "No Hotel";

                }

                return (

                    <Box>

                        <Box
                            sx={{
                                fontWeight: "bold"
                            }}
                        >
                            {hotel.name}
                        </Box>

                        <Box
                            sx={{
                                fontSize: "12px",
                                color: "text.secondary"
                            }}
                        >
                            {hotel.stars
                                ? "⭐".repeat(hotel.stars)
                                : "No rating"
                            }
                        </Box>

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

                    <Tooltip title="Edit Room">

                        <IconButton
                            color="primary"
                            onClick={() =>
                                onEdit(params.row)
                            }
                        >

                            <EditIcon />

                        </IconButton>

                    </Tooltip>


                    <Tooltip title="Delete Room">

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

                    disableAutosize

                    rows={rows}

                    columns={columns}

                    getRowId={(row) =>
                        row.roomId
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

    // =================================================
    // TABLE HEADER CONTAINER
    // =================================================

    "& .MuiDataGrid-columnHeaders": {

        backgroundColor: "#1976d2 !important",

        minHeight: "56px !important",
        maxHeight: "56px !important",
        height: "56px !important"

    },


    // =================================================
    // INDIVIDUAL COLUMN HEADERS
    // =================================================

    "& .MuiDataGrid-columnHeader": {

        backgroundColor: "#1976d2 !important",

        color: "#ffffff !important"

    },


    // =================================================
    // HEADER TITLE
    // =================================================

    "& .MuiDataGrid-columnHeaderTitle": {

        fontWeight: "bold",

        fontSize: "15px",

        color: "#ffffff !important"

    },


    // =================================================
    // HEADER ICONS
    // =================================================

    "& .MuiDataGrid-columnHeader .MuiIconButton-root": {

        color: "#ffffff !important"

    },


    "& .MuiDataGrid-sortIcon": {

        color: "#ffffff !important"

    },


    // =================================================
    // MENU ICON
    // =================================================

    "& .MuiDataGrid-menuIconButton": {

        color: "#ffffff !important"

    },


    // =================================================
    // CELLS
    // =================================================

    "& .MuiDataGrid-cell": {

        fontSize: "14px"

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


export default RoomTable;