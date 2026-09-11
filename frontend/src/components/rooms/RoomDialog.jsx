import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

import RoomForm from "./RoomForm";


/*
============================================================
Room Dialog

Props

open
title
room
onClose
onSave

============================================================
*/


function RoomDialog({
    open,
    title,
    room,
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

                <RoomForm

                    room={room}

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

                    form="room-form"

                    variant="contained"

                >

                    Save

                </Button>

            </DialogActions>

        </Dialog>

    );

}


export default RoomDialog;