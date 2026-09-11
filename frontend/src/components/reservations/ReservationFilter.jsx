import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from "@mui/material";


const reservationStatuses = [
    "PENDING",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED"
];


function ReservationFilter({

    customers,
    rooms,
    employees,

    customerId,
    roomId,
    employeeId,
    status,

    onCustomerChange,
    onRoomChange,
    onEmployeeChange,
    onStatusChange,

    onClear

}) {

    return (

        <Box
            sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                mb: 3,
                flexWrap: "wrap"
            }}
        >

            {/* =================================================
                CUSTOMER
            ================================================= */}

            <FormControl
                sx={{
                    minWidth: 220
                }}
            >

                <InputLabel>
                    Customer
                </InputLabel>

                <Select

                    value={customerId}

                    label="Customer"

                    onChange={(event) =>
                        onCustomerChange(
                            event.target.value
                        )
                    }

                >

                    <MenuItem value="">
                        All Customers
                    </MenuItem>


                    {customers.map((customer) => (

                        <MenuItem

                            key={customer.customerId}

                            value={customer.customerId}

                        >

                            {customer.firstName}{" "}
                            {customer.lastName}

                        </MenuItem>

                    ))}

                </Select>

            </FormControl>


            {/* =================================================
                ROOM
            ================================================= */}

            <FormControl
                sx={{
                    minWidth: 200
                }}
            >

                <InputLabel>
                    Room
                </InputLabel>

                <Select

                    value={roomId}

                    label="Room"

                    onChange={(event) =>
                        onRoomChange(
                            event.target.value
                        )
                    }

                >

                    <MenuItem value="">
                        All Rooms
                    </MenuItem>


                    {rooms.map((room) => (

                        <MenuItem

                            key={room.roomId}

                            value={room.roomId}

                        >

                            Room {room.roomNumber}{" "}
                            ({room.roomType})

                        </MenuItem>

                    ))}

                </Select>

            </FormControl>


            {/* =================================================
                EMPLOYEE
            ================================================= */}

            <FormControl
                sx={{
                    minWidth: 220
                }}
            >

                <InputLabel>
                    Employee
                </InputLabel>

                <Select

                    value={employeeId}

                    label="Employee"

                    onChange={(event) =>
                        onEmployeeChange(
                            event.target.value
                        )
                    }

                >

                    <MenuItem value="">
                        All Employees
                    </MenuItem>


                    {employees.map((employee) => (

                        <MenuItem

                            key={employee.employeeId}

                            value={employee.employeeId}

                        >

                            {employee.firstName}{" "}
                            {employee.lastName}

                        </MenuItem>

                    ))}

                </Select>

            </FormControl>


            {/* =================================================
                STATUS
            ================================================= */}

            <FormControl
                sx={{
                    minWidth: 180
                }}
            >

                <InputLabel>
                    Status
                </InputLabel>

                <Select

                    value={status}

                    label="Status"

                    onChange={(event) =>
                        onStatusChange(
                            event.target.value
                        )
                    }

                >

                    <MenuItem value="">
                        All Statuses
                    </MenuItem>


                    {reservationStatuses.map(
                        (reservationStatus) => (

                            <MenuItem

                                key={reservationStatus}

                                value={reservationStatus}

                            >

                                {reservationStatus}

                            </MenuItem>

                        )
                    )}

                </Select>

            </FormControl>


            {/* =================================================
                CLEAR FILTERS
            ================================================= */}

            <Button

                variant="outlined"

                color="secondary"

                onClick={onClear}

            >

                Clear Filters

            </Button>

        </Box>

    );

}


export default ReservationFilter;