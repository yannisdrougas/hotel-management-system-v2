import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from "@mui/material";


const paymentMethods = [
    "CASH",
    "CREDIT_CARD",
    "DEBIT_CARD",
    "PAYPAL",
    "BANK_TRANSFER"
];


const paymentStatuses = [
    "PENDING",
    "PAID",
    "REFUNDED",
    "FAILED"
];


function PaymentFilter({

    reservations,

    reservationId,
    paymentMethod,
    paymentStatus,

    onReservationChange,
    onPaymentMethodChange,
    onPaymentStatusChange,

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
                RESERVATION
            ================================================= */}

            <FormControl
                sx={{
                    minWidth: 300
                }}
            >

                <InputLabel>
                    Reservation
                </InputLabel>

                <Select

                    value={reservationId}

                    label="Reservation"

                    onChange={(event) =>
                        onReservationChange(
                            event.target.value
                        )
                    }

                >

                    <MenuItem value="">
                        All Reservations
                    </MenuItem>


                    {reservations.map((reservation) => (

                        <MenuItem

                            key={reservation.reservationId}

                            value={reservation.reservationId}

                        >

                            Reservation #{reservation.reservationId}

                            {" - "}

                            {reservation.customerFirstName}{" "}
                            {reservation.customerLastName}

                            {" - Room "}

                            {reservation.roomNumber}

                        </MenuItem>

                    ))}

                </Select>

            </FormControl>


            {/* =================================================
                PAYMENT METHOD
            ================================================= */}

            <FormControl
                sx={{
                    minWidth: 200
                }}
            >

                <InputLabel>
                    Payment Method
                </InputLabel>

                <Select

                    value={paymentMethod}

                    label="Payment Method"

                    onChange={(event) =>
                        onPaymentMethodChange(
                            event.target.value
                        )
                    }

                >

                    <MenuItem value="">
                        All Methods
                    </MenuItem>


                    {paymentMethods.map((method) => (

                        <MenuItem
                            key={method}
                            value={method}
                        >

                            {method}

                        </MenuItem>

                    ))}

                </Select>

            </FormControl>


            {/* =================================================
                PAYMENT STATUS
            ================================================= */}

            <FormControl
                sx={{
                    minWidth: 180
                }}
            >

                <InputLabel>
                    Payment Status
                </InputLabel>

                <Select

                    value={paymentStatus}

                    label="Payment Status"

                    onChange={(event) =>
                        onPaymentStatusChange(
                            event.target.value
                        )
                    }

                >

                    <MenuItem value="">
                        All Statuses
                    </MenuItem>


                    {paymentStatuses.map((status) => (

                        <MenuItem
                            key={status}
                            value={status}
                        >

                            {status}

                        </MenuItem>

                    ))}

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


export default PaymentFilter;