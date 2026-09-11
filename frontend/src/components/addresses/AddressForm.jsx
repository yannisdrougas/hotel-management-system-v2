import { useState, useEffect } from "react";

import {
    TextField,
    Grid
} from "@mui/material";


function AddressForm({

    address,
    onSave

}) {

    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        country: "",
        city: "",
        street: "",
        streetNumber: ""

    });


    // =====================================================
    // LOAD ADDRESS FOR EDIT
    // =====================================================

    useEffect(() => {

        if (address) {

            setFormData({

                country: address.country || "",
                city: address.city || "",
                street: address.street || "",
                streetNumber: address.streetNumber || ""

            });

        }
        else {

            setFormData({

                country: "",
                city: "",
                street: "",
                streetNumber: ""

            });

        }

    }, [address]);


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
    // HANDLE SUBMIT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();

        onSave(formData);

    };


    return (

        <form

            id="address-form"

            onSubmit={handleSubmit}

        >

            <Grid

                container

                spacing={2}

                sx={{ mt: 1 }}

            >

                {/* =================================================
                    COUNTRY
                ================================================= */}

                <Grid size={{ xs: 12, md: 6 }}>

                    <TextField

                        fullWidth

                        required

                        label="Country"

                        name="country"

                        value={formData.country}

                        onChange={handleChange}

                    />

                </Grid>


                {/* =================================================
                    CITY
                ================================================= */}

                <Grid size={{ xs: 12, md: 6 }}>

                    <TextField

                        fullWidth

                        required

                        label="City"

                        name="city"

                        value={formData.city}

                        onChange={handleChange}

                    />

                </Grid>


                {/* =================================================
                    STREET
                ================================================= */}

                <Grid size={{ xs: 12, md: 8 }}>

                    <TextField

                        fullWidth

                        required

                        label="Street"

                        name="street"

                        value={formData.street}

                        onChange={handleChange}

                    />

                </Grid>


                {/* =================================================
                    STREET NUMBER
                ================================================= */}

                <Grid size={{ xs: 12, md: 4 }}>

                    <TextField

                        fullWidth

                        required

                        label="Street Number"

                        name="streetNumber"

                        value={formData.streetNumber}

                        onChange={handleChange}

                    />

                </Grid>

            </Grid>

        </form>

    );

}


export default AddressForm;