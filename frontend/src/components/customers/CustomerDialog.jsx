import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

import CustomerForm from "./CustomerForm";

/*
===========================================================
Customer Dialog
===========================================================

Props

open
title
customer
onClose
onSave

===========================================================
*/

function CustomerDialog({

    open,
    title,
    customer,
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

                <CustomerForm

                    customer={customer}

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

                    form="customer-form"

                    variant="contained"

                >

                    Save

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default CustomerDialog;