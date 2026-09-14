import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Stack,
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BuildIcon from "@mui/icons-material/Build";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PaidIcon from "@mui/icons-material/Paid";

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


            setCustomerCount(customers);

            setHotelCount(hotels);

            setRoomCount(rooms);

            setEmployeeCount(employees);

            setReservationCount(reservations);

            setPaymentCount(payments);


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

        }
        catch (error) {

            console.error(
                "Failed to load dashboard statistics:",
                error
            );

        }

    };


    // =====================================================
    // MAIN DASHBOARD CARDS
    // =====================================================

    const dashboardCards = [

        {
            title: "Customers",
            value: customerCount,
            icon: <PeopleIcon />,
            color: "#1976d2",
            background: "#e3f2fd"
        },

        {
            title: "Hotels",
            value: hotelCount,
            icon: <HotelIcon />,
            color: "#2e7d32",
            background: "#e8f5e9"
        },

        {
            title: "Rooms",
            value: roomCount,
            icon: <BedIcon />,
            color: "#ef6c00",
            background: "#fff3e0"
        },

        {
            title: "Employees",
            value: employeeCount,
            icon: <BadgeIcon />,
            color: "#6a1b9a",
            background: "#f3e5f5"
        },

        {
            title: "Reservations",
            value: reservationCount,
            icon: <EventAvailableIcon />,
            color: "#00838f",
            background: "#e0f7fa"
        },

        {
            title: "Payments",
            value: paymentCount,
            icon: <PaymentIcon />,
            color: "#c62828",
            background: "#ffebee"
        }

    ];


    // =====================================================
    // ROOM STATUS CARDS
    // =====================================================

    const roomStatistics = [

        {
            title: "Available",
            value: availableRoomCount,
            color: "#2e7d32",
            background: "#e8f5e9",
            icon: <CheckCircleIcon />
        },

        {
            title: "Reserved",
            value: reservedRoomCount,
            color: "#ed6c02",
            background: "#fff3e0",
            icon: <ScheduleIcon />
        },

        {
            title: "Occupied",
            value: occupiedRoomCount,
            color: "#d32f2f",
            background: "#ffebee",
            icon: <MeetingRoomIcon />
        },

        {
            title: "Maintenance",
            value: maintenanceRoomCount,
            color: "#616161",
            background: "#eeeeee",
            icon: <BuildIcon />
        }

    ];


    // =====================================================
    // RESERVATION STATUS CARDS
    // =====================================================

    const reservationStatistics = [

        {
            title: "Pending",
            value: pendingReservationCount,
            color: "#ed6c02",
            background: "#fff3e0",
            icon: <ScheduleIcon />
        },

        {
            title: "Confirmed",
            value: confirmedReservationCount,
            color: "#2e7d32",
            background: "#e8f5e9",
            icon: <CheckCircleIcon />
        },

        {
            title: "Completed",
            value: completedReservationCount,
            color: "#0288d1",
            background: "#e1f5fe",
            icon: <EventAvailableIcon />
        },

        {
            title: "Cancelled",
            value: cancelledReservationCount,
            color: "#c62828",
            background: "#ffebee",
            icon: <CancelIcon />
        }

    ];


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <Box>

            {/* =================================================
                HEADER
            ================================================= */}

            <Box
                sx={{
                    mb: 4
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                >
                    Hotel Management Dashboard
                </Typography>


                <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                        mt: 0.5
                    }}
                >
                    Overview of hotel operations and statistics
                </Typography>

            </Box>


            {/* =================================================
                MAIN SUMMARY CARDS
            ================================================= */}

            <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                    mb: 2
                }}
            >
                System Overview
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
                                elevation={3}
                                sx={{
                                    height: "100%",
                                    borderRadius: 3,
                                    borderTop:
                                        `4px solid ${card.color}`,

                                    transition:
                                        "transform 0.2s ease, box-shadow 0.2s ease",

                                    "&:hover": {
                                        transform:
                                            "translateY(-4px)",
                                        boxShadow: 6
                                    }
                                }}
                            >

                                <CardContent>

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between"
                                        }}
                                    >

                                        <Box>

                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                fontWeight={500}
                                            >
                                                {card.title}
                                            </Typography>


                                            <Typography
                                                variant="h3"
                                                fontWeight="bold"
                                                sx={{
                                                    mt: 0.5
                                                }}
                                            >
                                                {card.value}
                                            </Typography>

                                        </Box>


                                        <Avatar
                                            sx={{
                                                width: 58,
                                                height: 58,
                                                color: card.color,
                                                backgroundColor:
                                                    card.background,

                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 32
                                                }
                                            }}
                                        >
                                            {card.icon}
                                        </Avatar>

                                    </Box>

                                </CardContent>

                            </Card>

                        </Grid>

                    )
                )}

            </Grid>


            {/* =================================================
                TOTAL REVENUE
            ================================================= */}

            <Card
                elevation={4}
                sx={{
                    mt: 4,
                    borderRadius: 3,
                    overflow: "hidden",
                    borderLeft: "6px solid #6a1b9a"
                }}
            >

                <CardContent
                    sx={{
                        py: 3
                    }}
                >

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        spacing={2}
                        alignItems={{
                            xs: "flex-start",
                            sm: "center"
                        }}
                        justifyContent="space-between"
                    >

                        <Box>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                            >
                                Total Revenue
                            </Typography>


                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                sx={{
                                    color: "#6a1b9a"
                                }}
                            >
                                € {Number(totalRevenue).toFixed(2)}
                            </Typography>

                        </Box>


                        <Avatar
                            sx={{
                                width: 64,
                                height: 64,
                                backgroundColor: "#f3e5f5",
                                color: "#6a1b9a"
                            }}
                        >

                            <PaidIcon
                                sx={{
                                    fontSize: 36
                                }}
                            />

                        </Avatar>

                    </Stack>

                </CardContent>

            </Card>


            {/* =================================================
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
                    ROOM STATUS
                ================================================= */}

                <Grid
                    item
                    xs={12}
                    lg={6}
                >

                    <Card
                        elevation={3}
                        sx={{
                            height: "100%",
                            borderRadius: 3,
                            p: 1
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{
                                    mb: 2
                                }}
                            >
                                Room Status
                            </Typography>


                            <Grid
                                container
                                spacing={2}
                            >

                                {roomStatistics.map(
                                    (stat) => (

                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            key={stat.title}
                                        >

                                            <Box
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 2,
                                                    backgroundColor:
                                                        stat.background,
                                                    minHeight: 105,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between"
                                                }}
                                            >

                                                <Box>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        fontWeight={600}
                                                    >
                                                        {stat.title}
                                                    </Typography>


                                                    <Typography
                                                        variant="h4"
                                                        fontWeight="bold"
                                                        sx={{
                                                            color:
                                                                stat.color
                                                        }}
                                                    >
                                                        {stat.value}
                                                    </Typography>

                                                </Box>


                                                <Box
                                                    sx={{
                                                        color:
                                                            stat.color,

                                                        "& .MuiSvgIcon-root":
                                                        {
                                                            fontSize: 34
                                                        }
                                                    }}
                                                >
                                                    {stat.icon}
                                                </Box>

                                            </Box>

                                        </Grid>

                                    )
                                )}

                            </Grid>

                        </CardContent>

                    </Card>

                </Grid>


                {/* =================================================
                    RESERVATION STATUS
                ================================================= */}

                <Grid
                    item
                    xs={12}
                    lg={6}
                >

                    <Card
                        elevation={3}
                        sx={{
                            height: "100%",
                            borderRadius: 3,
                            p: 1
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{
                                    mb: 2
                                }}
                            >
                                Reservation Status
                            </Typography>


                            <Grid
                                container
                                spacing={2}
                            >

                                {reservationStatistics.map(
                                    (stat) => (

                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            key={stat.title}
                                        >

                                            <Box
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 2,
                                                    backgroundColor:
                                                        stat.background,
                                                    minHeight: 105,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between"
                                                }}
                                            >

                                                <Box>

                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        fontWeight={600}
                                                    >
                                                        {stat.title}
                                                    </Typography>


                                                    <Typography
                                                        variant="h4"
                                                        fontWeight="bold"
                                                        sx={{
                                                            color:
                                                                stat.color
                                                        }}
                                                    >
                                                        {stat.value}
                                                    </Typography>

                                                </Box>


                                                <Box
                                                    sx={{
                                                        color:
                                                            stat.color,

                                                        "& .MuiSvgIcon-root":
                                                        {
                                                            fontSize: 34
                                                        }
                                                    }}
                                                >
                                                    {stat.icon}
                                                </Box>

                                            </Box>

                                        </Grid>

                                    )
                                )}

                            </Grid>

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
                        elevation={3}
                        sx={{
                            borderRadius: 3,
                            height: "100%"
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                            >
                                Reservations by Status
                            </Typography>


                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mb: 2
                                }}
                            >
                                Distribution of reservation statuses
                            </Typography>


                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    overflow: "hidden"
                                }}
                            >

                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                {
                                                    id: 0,
                                                    value:
                                                        pendingReservationCount,
                                                    label: "Pending",
                                                    color: "#ed6c02"
                                                },
                                                {
                                                    id: 1,
                                                    value:
                                                        confirmedReservationCount,
                                                    label: "Confirmed",
                                                    color: "#2e7d32"
                                                },
                                                {
                                                    id: 2,
                                                    value:
                                                        completedReservationCount,
                                                    label: "Completed",
                                                    color: "#0288d1"
                                                },
                                                {
                                                    id: 3,
                                                    value:
                                                        cancelledReservationCount,
                                                    label: "Cancelled",
                                                    color: "#c62828"
                                                }
                                            ],

                                            innerRadius: 45,
                                            outerRadius: 100,
                                            paddingAngle: 3,
                                            cornerRadius: 5
                                        }
                                    ]}

                                    width={500}
                                    height={300}
                                />

                            </Box>

                        </CardContent>

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
                        elevation={3}
                        sx={{
                            borderRadius: 3,
                            height: "100%"
                        }}
                    >

                        <CardContent>

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                            >
                                Rooms by Status
                            </Typography>


                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mb: 2
                                }}
                            >
                                Current room availability overview
                            </Typography>


                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    overflow: "hidden"
                                }}
                            >

                                <PieChart
                                    series={[
                                        {
                                            data: [
                                                {
                                                    id: 0,
                                                    value:
                                                        availableRoomCount,
                                                    label: "Available",
                                                    color: "#2e7d32"
                                                },
                                                {
                                                    id: 1,
                                                    value:
                                                        occupiedRoomCount,
                                                    label: "Occupied",
                                                    color: "#d32f2f"
                                                },
                                                {
                                                    id: 2,
                                                    value:
                                                        reservedRoomCount,
                                                    label: "Reserved",
                                                    color: "#ed6c02"
                                                },
                                                {
                                                    id: 3,
                                                    value:
                                                        maintenanceRoomCount,
                                                    label: "Maintenance",
                                                    color: "#616161"
                                                }
                                            ],

                                            innerRadius: 45,
                                            outerRadius: 100,
                                            paddingAngle: 3,
                                            cornerRadius: 5
                                        }
                                    ]}

                                    width={500}
                                    height={300}
                                />

                            </Box>

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

        </Box>

    );

}


export default Dashboard;