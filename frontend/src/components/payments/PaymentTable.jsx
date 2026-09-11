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


function PaymentTable({
    rows,
    onEdit,
    onDelete
}) {

    const columns = [

        {
            field: "paymentId",
            headerName: "ID",
            width: 80
        },

        {
            field: "reservationId",
            headerName: "Reservation",
            width: 130
        },

        {
            field: "customer",
            headerName: "Customer",
            flex: 1.2,
            minWidth: 180,

            sortable: false,

            renderCell: (params) => (

                <Box>

                    {params.row.customerFirstName}{" "}
                    {params.row.customerLastName}

                </Box>

            )

        },

        {
            field: "room",
            headerName: "Room",
            flex: 1,
            minWidth: 140,

            sortable: false,

            renderCell: (params) => (

                <Box>

                    {params.row.roomNumber}{" "}

                    {params.row.roomType
                        ? `(${params.row.roomType})`
                        : ""
                    }

                </Box>

            )

        },

        {
            field: "paymentDate",
            headerName: "Payment Date",
            width: 140
        },

        {
            field: "amount",
            headerName: "Amount",
            width: 120,

            renderCell: (params) => {

                if (
                    params.value === null ||
                    params.value === undefined
                ) {

                    return "—";

                }

                return `€ ${Number(params.value).toFixed(2)}`;

            }

        },

        {
            field: "paymentMethod",
            headerName: "Method",
            flex: 1,
            minWidth: 160
        },

        {
            field: "paymentStatus",
            headerName: "Status",
            width: 130,

            renderCell: (params) => (

                <Box
                    sx={{
                        fontWeight: "bold"
                    }}
                >

                    {params.value}

                </Box>

            )

        },

        {
            field: "actions",
            headerName: "Actions",
            width: 140,

            sortable: false,
            filterable: false,

            renderCell: (params) => (

                <Box>

                    <Tooltip title="Edit Payment">

                        <IconButton
                            color="primary"
                            onClick={() =>
                                onEdit(params.row)
                            }
                        >

                            <EditIcon />

                        </IconButton>

                    </Tooltip>


                    <Tooltip title="Delete Payment">

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
                        row.paymentId
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

                        "& .MuiDataGrid-columnHeaders": {

                            backgroundColor:
                                "#1976d2 !important",

                            color:
                                "#ffffff !important"

                        },

                        "& .MuiDataGrid-columnHeader": {

                            backgroundColor:
                                "#1976d2 !important",

                            color:
                                "#ffffff !important"

                        },

                        "& .MuiDataGrid-columnHeaderTitle": {

                            color:
                                "#ffffff !important",

                            fontWeight:
                                "bold",

                            fontSize:
                                "15px"

                        },

                        "& .MuiDataGrid-columnHeader .MuiSvgIcon-root": {

                            color:
                                "#ffffff"

                        },

                        "& .MuiDataGrid-cell": {

                            fontSize:
                                "14px"

                        },

                        "& .MuiDataGrid-row:hover": {

                            backgroundColor:
                                "#f5f5f5"

                        },

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


export default PaymentTable;