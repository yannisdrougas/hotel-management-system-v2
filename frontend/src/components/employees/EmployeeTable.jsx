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


function EmployeeTable({
    rows,
    onEdit,
    onDelete
}) {

    const columns = [

    {
        field: "employeeId",
        headerName: "ID",
        flex: 0.45,
        minWidth: 60
    },

    {
        field: "firstName",
        headerName: "First Name",
        flex: 0.8,
        minWidth: 100
    },

    {
        field: "lastName",
        headerName: "Last Name",
        flex: 0.8,
        minWidth: 100
    },

    {
        field: "position",
        headerName: "Position",
        flex: 0.9,
        minWidth: 110
    },

    {
        field: "salary",
        headerName: "Salary",
        flex: 0.7,
        minWidth: 90,

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
        field: "hireDate",
        headerName: "Hire Date",
        flex: 0.8,
        minWidth: 105
    },

    {
        field: "phone",
        headerName: "Phone",
        flex: 0.9,
        minWidth: 115
    },

    {
        field: "address",
        headerName: "Address",
        flex: 1.5,
        minWidth: 170,
        sortable: false,

        renderCell: (params) => {

            const {
                street,
                streetNumber,
                city,
                country
            } = params.row;

            if (
                !street &&
                !streetNumber &&
                !city &&
                !country
            ) {
                return "No Address";
            }

            return (
                <Box
                    sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100%"
                    }}
                    title={
                        `${street ?? ""} ${streetNumber ?? ""}, ` +
                        `${city ?? ""}, ${country ?? ""}`
                    }
                >
                    {street} {streetNumber}, {city}, {country}
                </Box>
            );
        }
    },

    {
        field: "actions",
        headerName: "Actions",
        flex: 0.7,
        minWidth: 100,
        sortable: false,
        filterable: false,

        renderCell: (params) => (

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center"
                }}
            >

                <Tooltip title="Edit Employee">

                    <IconButton
                        size="small"
                        color="primary"
                        onClick={() =>
                            onEdit(params.row)
                        }
                    >
                        <EditIcon />
                    </IconButton>

                </Tooltip>

                <Tooltip title="Delete Employee">

                    <IconButton
                        size="small"
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
                        row.employeeId
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


export default EmployeeTable;