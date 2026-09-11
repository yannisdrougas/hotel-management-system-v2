import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@mui/material";

import EmployeeForm from "./EmployeeForm";


function EmployeeDialog({
    open,
    title,
    employee,
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

                <EmployeeForm

                    employee={employee}

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
                    form="employee-form"
                    variant="contained"
                >
                    Save
                </Button>

            </DialogActions>

        </Dialog>

    );

}


export default EmployeeDialog;