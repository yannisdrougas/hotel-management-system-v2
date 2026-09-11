import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

import HotelForm from "./HotelForm";


/*
===========================================================
Hotel Dialog

Props

open
title
hotel
onClose
onSave

===========================================================
*/

function HotelDialog({
    open,
    title,
    hotel,
    onClose,
    onSave
}) {

    return (

        <Dialog

            open={open}

            onClose={onClose}

            fullWidth

            maxWidth="md"

        >

            <DialogTitle>

                {title}

            </DialogTitle>


            <DialogContent>

                <HotelForm

                    hotel={hotel}

                    onSave={onSave}

                />

            </DialogContent>


            <DialogActions>

                <Button

                    onClick={onClose}

                    color="error"

                    variant="outlined"

                >

                    Cancel

                </Button>


                <Button

                    type="submit"

                    form="hotel-form"

                    variant="contained"

                >

                    Save

                </Button>

            </DialogActions>

        </Dialog>

    );

}


export default HotelDialog;