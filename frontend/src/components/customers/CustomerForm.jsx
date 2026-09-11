import { useState, useEffect } from "react";

import {
    TextField,
    Grid,
    MenuItem,
    Button,
    Box,
    Divider,
    Alert
} from "@mui/material";

import {
    getAddresses,
    createAddress
} from "../../services/addressService";


function CustomerForm({

    customer,
    onSave

}) {

    // =====================================================
    // ADDRESSES
    // =====================================================

    const [addresses, setAddresses] = useState([]);

    const [showNewAddressForm, setShowNewAddressForm] =
        useState(false);

    const [savingAddress, setSavingAddress] =
        useState(false);

    const [addressError, setAddressError] =
        useState("");


    const [newAddress, setNewAddress] = useState({

        country: "",
        city: "",
        street: "",
        streetNumber: ""

    });


    useEffect(() => {

        loadAddresses();

    }, []);


    const loadAddresses = async () => {

        try {

            const response = await getAddresses();

            console.log("ADDRESSES:", response.data);

            setAddresses(response.data);

            return response.data;

        }
        catch (error) {

            console.error(
                "ERROR LOADING ADDRESSES:",
                error
            );

            return [];

        }

    };


    // =====================================================
    // CUSTOMER FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        addressId: ""

    });


    // =====================================================
    // LOAD CUSTOMER FOR EDIT
    // =====================================================

    useEffect(() => {

        if (customer) {

            setFormData({

                firstName: customer.firstName || "",
                lastName: customer.lastName || "",
                phone: customer.phone || "",
                email: customer.email || "",

                addressId:
                    customer.addressId !== null &&
                    customer.addressId !== undefined
                        ? String(customer.addressId)
                        : ""

            });

        }
        else {

            setFormData({

                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                addressId: ""

            });

        }


        // Reset New Address form
        setShowNewAddressForm(false);

        setNewAddress({

            country: "",
            city: "",
            street: "",
            streetNumber: ""

        });

        setAddressError("");

    }, [customer]);


    // =====================================================
    // HANDLE CUSTOMER CHANGE
    // =====================================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // =====================================================
    // HANDLE NEW ADDRESS CHANGE
    // =====================================================

    const handleNewAddressChange = (event) => {

        const { name, value } = event.target;

        setNewAddress((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // =====================================================
    // TOGGLE NEW ADDRESS FORM
    // =====================================================

    const handleToggleNewAddressForm = () => {

        setShowNewAddressForm((previous) => !previous);

        setAddressError("");

    };


    // =====================================================
    // SAVE NEW ADDRESS
    // =====================================================

    const handleSaveNewAddress = async () => {

        setAddressError("");


        // Validate Address fields
        if (
            !newAddress.country.trim() ||
            !newAddress.city.trim() ||
            !newAddress.street.trim() ||
            !String(newAddress.streetNumber).trim()
        ) {

            setAddressError(
                "Please complete all address fields."
            );

            return;

        }


        try {

            setSavingAddress(true);


            const addressData = {

                country:
                    newAddress.country.trim(),

                city:
                    newAddress.city.trim(),

                street:
                    newAddress.street.trim(),

                streetNumber:
                    String(
                        newAddress.streetNumber
                    ).trim()

            };


            console.log(
                "NEW ADDRESS TO SAVE:",
                addressData
            );


            // Create Address
            const response =
                await createAddress(addressData);


            console.log(
                "NEW ADDRESS SAVED:",
                response.data
            );


            const createdAddress =
                response.data;


            // Refresh Address dropdown
            const updatedAddresses =
                await loadAddresses();


            // Get ID returned from backend
            let newAddressId =
                createdAddress?.addressId;


            // =================================================
            // FALLBACK
            //
            // If POST does not return addressId,
            // locate the newly-created address
            // in the refreshed list.
            // =================================================

            if (
                newAddressId === null ||
                newAddressId === undefined
            ) {

                const matchingAddress =
                    updatedAddresses.find(
                        (address) =>

                            address.country ===
                                addressData.country &&

                            address.city ===
                                addressData.city &&

                            address.street ===
                                addressData.street &&

                            String(
                                address.streetNumber
                            ) ===
                                String(
                                    addressData.streetNumber
                                )
                    );


                if (matchingAddress) {

                    newAddressId =
                        matchingAddress.addressId;

                }

            }


            // =================================================
            // AUTOMATICALLY SELECT NEW ADDRESS
            // =================================================

            if (
                newAddressId !== null &&
                newAddressId !== undefined
            ) {

                setFormData((previous) => ({

                    ...previous,

                    addressId:
                        String(newAddressId)

                }));

            }


            // =================================================
            // CLEAR NEW ADDRESS FORM
            // =================================================

            setNewAddress({

                country: "",
                city: "",
                street: "",
                streetNumber: ""

            });


            setShowNewAddressForm(false);

        }
        catch (error) {

            console.error(
                "ERROR CREATING ADDRESS:",
                error
            );

            setAddressError(
                "Failed to save the address."
            );

        }
        finally {

            setSavingAddress(false);

        }

    };


    // =====================================================
    // HANDLE CUSTOMER SUBMIT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();


        const customerData = {

            ...formData,

            addressId:
                formData.addressId === ""
                    ? null
                    : Number(formData.addressId)

        };


        console.log(
            "CUSTOMER DATA TO SAVE:",
            customerData
        );


        onSave(customerData);

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <form
            id="customer-form"
            onSubmit={handleSubmit}
        >

            <Grid
                container
                spacing={2}
                sx={{
                    mt: 1,
                    width: "100%"
                }}
            >

                {/* =========================================
                    FIRST NAME
                ========================================= */}

                <Grid
                    size={{ xs: 12, md: 6 }}
                >

                    <TextField
                        fullWidth
                        required
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />

                </Grid>


                {/* =========================================
                    LAST NAME
                ========================================= */}

                <Grid
                    size={{ xs: 12, md: 6 }}
                >

                    <TextField
                        fullWidth
                        required
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />

                </Grid>


                {/* =========================================
                    PHONE
                ========================================= */}

                <Grid
                    size={{ xs: 12, md: 6 }}
                >

                    <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                </Grid>


                {/* =========================================
                    EMAIL
                ========================================= */}

                <Grid
                    size={{ xs: 12, md: 6 }}
                >

                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                </Grid>


                {/* =========================================
                    ADDRESS DROPDOWN
                ========================================= */}

                <Grid
                    size={{ xs: 12 }}
                    sx={{
                        width: "100%"
                    }}
                >

                    <TextField
                        select
                        fullWidth
                        required
                        label="Address"
                        name="addressId"
                        value={formData.addressId}
                        onChange={handleChange}
                        sx={{
                            width: "100%"
                        }}
                    >

                        <MenuItem value="">
                            Select Address...
                        </MenuItem>


                        {addresses.map((address) => (

                            <MenuItem
                                key={address.addressId}
                                value={
                                    String(
                                        address.addressId
                                    )
                                }
                            >

                                {address.country}
                                {" - "}
                                {address.city}
                                {" - "}
                                {address.street}
                                {" "}
                                {address.streetNumber}

                            </MenuItem>

                        ))}

                    </TextField>

                </Grid>


                {/* =========================================
                    ADD NEW ADDRESS BUTTON
                ========================================= */}

                <Grid
                    size={{ xs: 12 }}
                    sx={{
                        width: "100%"
                    }}
                >

                    <Button
                        type="button"
                        variant="outlined"
                        onClick={
                            handleToggleNewAddressForm
                        }
                    >

                        {showNewAddressForm
                            ? "Cancel New Address"
                            : "Add New Address"
                        }

                    </Button>

                </Grid>


                {/* =========================================
                    NEW ADDRESS FORM
                ========================================= */}

                {showNewAddressForm && (

                    <Grid
                        size={{ xs: 12 }}
                        sx={{
                            width: "100%"
                        }}
                    >

                        <Box
                            sx={{
                                mt: 1,
                                p: 2,
                                width: "100%",
                                boxSizing: "border-box",
                                border: "1px solid #ddd",
                                borderRadius: 2
                            }}
                        >

                            <Divider
                                sx={{
                                    mb: 2
                                }}
                            >

                                New Address

                            </Divider>


                            {/* =================================
                                CSS GRID - ADDRESS FIELDS
                            ================================= */}

                            <Box
                                sx={{
                                    display: "grid",

                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        md: "1fr 1fr"
                                    },

                                    gap: 2,

                                    width: "100%"
                                }}
                            >

                                {/* COUNTRY */}

                                <TextField
                                    fullWidth
                                    required
                                    label="Country"
                                    name="country"
                                    value={
                                        newAddress.country
                                    }
                                    onChange={
                                        handleNewAddressChange
                                    }
                                />


                                {/* CITY */}

                                <TextField
                                    fullWidth
                                    required
                                    label="City"
                                    name="city"
                                    value={
                                        newAddress.city
                                    }
                                    onChange={
                                        handleNewAddressChange
                                    }
                                />


                                {/* STREET */}

                                <TextField
                                    fullWidth
                                    required
                                    label="Street"
                                    name="street"
                                    value={
                                        newAddress.street
                                    }
                                    onChange={
                                        handleNewAddressChange
                                    }
                                />


                                {/* STREET NUMBER */}

                                <TextField
                                    fullWidth
                                    required
                                    label="Street Number"
                                    name="streetNumber"
                                    value={
                                        newAddress.streetNumber
                                    }
                                    onChange={
                                        handleNewAddressChange
                                    }
                                />

                            </Box>


                            {/* =================================
                                ERROR
                            ================================= */}

                            {addressError && (

                                <Alert
                                    severity="error"
                                    sx={{
                                        mt: 2
                                    }}
                                >

                                    {addressError}

                                </Alert>

                            )}


                            {/* =================================
                                SAVE ADDRESS
                            ================================= */}

                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    mt: 2
                                }}
                            >

                                <Button
                                    type="button"
                                    variant="contained"
                                    onClick={
                                        handleSaveNewAddress
                                    }
                                    disabled={
                                        savingAddress
                                    }
                                >

                                    {savingAddress
                                        ? "Saving Address..."
                                        : "Save Address"
                                    }

                                </Button>

                            </Box>

                        </Box>

                    </Grid>

                )}

            </Grid>

        </form>

    );

}


export default CustomerForm;