import { useEffect, useState } from "react";

import {
    Box,
    TextField,
    MenuItem,
    Button
} from "@mui/material";

import {
    getReservations
} from "../../services/reservationService";


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


function PaymentForm({
    payment,
    onSave
}) {

    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        reservationId: "",

        paymentDate: "",

        amount: "",

        paymentMethod: "",

        paymentStatus: "PENDING"

    });


    // =====================================================
    // RESERVATIONS
    // =====================================================

    const [reservations, setReservations] =
        useState([]);


    // =====================================================
    // LOAD RESERVATIONS
    // =====================================================

    useEffect(() => {

        loadReservations();

    }, []);


    const loadReservations = async () => {

        try {

            const response =
                await getReservations();

            setReservations(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        }
        catch (error) {

            console.error(
                "Failed to load reservations:",
                error
            );

            setReservations([]);

        }

    };


    // =====================================================
    // LOAD PAYMENT FOR EDIT
    // =====================================================

    useEffect(() => {

        if (payment) {

            setFormData({

                reservationId:
                    payment.reservationId !== null &&
                    payment.reservationId !== undefined
                        ? Number(payment.reservationId)
                        : "",

                paymentDate:
                    payment.paymentDate ?? "",

                amount:
                    payment.amount !== null &&
                    payment.amount !== undefined
                        ? payment.amount
                        : "",

                paymentMethod:
                    payment.paymentMethod ?? "",

                paymentStatus:
                    payment.paymentStatus ?? "PENDING"

            });

        }
        else {

            setFormData({

                reservationId: "",

                paymentDate: "",

                amount: "",

                paymentMethod: "",

                paymentStatus: "PENDING"

            });

        }

    }, [payment]);


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
    // HANDLE SUBMIT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();


        const paymentData = {

            reservationId:
                Number(formData.reservationId),

            paymentDate:
                formData.paymentDate,

            amount:
                Number(formData.amount),

            paymentMethod:
                formData.paymentMethod,

            paymentStatus:
                formData.paymentStatus

        };


        console.log(
            "PAYMENT TO SAVE:",
            paymentData
        );


        onSave(paymentData);

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <Box
            component="form"
            id="payment-form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 1
            }}
        >

            {/* =================================================
                RESERVATION
            ================================================= */}

            <TextField

                select

                fullWidth

                required

                label="Reservation"

                name="reservationId"

                value={formData.reservationId}

                onChange={handleChange}

            >

                <MenuItem value="">
                    Select Reservation
                </MenuItem>


                {reservations.map(
                    (reservation) => (

                        <MenuItem

                            key={
                                reservation.reservationId
                            }

                            value={
                                Number(
                                    reservation.reservationId
                                )
                            }

                        >

                            Reservation #
                            {reservation.reservationId}

                            {" - "}

                            {reservation.customerFirstName}{" "}
                            {reservation.customerLastName}

                            {" - Room "}

                            {reservation.roomNumber}

                        </MenuItem>

                    )
                )}

            </TextField>


            {/* =================================================
                PAYMENT DATE
            ================================================= */}

            <TextField

                fullWidth

                required

                type="date"

                label="Payment Date"

                name="paymentDate"

                value={formData.paymentDate}

                onChange={handleChange}

                slotProps={{
                    inputLabel: {
                        shrink: true
                    }
                }}

            />


            {/* =================================================
                AMOUNT
            ================================================= */}

            <TextField

                fullWidth

                required

                type="number"

                label="Amount"

                name="amount"

                value={formData.amount}

                onChange={handleChange}

                inputProps={{
                    min: 0.01,
                    step: "0.01"
                }}

            />


            {/* =================================================
                PAYMENT METHOD
            ================================================= */}

            <TextField

                select

                fullWidth

                required

                label="Payment Method"

                name="paymentMethod"

                value={formData.paymentMethod}

                onChange={handleChange}

            >

                <MenuItem value="">
                    Select Payment Method
                </MenuItem>


                {paymentMethods.map(
                    (method) => (

                        <MenuItem
                            key={method}
                            value={method}
                        >

                            {method}

                        </MenuItem>

                    )
                )}

            </TextField>


            {/* =================================================
                PAYMENT STATUS
            ================================================= */}

            <TextField

                select

                fullWidth

                required

                label="Payment Status"

                name="paymentStatus"

                value={formData.paymentStatus}

                onChange={handleChange}

            >

                {paymentStatuses.map(
                    (status) => (

                        <MenuItem
                            key={status}
                            value={status}
                        >

                            {status}

                        </MenuItem>

                    )
                )}

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


export default PaymentForm;