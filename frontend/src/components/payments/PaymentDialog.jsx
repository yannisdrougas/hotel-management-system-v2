import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

import PaymentForm from "./PaymentForm";


function PaymentDialog({
    open,
    title,
    payment,
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

                <PaymentForm

                    payment={payment}

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
                    form="payment-form"
                    variant="contained"
                >
                    Save
                </Button>

            </DialogActions>

        </Dialog>

    );

}


export default PaymentDialog;