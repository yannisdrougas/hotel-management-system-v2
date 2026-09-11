import { useEffect, useState } from "react";

import {
    TextField,
    Grid,
    MenuItem
} from "@mui/material";

import { getAddresses } from "../../services/addressService";


function HotelForm({
    hotel,
    onSave
}) {

    // =====================================================
    // ADDRESSES
    // =====================================================

    const [addresses, setAddresses] = useState([]);


    useEffect(() => {

        loadAddresses();

    }, []);


    const loadAddresses = async () => {

        try {

            const response = await getAddresses();

            setAddresses(response.data);

        }
        catch (error) {

            console.error(
                "Failed to load addresses:",
                error
            );

        }

    };


    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        name: "",
        phone: "",
        stars: "",
        addressId: ""

    });


    // =====================================================
    // LOAD HOTEL FOR EDIT
    // =====================================================

    useEffect(() => {

        if (hotel) {

            /*
             * Το HotelResponse επιστρέφει:
             *
             * address: {
             *     country,
             *     city,
             *     street,
             *     streetNumber
             * }
             *
             * Δεν επιστρέφει addressId.
             *
             * Για το Edit θα χρειαστούμε το addressId
             * του Hotel από το backend.
             */

            setFormData({

                name: hotel.name || "",

                phone: hotel.phone || "",

                stars: hotel.stars || "",

               addressId: hotel.address?.addressId || ""

            });

        }
        else {

            setFormData({

                name: "",
                phone: "",
                stars: "",
                addressId: ""

            });

        }

    }, [hotel]);


    // =====================================================
    // HANDLE CHANGE
    // =====================================================

    const handleChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]: event.target.value

        });

    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();


        onSave({

            name: formData.name,

            phone: formData.phone,

            stars: Number(formData.stars),

            addressId: Number(formData.addressId)

        });

    };


    // =====================================================
    // ADDRESS LABEL
    // =====================================================

    const getAddressLabel = (address) => {

        return `${address.street} ${address.streetNumber}, ${address.city}, ${address.country}`;

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <form
            id="hotel-form"
            onSubmit={handleSubmit}
        >

            <Grid
                container
                spacing={2}
                sx={{ mt: 1 }}
            >

                {/* =================================================
                    HOTEL NAME
                ================================================= */}

                <Grid size={{ xs: 12, md: 6 }}>

                    <TextField

                        fullWidth

                        required

                        label="Hotel Name"

                        name="name"

                        value={formData.name}

                        onChange={handleChange}

                    />

                </Grid>


                {/* =================================================
                    PHONE
                ================================================= */}

                <Grid size={{ xs: 12, md: 6 }}>

                    <TextField

                        fullWidth

                        required

                        label="Phone"

                        name="phone"

                        value={formData.phone}

                        onChange={handleChange}

                    />

                </Grid>


                {/* =================================================
                    STARS
                ================================================= */}

                <Grid size={{ xs: 12, md: 6 }}>

                    <TextField

                        fullWidth

                        required

                        select

                        label="Stars"

                        name="stars"

                        value={formData.stars}

                        onChange={handleChange}

                         sx={{
                         minWidth: 180
                         }}

                    >

                        <MenuItem value={1}>
                            ⭐ 1 Star
                        </MenuItem>

                        <MenuItem value={2}>
                            ⭐⭐ 2 Stars
                        </MenuItem>

                        <MenuItem value={3}>
                            ⭐⭐⭐ 3 Stars
                        </MenuItem>

                        <MenuItem value={4}>
                            ⭐⭐⭐⭐ 4 Stars
                        </MenuItem>

                        <MenuItem value={5}>
                            ⭐⭐⭐⭐⭐ 5 Stars
                        </MenuItem>

                    </TextField>

                </Grid>


                {/* =================================================
                    ADDRESS
                ================================================= */}

                <Grid size={{ xs: 12, md: 6 }}>

                    <TextField

                        fullWidth

                        required

                        select

                        label="Select Address"

                        name="addressId"

                        value={formData.addressId}

                        onChange={handleChange}

                        sx={{
                        minWidth: 250
                         }}

                    >

                        {addresses.map((address) => (

                            <MenuItem

                                key={address.addressId}

                                value={address.addressId}

                            >

                                {getAddressLabel(address)}

                            </MenuItem>

                        ))}

                    </TextField>

                </Grid>

            </Grid>

        </form>

    );

}


export default HotelForm;