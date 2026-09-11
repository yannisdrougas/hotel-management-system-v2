import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from "@mui/material";


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


function RoomFilter({
    hotels,
    hotelId,
    roomType,
    status,
    onHotelChange,
    onRoomTypeChange,
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
                HOTEL
            ================================================= */}

            <FormControl
                sx={{
                    minWidth: 220
                }}
            >

                <InputLabel>
                    Hotel
                </InputLabel>

                <Select
                    value={hotelId}
                    label="Hotel"
                    onChange={(event) =>
                        onHotelChange(event.target.value)
                    }
                >

                    <MenuItem value="">
                        All Hotels
                    </MenuItem>

                    {hotels.map((hotel) => (

                        <MenuItem
                            key={hotel.hotelId}
                            value={hotel.hotelId}
                        >

                            {hotel.name}

                        </MenuItem>

                    ))}

                </Select>

            </FormControl>


            {/* =================================================
                ROOM TYPE
            ================================================= */}

            <FormControl
                sx={{
                    minWidth: 180
                }}
            >

                <InputLabel>
                    Room Type
                </InputLabel>

                <Select
                    value={roomType}
                    label="Room Type"
                    onChange={(event) =>
                        onRoomTypeChange(event.target.value)
                    }
                >

                    <MenuItem value="">
                        All Types
                    </MenuItem>

                    {roomTypes.map((type) => (

                        <MenuItem
                            key={type}
                            value={type}
                        >

                            {type}

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
                        onStatusChange(event.target.value)
                    }
                >

                    <MenuItem value="">
                        All Statuses
                    </MenuItem>

                    {roomStatuses.map((item) => (

                        <MenuItem
                            key={item}
                            value={item}
                        >

                            {item}

                        </MenuItem>

                    ))}

                </Select>

            </FormControl>


            {/* =================================================
                CLEAR
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


export default RoomFilter;