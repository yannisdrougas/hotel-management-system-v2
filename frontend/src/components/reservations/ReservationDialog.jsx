import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

import ReservationForm from "./ReservationForm";


// =====================================================
// Reservation Dialog
//
// Props:
//
// open
// title
// onClose
// onSave
// initialData
//
// =====================================================

function ReservationDialog({

    open,
    title,
    onClose,
    onSave,
    initialData

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

                <ReservationForm

                    onSave={onSave}

                    initialData={initialData}

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

                    form="reservation-form"

                    variant="contained"

                >

                    Save

                </Button>

            </DialogActions>

        </Dialog>

    );

}

export default ReservationDialog;