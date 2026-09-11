import { useEffect, useState } from "react";

import {
    Box,
    TextField,
    MenuItem
} from "@mui/material";

import { getHotels } from "../../services/hotelService";


const roomTypes = [
    "SINGLE",
    "DOUBLE",
    "TWIN",
    "TRIPLE",
    "FAMILY",
    "DELUXE",
    "SUITE"
];


const roomStatuses = [
    "AVAILABLE",
    "OCCUPIED",
    "RESERVED",
    "MAINTENANCE"
];


function RoomForm({
    room,
    onSave
}) {

    const [formData, setFormData] = useState({

        roomNumber: "",
        roomType: "",
        floor: "",
        price: "",
        status: "",
        hotelId: ""

    });


    const [hotels, setHotels] = useState([]);


    // =====================================================
    // LOAD HOTELS
    // =====================================================

    useEffect(() => {

        loadHotels();

    }, []);


    const loadHotels = async () => {

        try {

            const response = await getHotels();

            setHotels(response.data);

        }
        catch (error) {

            console.error(
                "Failed to load hotels:",
                error
            );

        }

    };


    // =====================================================
    // LOAD ROOM FOR EDIT
    // =====================================================

    useEffect(() => {

        if (room) {

            setFormData({

                roomNumber: room.roomNumber || "",

                roomType: room.roomType || "",

                floor: room.floor ?? "",

                price: room.price ?? "",

                status: room.status || "",

                hotelId: room.hotel?.hotelId || ""

            });

        }
        else {

            setFormData({

                roomNumber: "",
                roomType: "",
                floor: "",
                price: "",
                status: "",
                hotelId: ""

            });

        }

    }, [room]);


    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData(
            previous => ({

                ...previous,

                [name]: value

            })
        );

    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();


        const data = {

            roomNumber: formData.roomNumber,

            roomType: formData.roomType,

            floor:
                formData.floor === ""
                    ? null
                    : Number(formData.floor),

            price:
                formData.price === ""
                    ? null
                    : Number(formData.price),

            status: formData.status,

            hotelId:
                formData.hotelId === ""
                    ? null
                    : Number(formData.hotelId)

        };


        onSave(data);

    };


    return (

        <Box
            component="form"
            id="room-form"
            onSubmit={handleSubmit}
            sx={{
                pt: 1
            }}
        >

            {/* =================================================
                ROOM NUMBER
            ================================================= */}

            <TextField

                fullWidth

                required

                margin="normal"

                label="Room Number"

                name="roomNumber"

                value={formData.roomNumber}

                onChange={handleChange}

            />


            {/* =================================================
                ROOM TYPE
            ================================================= */}

            <TextField

                fullWidth

                required

                select

                margin="normal"

                label="Room Type"

                name="roomType"

                value={formData.roomType}

                onChange={handleChange}

            >

                {roomTypes.map((type) => (

                    <MenuItem
                        key={type}
                        value={type}
                    >

                        {type}

                    </MenuItem>

                ))}

            </TextField>


            {/* =================================================
                FLOOR
            ================================================= */}

            <TextField

                fullWidth

                required

                type="number"

                margin="normal"

                label="Floor"

                name="floor"

                value={formData.floor}

                onChange={handleChange}

                inputProps={{
                    min: 0
                }}

            />


            {/* =================================================
                PRICE
            ================================================= */}

            <TextField

                fullWidth

                required

                type="number"

                margin="normal"

                label="Price"

                name="price"

                value={formData.price}

                onChange={handleChange}

                inputProps={{
                    min: 0,
                    step: "0.01"
                }}

            />


            {/* =================================================
                STATUS
            ================================================= */}

            <TextField

                fullWidth

                required

                select

                margin="normal"

                label="Status"

                name="status"

                value={formData.status}

                onChange={handleChange}

            >

                {roomStatuses.map((status) => (

                    <MenuItem
                        key={status}
                        value={status}
                    >

                        {status}

                    </MenuItem>

                ))}

            </TextField>


            {/* =================================================
                HOTEL
            ================================================= */}

            <TextField

                fullWidth

                required

                select

                margin="normal"

                label="Hotel"

                name="hotelId"

                value={formData.hotelId}

                onChange={handleChange}

            >

                {hotels.map((hotel) => (

                    <MenuItem
                        key={hotel.hotelId}
                        value={hotel.hotelId}
                    >

                        {hotel.name}

                    </MenuItem>

                ))}

            </TextField>

        </Box>

    );

}


export default RoomForm;