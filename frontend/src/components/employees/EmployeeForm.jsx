import { useEffect, useState } from "react";

import {
    Box,
    TextField,
    MenuItem,
    Button,
    Divider,
    Alert
} from "@mui/material";

import {
    getAddresses,
    createAddress
} from "../../services/addressService";


const employeePositions = [
    "MANAGER",
    "RECEPTIONIST",
    "HOUSEKEEPING",
    "CHEF",
    "WAITER",
    "MAINTENANCE"
];


function EmployeeForm({
    employee,
    onSave
}) {

    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        firstName: "",
        lastName: "",
        position: "",
        salary: "",
        hireDate: "",
        phone: "",
        addressId: ""

    });


    // =====================================================
    // ADDRESSES
    // =====================================================

    const [addresses, setAddresses] =
        useState([]);

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


    // =====================================================
    // LOAD ADDRESSES
    // =====================================================

    useEffect(() => {

        loadAddresses();

    }, []);


    const loadAddresses = async () => {

        try {

            const response =
                await getAddresses();

            const addressList =
                Array.isArray(response.data)
                    ? response.data
                    : [];

            setAddresses(addressList);

            return addressList;

        }
        catch (error) {

            console.error(
                "Failed to load addresses:",
                error
            );

            setAddresses([]);

            return [];

        }

    };


    // =====================================================
    // LOAD EMPLOYEE FOR EDIT
    // =====================================================

    useEffect(() => {

        if (employee) {

            setFormData({

                firstName:
                    employee.firstName ?? "",

                lastName:
                    employee.lastName ?? "",

                position:
                    employee.position ?? "",

                salary:
                    employee.salary !== null &&
                    employee.salary !== undefined
                        ? employee.salary
                        : "",

                hireDate:
                    employee.hireDate ?? "",

                phone:
                    employee.phone ?? "",

                addressId:
                    employee.addressId !== null &&
                    employee.addressId !== undefined
                        ? Number(employee.addressId)
                        : ""

            });

        }
        else {

            setFormData({

                firstName: "",
                lastName: "",
                position: "",
                salary: "",
                hireDate: "",
                phone: "",
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

    }, [employee]);


    // =====================================================
    // HANDLE EMPLOYEE CHANGE
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
    // HANDLE NEW ADDRESS CHANGE
    // =====================================================

    const handleNewAddressChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setNewAddress(
            previous => ({

                ...previous,

                [name]: value

            })
        );

    };


    // =====================================================
    // TOGGLE NEW ADDRESS FORM
    // =====================================================

    const handleToggleNewAddressForm = () => {

        setShowNewAddressForm(
            previous => !previous
        );

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
            // locate the new address in refreshed list.
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

                setFormData(
                    previous => ({

                        ...previous,

                        addressId:
                            Number(newAddressId)

                    })
                );

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
    // HANDLE EMPLOYEE SUBMIT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();


        const employeeData = {

            firstName:
                formData.firstName,

            lastName:
                formData.lastName,

            position:
                formData.position,

            salary:
                Number(formData.salary),

            hireDate:
                formData.hireDate || null,

            phone:
                formData.phone,

            addressId:
                formData.addressId === ""
                    ? null
                    : Number(formData.addressId)

        };


        console.log(
            "EMPLOYEE TO SAVE:",
            employeeData
        );


        onSave(employeeData);

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <Box
            component="form"
            id="employee-form"
            onSubmit={handleSubmit}

            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 1,
                width: "100%"
            }}
        >

            {/* =================================================
                FIRST NAME
            ================================================= */}

            <TextField
                fullWidth
                required
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />


            {/* =================================================
                LAST NAME
            ================================================= */}

            <TextField
                fullWidth
                required
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />


            {/* =================================================
                POSITION
            ================================================= */}

            <TextField
                select
                fullWidth
                required
                label="Position"
                name="position"
                value={formData.position}
                onChange={handleChange}
            >

                <MenuItem value="">
                    Select Position
                </MenuItem>


                {employeePositions.map(
                    (position) => (

                        <MenuItem
                            key={position}
                            value={position}
                        >

                            {position}

                        </MenuItem>

                    )
                )}

            </TextField>


            {/* =================================================
                SALARY
            ================================================= */}

            <TextField
                fullWidth
                required
                type="number"
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}

                inputProps={{
                    min: 0,
                    step: "0.01"
                }}
            />


            {/* =================================================
                HIRE DATE
            ================================================= */}

            <TextField
                fullWidth
                type="date"
                label="Hire Date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}

                slotProps={{
                    inputLabel: {
                        shrink: true
                    }
                }}
            />


            {/* =================================================
                PHONE
            ================================================= */}

            <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
            />


            {/* =================================================
                ADDRESS DROPDOWN
            ================================================= */}

            <TextField
                select
                fullWidth
                label="Address"
                name="addressId"
                value={formData.addressId}
                onChange={handleChange}

                sx={{
                    width: "100%"
                }}
            >

                <MenuItem value="">
                    No Address
                </MenuItem>


                {addresses.map(
                    (address) => (

                        <MenuItem
                            key={
                                address.addressId
                            }

                            value={
                                Number(
                                    address.addressId
                                )
                            }
                        >

                            {address.street}{" "}
                            {address.streetNumber},{" "}
                            {address.city},{" "}
                            {address.country}

                        </MenuItem>

                    )
                )}

            </TextField>


            {/* =================================================
                ADD NEW ADDRESS BUTTON
            ================================================= */}

            <Box>

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

            </Box>


            {/* =================================================
                NEW ADDRESS FORM
            ================================================= */}

            {showNewAddressForm && (

                <Box
                    sx={{
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


                    {/* =========================================
                        CSS GRID - ADDRESS FIELDS
                    ========================================= */}

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


                    {/* =========================================
                        ERROR MESSAGE
                    ========================================= */}

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


                    {/* =========================================
                        SAVE ADDRESS BUTTON
                    ========================================= */}

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

            )}


            {/* =================================================
                HIDDEN EMPLOYEE SAVE
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


export default EmployeeForm;