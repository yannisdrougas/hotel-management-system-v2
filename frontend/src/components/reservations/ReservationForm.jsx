import { useEffect, useMemo, useState } from "react";

import {
    Box,
    TextField,
    MenuItem,
    Button
} from "@mui/material";

import {
    getCustomers
} from "../../services/customerService";

import {
    getEmployees
} from "../../services/employeeService";

import {
    getRooms
} from "../../services/roomService";

import {
    getHotels
} from "../../services/hotelService";


// =====================================================
// ReservationForm
//
// Props:
// onSave
// initialData
// =====================================================

function ReservationForm({
    onSave,
    initialData = null
}) {

    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        customerId: "",

        hotelId: "",

        roomId: "",

        employeeId: "",

        checkIn: "",

        checkOut: "",

        guests: "",

        status: "PENDING"

    });


    // =====================================================
    // DATA FOR DROPDOWNS
    // =====================================================

    const [customers, setCustomers] = useState([]);

    const [hotels, setHotels] = useState([]);

    const [rooms, setRooms] = useState([]);

    const [employees, setEmployees] = useState([]);


    // =====================================================
    // LOAD DROPDOWN DATA
    // =====================================================

    useEffect(() => {

        console.log("RESERVATION FORM MOUNTED");

        loadCustomers();

        loadHotels();

        loadRooms();

        loadEmployees();

    }, []);


    // =====================================================
    // INITIAL DATA
    // =====================================================

    useEffect(() => {

        if (initialData) {

            const initialRoomId =
                initialData.roomId !== null &&
                initialData.roomId !== undefined
                    ? Number(initialData.roomId)
                    : "";


            let initialHotelId = "";


            // =================================================
            // FIRST TRY:
            // Hotel information directly from reservation data
            // =================================================

            if (
                initialData.hotelId !== null &&
                initialData.hotelId !== undefined
            ) {

                initialHotelId =
                    Number(initialData.hotelId);

            }


            // =================================================
            // SECOND TRY:
            // Find hotel through selected room
            // =================================================

            if (
                !initialHotelId &&
                initialRoomId &&
                rooms.length > 0
            ) {

                const selectedRoom = rooms.find(

                    room =>
                        Number(room.roomId) ===
                        Number(initialRoomId)

                );


                if (
                    selectedRoom?.hotel?.hotelId !== null &&
                    selectedRoom?.hotel?.hotelId !== undefined
                ) {

                    initialHotelId =
                        Number(
                            selectedRoom.hotel.hotelId
                        );

                }

            }


            setFormData({

                customerId:
                    initialData.customerId !== null &&
                    initialData.customerId !== undefined
                        ? Number(initialData.customerId)
                        : "",

                hotelId:
                    initialHotelId,

                roomId:
                    initialRoomId,

                employeeId:
                    initialData.employeeId !== null &&
                    initialData.employeeId !== undefined
                        ? Number(initialData.employeeId)
                        : "",

                checkIn:
                    initialData.checkIn ?? "",

                checkOut:
                    initialData.checkOut ?? "",

                guests:
                    initialData.guests !== null &&
                    initialData.guests !== undefined
                        ? Number(initialData.guests)
                        : "",

                status:
                    initialData.status ?? "PENDING"

            });

        }
        else {

            setFormData({

                customerId: "",

                hotelId: "",

                roomId: "",

                employeeId: "",

                checkIn: "",

                checkOut: "",

                guests: "",

                status: "PENDING"

            });

        }

    }, [initialData, rooms]);


    // =====================================================
    // LOAD CUSTOMERS
    // =====================================================

    const loadCustomers = async () => {

        try {

            const response =
                await getCustomers();

            console.log(
                "CUSTOMERS:",
                response.data
            );

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

            setCustomers([]);

        }

    };


    // =====================================================
    // LOAD HOTELS
    // =====================================================

    const loadHotels = async () => {

        try {

            const response =
                await getHotels();

            console.log(
                "HOTELS:",
                response.data
            );

            setHotels(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Failed to load hotels:",
                error
            );

            setHotels([]);

        }

    };


    // =====================================================
    // LOAD ROOMS
    // =====================================================

    const loadRooms = async () => {

        try {

            const response =
                await getRooms();

            console.log(
                "ROOMS:",
                response.data
            );

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

            setRooms([]);

        }

    };


    // =====================================================
    // LOAD EMPLOYEES
    // =====================================================

    const loadEmployees = async () => {

        console.log(
            "LOAD EMPLOYEES STARTED"
        );

        try {

            const response =
                await getEmployees();

            console.log(
                "EMPLOYEES:",
                response.data
            );

            console.log(
                "EMPLOYEES COUNT:",
                response.data?.length
            );

            if (
                Array.isArray(
                    response.data
                )
            ) {

                setEmployees(
                    response.data
                );

            }
            else {

                setEmployees([]);

                console.error(
                    "Employees response is not an array:",
                    response.data
                );

            }

        }
        catch (error) {

            console.error(
                "Failed to load employees:",
                error
            );

            setEmployees([]);

        }

    };


    // =====================================================
    // FILTER ROOMS BY HOTEL
    // =====================================================

    const filteredRooms =
        useMemo(() => {

            if (!formData.hotelId) {

                return [];

            }

            return rooms.filter(

                room =>
                    Number(
                        room?.hotel?.hotelId
                    ) ===
                    Number(
                        formData.hotelId
                    )

            );

        }, [
            rooms,
            formData.hotelId
        ]);


    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        // =================================================
        // HOTEL CHANGE
        //
        // When hotel changes,
        // clear selected room.
        // =================================================

        if (name === "hotelId") {

            setFormData(
                previous => ({

                    ...previous,

                    hotelId: value,

                    roomId: ""

                })
            );

            return;

        }


        setFormData(
            previous => ({

                ...previous,

                [name]: value

            })
        );

    };


    // =====================================================
    // HANDLE SUBMIT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();


        const reservation = {

            customerId:
                Number(
                    formData.customerId
                ),

            roomId:
                Number(
                    formData.roomId
                ),

            employeeId:
                Number(
                    formData.employeeId
                ),

            checkIn:
                formData.checkIn,

            checkOut:
                formData.checkOut,

            guests:
                Number(
                    formData.guests
                ),

            status:
                formData.status

        };


        console.log(
            "RESERVATION TO SAVE:",
            reservation
        );


        onSave(reservation);

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <Box

            component="form"

            id="reservation-form"

            onSubmit={handleSubmit}

            sx={{

                display: "flex",

                flexDirection: "column",

                gap: 2,

                mt: 1

            }}

        >


            {/* =================================================
                CUSTOMER
            ================================================= */}

            <TextField

                select

                fullWidth

                label="Customer"

                name="customerId"

                value={
                    formData.customerId
                }

                onChange={
                    handleChange
                }

                required

            >

                <MenuItem value="">

                    Select Customer

                </MenuItem>


                {customers.map(
                    customer => (

                        <MenuItem

                            key={
                                customer.customerId
                            }

                            value={
                                Number(
                                    customer.customerId
                                )
                            }

                        >

                            {
                                customer.firstName
                            }{" "}

                            {
                                customer.lastName
                            }

                        </MenuItem>

                    )
                )}

            </TextField>


            {/* =================================================
                HOTEL
            ================================================= */}

            <TextField

                select

                fullWidth

                label="Hotel"

                name="hotelId"

                value={
                    formData.hotelId
                }

                onChange={
                    handleChange
                }

                required

            >

                <MenuItem value="">

                    Select Hotel

                </MenuItem>


                {hotels.map(
                    hotel => (

                        <MenuItem

                            key={
                                hotel.hotelId
                            }

                            value={
                                Number(
                                    hotel.hotelId
                                )
                            }

                        >

                            {
                                hotel.name
                            }

                            {
                                hotel.stars
                                    ? ` (${hotel.stars}★)`
                                    : ""
                            }

                        </MenuItem>

                    )
                )}

            </TextField>


            {/* =================================================
                ROOM
            ================================================= */}

            <TextField

                select

                fullWidth

                label="Room"

                name="roomId"

                value={
                    formData.roomId
                }

                onChange={
                    handleChange
                }

                required

                disabled={
                    !formData.hotelId
                }

            >

                <MenuItem value="">

                    {
                        formData.hotelId
                            ? "Select Room"
                            : "Select Hotel First"
                    }

                </MenuItem>


                {filteredRooms.map(
                    room => (

                        <MenuItem

                            key={
                                room.roomId
                            }

                            value={
                                Number(
                                    room.roomId
                                )
                            }

                        >

                            Room {
                                room.roomNumber
                            }{" "}

                            ({
                                room.roomType
                            })

                        </MenuItem>

                    )
                )}

            </TextField>


            {/* =================================================
                EMPLOYEE
            ================================================= */}

            <TextField

                select

                fullWidth

                label="Employee"

                name="employeeId"

                value={
                    formData.employeeId
                }

                onChange={
                    handleChange
                }

                required

                SelectProps={{

                    MenuProps: {

                        PaperProps: {

                            style: {

                                maxHeight: 300

                            }

                        },

                        MenuListProps: {

                            dense: false

                        }

                    }

                }}

            >

                <MenuItem value="">

                    Select Employee

                </MenuItem>


                {employees.map(
                    employee => (

                        <MenuItem

                            key={
                                employee.employeeId
                            }

                            value={
                                Number(
                                    employee.employeeId
                                )
                            }

                        >

                            {
                                employee.firstName
                            }{" "}

                            {
                                employee.lastName
                            }

                        </MenuItem>

                    )
                )}

            </TextField>


            {/* =================================================
                CHECK-IN
            ================================================= */}

            <TextField

                fullWidth

                type="date"

                label="Check-in"

                name="checkIn"

                value={
                    formData.checkIn
                }

                onChange={
                    handleChange
                }

                required

                slotProps={{

                    inputLabel: {

                        shrink: true

                    }

                }}

            />


            {/* =================================================
                CHECK-OUT
            ================================================= */}

            <TextField

                fullWidth

                type="date"

                label="Check-out"

                name="checkOut"

                value={
                    formData.checkOut
                }

                onChange={
                    handleChange
                }

                required

                slotProps={{

                    inputLabel: {

                        shrink: true

                    }

                }}

            />


            {/* =================================================
                GUESTS
            ================================================= */}

            <TextField

                fullWidth

                type="number"

                label="Guests"

                name="guests"

                value={
                    formData.guests
                }

                onChange={
                    handleChange
                }

                inputProps={{

                    min: 1

                }}

                required

            />


            {/* =================================================
                STATUS
            ================================================= */}

            <TextField

                select

                fullWidth

                label="Status"

                name="status"

                value={
                    formData.status
                }

                onChange={
                    handleChange
                }

                required

            >

                <MenuItem value="PENDING">

                    PENDING

                </MenuItem>

                <MenuItem value="CONFIRMED">

                    CONFIRMED

                </MenuItem>

                <MenuItem value="COMPLETED">

                    COMPLETED

                </MenuItem>

                <MenuItem value="CANCELLED">

                    CANCELLED

                </MenuItem>

            </TextField>


            {/* =================================================
                HIDDEN SAVE
            ================================================= */}

            <Button

                type="submit"

                variant="contained"

                sx={{

                    display: "none"

                }}

            >

                Save

            </Button>

        </Box>

    );

}


export default ReservationForm;