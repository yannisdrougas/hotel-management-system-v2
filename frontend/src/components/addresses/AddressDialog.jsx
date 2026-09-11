import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

import AddressForm from "./AddressForm";


/*
===========================================================
Address Dialog
===========================================================

Props

open
title
address
onClose
onSave

===========================================================
*/


function AddressDialog({

    open,
    title,
    address,
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

                <AddressForm

                    address={address}

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

                    form="address-form"

                    variant="contained"

                >

                    Save

                </Button>

            </DialogActions>

        </Dialog>

    );

}


export default AddressDialog;