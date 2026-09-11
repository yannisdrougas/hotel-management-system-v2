import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from "@mui/material";


const employeePositions = [
    "MANAGER",
    "RECEPTIONIST",
    "HOUSEKEEPING",
    "CHEF",
    "WAITER",
    "MAINTENANCE"
];


function EmployeeFilter({

    lastName,
    position,

    onLastNameChange,
    onPositionChange,

    onClear

}) {

    return (

        <Box
            sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                mb: 3,
                flexWrap: "wrap"
            }}
        >

            {/* =================================================
                LAST NAME
            ================================================= */}

            <TextField

                label="Last Name"

                value={lastName}

                onChange={(event) =>
                    onLastNameChange(
                        event.target.value
                    )
                }

                sx={{
                    minWidth: 220
                }}

            />


            {/* =================================================
                POSITION
            ================================================= */}

            <FormControl
                sx={{
                    minWidth: 220
                }}
            >

                <InputLabel>
                    Position
                </InputLabel>

                <Select

                    value={position}

                    label="Position"

                    onChange={(event) =>
                        onPositionChange(
                            event.target.value
                        )
                    }

                >

                    <MenuItem value="">
                        All Positions
                    </MenuItem>


                    {employeePositions.map(
                        (employeePosition) => (

                            <MenuItem

                                key={employeePosition}

                                value={employeePosition}

                            >

                                {employeePosition}

                            </MenuItem>

                        )
                    )}

                </Select>

            </FormControl>


            {/* =================================================
                CLEAR FILTERS
            ================================================= */}

            <Button

                variant="outlined"

                color="secondary"

                onClick={onClear}

            >

                Clear Filters

            </Button>

        </Box>

    );

}


export default EmployeeFilter;