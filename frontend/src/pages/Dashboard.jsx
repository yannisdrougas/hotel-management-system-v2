import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import {
    getCustomerCount,
    getHotelCount,
    getRoomCount,
    getEmployeeCount,
    getReservationCount,
    getPaymentCount,
    getAvailableRoomCount,
    getOccupiedRoomCount,
    getPendingReservationCount,
    getConfirmedReservationCount,
    getTotalRevenue,
    getReservedRoomCount,
    getMaintenanceRoomCount,
    getCompletedReservationCount,
    getCancelledReservationCount
} from "../services/dashboardService";


import PeopleIcon from "@mui/icons-material/People";
import HotelIcon from "@mui/icons-material/Hotel";
import BedIcon from "@mui/icons-material/Bed";
import BadgeIcon from "@mui/icons-material/Badge";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PaymentIcon from "@mui/icons-material/Payment";

import { PieChart } from "@mui/x-charts/PieChart";


function Dashboard() {

    // =====================================================
    // STATES
    // =====================================================

    const [customerCount, setCustomerCount] =
        useState(0);

    const [hotelCount, setHotelCount] =
        useState(0);

    const [roomCount, setRoomCount] =
        useState(0);

    const [employeeCount, setEmployeeCount] =
        useState(0);

    const [reservationCount, setReservationCount] =
        useState(0);

    const [paymentCount, setPaymentCount] =
        useState(0);

    const [availableRoomCount, setAvailableRoomCount] =
    useState(0);

const [occupiedRoomCount, setOccupiedRoomCount] =
    useState(0);

const [
    pendingReservationCount,
    setPendingReservationCount
] = useState(0);

const [
    confirmedReservationCount,
    setConfirmedReservationCount
] = useState(0);

const [totalRevenue, setTotalRevenue] =
    useState(0);

const [reservedRoomCount, setReservedRoomCount] =
    useState(0);

const [maintenanceRoomCount, setMaintenanceRoomCount] =
    useState(0);

const [
    completedReservationCount,
    setCompletedReservationCount
] = useState(0);

const [
    cancelledReservationCount,
    setCancelledReservationCount
] = useState(0);


    // =====================================================
    // LOAD STATISTICS
    // =====================================================

    useEffect(() => {

        loadStatistics();

    }, []);


    const loadStatistics = async () => {

        try {

            const [
                customers,
                hotels,
                rooms,
                employees,
                reservations,
                payments
            ] = await Promise.all([

                getCustomerCount(),

                getHotelCount(),

                getRoomCount(),

                getEmployeeCount(),

                getReservationCount(),

                getPaymentCount()

            ]);


            setCustomerCount(
                customers
            );

            setHotelCount(
                hotels
            );

            setRoomCount(
                rooms
            );

            setEmployeeCount(
                employees
            );

            setReservationCount(
                reservations
            );

            setPaymentCount(
                payments
            );

// =================================================
// AVAILABLE ROOMS
// =================================================

try {

    const count =
        await getAvailableRoomCount();

    setAvailableRoomCount(count);

}
catch (error) {

    console.error(
        "Failed to load available rooms count:",
        error
    );

}


// =================================================
// OCCUPIED ROOMS
// =================================================

try {

    const count =
        await getOccupiedRoomCount();

    setOccupiedRoomCount(count);

}
catch (error) {

    console.error(
        "Failed to load occupied rooms count:",
        error
    );

}


// =================================================
// PENDING RESERVATIONS
// =================================================

try {

    const count =
        await getPendingReservationCount();

    setPendingReservationCount(count);

}
catch (error) {

    console.error(
        "Failed to load pending reservations count:",
        error
    );

}


// =================================================
// CONFIRMED RESERVATIONS
// =================================================

try {

    const count =
        await getConfirmedReservationCount();

    setConfirmedReservationCount(count);

}
catch (error) {

    console.error(
        "Failed to load confirmed reservations count:",
        error
    );

}


// =================================================
// TOTAL REVENUE
// =================================================

try {

    const revenue =
        await getTotalRevenue();

    setTotalRevenue(revenue);

}
catch (error) {

    console.error(
        "Failed to load total revenue:",
        error
    );

}

// =================================================
// RESERVED ROOMS
// =================================================

try {

    const count =
        await getReservedRoomCount();

    setReservedRoomCount(count);

}
catch (error) {

    console.error(
        "Failed to load reserved rooms count:",
        error
    );

}


// =================================================
// MAINTENANCE ROOMS
// =================================================

try {

    const count =
        await getMaintenanceRoomCount();

    setMaintenanceRoomCount(count);

}
catch (error) {

    console.error(
        "Failed to load maintenance rooms count:",
        error
    );

}


// =================================================
// COMPLETED RESERVATIONS
// =================================================

try {

    const count =
        await getCompletedReservationCount();

    setCompletedReservationCount(count);

}
catch (error) {

    console.error(
        "Failed to load completed reservations count:",
        error
    );

}


// =================================================
// CANCELLED RESERVATIONS
// =================================================

try {

    const count =
        await getCancelledReservationCount();

    setCancelledReservationCount(count);

}
catch (error) {

    console.error(
        "Failed to load cancelled reservations count:",
        error
    );

}

        }
        catch (error) {

            console.error(
                "Failed to load dashboard statistics:",
                error
            );

        }

    };


    // =====================================================
    // DASHBOARD CARDS
    // =====================================================

    const dashboardCards = [

        {
            title: "Customers",
            value: customerCount,
            icon: (
                <PeopleIcon
                    sx={{
                        fontSize: 50
                    }}
                />
            ),
            color: "#1976d2"
        },

        {
            title: "Hotels",
            value: hotelCount,
            icon: (
                <HotelIcon
                    sx={{
                        fontSize: 50
                    }}
                />
            ),
            color: "#2e7d32"
        },

        {
            title: "Rooms",
            value: roomCount,
            icon: (
                <BedIcon
                    sx={{
                        fontSize: 50
                    }}
                />
            ),
            color: "#ef6c00"
        },

        {
            title: "Employees",
            value: employeeCount,
            icon: (
                <BadgeIcon
                    sx={{
                        fontSize: 50
                    }}
                />
            ),
            color: "#6a1b9a"
        },

        {
            title: "Reservations",
            value: reservationCount,
            icon: (
                <EventAvailableIcon
                    sx={{
                        fontSize: 50
                    }}
                />
            ),
            color: "#00838f"
        },

        {
            title: "Payments",
            value: paymentCount,
            icon: (
                <PaymentIcon
                    sx={{
                        fontSize: 50
                    }}
                />
            ),
            color: "#c62828"
        }

    ];


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
            >
                Dashboard
            </Typography>


            <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                    mb: 4
                }}
            >
                Welcome to Hotel Management System
            </Typography>


            <Grid
                container
                spacing={3}
            >

                {dashboardCards.map(
                    (card) => (

                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={card.title}
                        >

                            <Card
                                elevation={5}
                                sx={{

                                    borderLeft:
                                        `6px solid ${card.color}`,

                                    borderRadius: 3,

                                    transition:
                                        "0.3s",

                                    "&:hover": {

                                        transform:
                                            "translateY(-5px)",

                                        boxShadow: 8

                                    }

                                }}
                            >

                                <CardContent>

                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >

                                        <Box>

                                            <Typography
                                                variant="h6"
                                                color="text.secondary"
                                            >
                                                {card.title}
                                            </Typography>


                                            <Typography
                                                variant="h3"
                                                fontWeight="bold"
                                            >
                                                {card.value}
                                            </Typography>

                                        </Box>


                                        <Box
                                            sx={{
                                                color:
                                                    card.color
                                            }}
                                        >
                                            {card.icon}
                                        </Box>

                                    </Box>

                                </CardContent>

                            </Card>

                        </Grid>

                        

                    )
                )}

            </Grid>

{/* =============================================
    OPERATIONAL STATISTICS
================================================= */}

<Typography
    variant="h5"
    fontWeight="bold"
    sx={{
        mt: 5,
        mb: 2
    }}
>
    Operational Statistics
</Typography>


<Grid
    container
    spacing={3}
>

    {/* =================================================
        AVAILABLE ROOMS
    ================================================= */}

    <Grid
        item
        xs={12}
        sm={6}
        md={4}
    >

        <Card
            elevation={4}
            sx={{
                borderLeft: "6px solid #2e7d32",
                borderRadius: 3
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Available Rooms
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    {availableRoomCount}
                </Typography>

            </CardContent>

        </Card>

    </Grid>


    {/* =================================================
        OCCUPIED ROOMS
    ================================================= */}

    <Grid
        item
        xs={12}
        sm={6}
        md={4}
    >

        <Card
            elevation={4}
            sx={{
                borderLeft: "6px solid #d32f2f",
                borderRadius: 3
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Occupied Rooms
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    {occupiedRoomCount}
                </Typography>

            </CardContent>

        </Card>

    </Grid>

    {/* =================================================
    RESERVED ROOMS
================================================= */}

<Grid
    item
    xs={12}
    sm={6}
    md={4}
>

    <Card
        elevation={4}
        sx={{
            borderLeft: "6px solid #1565c0",
            borderRadius: 3
        }}
    >

        <CardContent>

            <Typography
                variant="h6"
                color="text.secondary"
            >
                Reserved Rooms
            </Typography>

            <Typography
                variant="h3"
                fontWeight="bold"
            >
                {reservedRoomCount}
            </Typography>

        </CardContent>

    </Card>

</Grid>


{/* =================================================
    MAINTENANCE ROOMS
================================================= */}

<Grid
    item
    xs={12}
    sm={6}
    md={4}
>

    <Card
        elevation={4}
        sx={{
            borderLeft: "6px solid #616161",
            borderRadius: 3
        }}
    >

        <CardContent>

            <Typography
                variant="h6"
                color="text.secondary"
            >
                Maintenance Rooms
            </Typography>

            <Typography
                variant="h3"
                fontWeight="bold"
            >
                {maintenanceRoomCount}
            </Typography>

        </CardContent>

    </Card>

</Grid>


    {/* =================================================
        PENDING RESERVATIONS
    ================================================= */}

    <Grid
        item
        xs={12}
        sm={6}
        md={4}
    >

        <Card
            elevation={4}
            sx={{
                borderLeft: "6px solid #ed6c02",
                borderRadius: 3
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Pending Reservations
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    {pendingReservationCount}
                </Typography>

            </CardContent>

        </Card>

    </Grid>


    {/* =================================================
        CONFIRMED RESERVATIONS
    ================================================= */}

    <Grid
        item
        xs={12}
        sm={6}
        md={4}
    >

        <Card
            elevation={4}
            sx={{
                borderLeft: "6px solid #0288d1",
                borderRadius: 3
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Confirmed Reservations
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    {confirmedReservationCount}
                </Typography>

            </CardContent>

        </Card>

    </Grid>

    {/* =================================================
    COMPLETED RESERVATIONS
================================================= */}

<Grid
    item
    xs={12}
    sm={6}
    md={4}
>

    <Card
        elevation={4}
        sx={{
            borderLeft: "6px solid #2e7d32",
            borderRadius: 3
        }}
    >

        <CardContent>

            <Typography
                variant="h6"
                color="text.secondary"
            >
                Completed Reservations
            </Typography>

            <Typography
                variant="h3"
                fontWeight="bold"
            >
                {completedReservationCount}
            </Typography>

        </CardContent>

    </Card>

</Grid>


{/* =================================================
    CANCELLED RESERVATIONS
================================================= */}

<Grid
    item
    xs={12}
    sm={6}
    md={4}
>

    <Card
        elevation={4}
        sx={{
            borderLeft: "6px solid #c62828",
            borderRadius: 3
        }}
    >

        <CardContent>

            <Typography
                variant="h6"
                color="text.secondary"
            >
                Cancelled Reservations
            </Typography>

            <Typography
                variant="h3"
                fontWeight="bold"
            >
                {cancelledReservationCount}
            </Typography>

        </CardContent>

    </Card>

</Grid>


    {/* =================================================
        TOTAL REVENUE
    ================================================= */}

    <Grid
        item
        xs={12}
        sm={6}
        md={4}
    >

        <Card
            elevation={4}
            sx={{
                borderLeft: "6px solid #6a1b9a",
                borderRadius: 3
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    color="text.secondary"
                >
                    Total Revenue
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight="bold"
                >
                    € {Number(totalRevenue).toFixed(2)}
                </Typography>

            </CardContent>

        </Card>

    </Grid>

</Grid>

{/* =================================================
    DASHBOARD CHARTS
================================================= */}

<Typography
    variant="h5"
    fontWeight="bold"
    sx={{
        mt: 5,
        mb: 2
    }}
>
    Dashboard Charts
</Typography>


<Grid
    container
    spacing={3}
>

    {/* =================================================
        RESERVATIONS BY STATUS
    ================================================= */}

    <Grid
        item
        xs={12}
        md={6}
    >

        <Card
            elevation={4}
            sx={{
                borderRadius: 3,
                p: 2,
                height: "100%"
            }}
        >

            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                    mb: 2
                }}
            >
                Reservations by Status
            </Typography>

            <Box
    sx={{
        width: "100%",
        overflow: "hidden"
    }}
>

            <PieChart
                series={[
                    {
                        data: [
                            {
                                id: 0,
                                value: pendingReservationCount,
                                label: "Pending"
                            },
                            {
                                id: 1,
                                value: confirmedReservationCount,
                                label: "Confirmed"
                            },
                            {
                                id: 2,
                                value: completedReservationCount,
                                label: "Completed"
                            },
                            {
                                id: 3,
                                value: cancelledReservationCount,
                                label: "Cancelled"
                            }
                        ],

                        innerRadius: 40,
                        outerRadius: 100,
                        paddingAngle: 3,
                        cornerRadius: 4
                    }
                ]}

                width={500}
                height={300}
            />

            </Box>

        </Card>

    </Grid>


    {/* =================================================
        ROOMS BY STATUS
    ================================================= */}

    <Grid
        item
        xs={12}
        md={6}
    >

        <Card
            elevation={4}
            sx={{
                borderRadius: 3,
                p: 2,
                height: "100%"
            }}
        >

            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                    mb: 2
                }}
            >
                Rooms by Status
            </Typography>

            <Box
             sx={{
                width: "100%",
                 overflow: "hidden"
             }}
            >

            <PieChart
                series={[
                    {
                        data: [
                            {
                                id: 0,
                                value: availableRoomCount,
                                label: "Available"
                            },
                            {
                                id: 1,
                                value: occupiedRoomCount,
                                label: "Occupied"
                            },
                            {
                                id: 2,
                                value: reservedRoomCount,
                                label: "Reserved"
                            },
                            {
                                id: 3,
                                value: maintenanceRoomCount,
                                label: "Maintenance"
                            }
                        ],

                        innerRadius: 40,
                        outerRadius: 100,
                        paddingAngle: 3,
                        cornerRadius: 4
                    }
                ]}

                width={500}
                height={300}
            />

            </Box>

        </Card>

    </Grid>

</Grid>

        </Box>

    );

}


export default Dashboard;