import { forwardRef, useId } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Controller } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

const SelectComponent = forwardRef(function SelectComponent({
    label = "Category",
    list,
    control,
    name,
}, ref) {

    const id = useId();
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState, formState }) => (
                <>
                    <TextField
                        label={label}
                        id={id}
                        select
                        value={value}
                        onChange={onChange}
                        sx={{ width: "10rem" }}
                    >
                        {
                            list.map((item) => <MenuItem key={item.id} value={item.value}>{item.value}</MenuItem>)
                        }
                    </TextField>
                </>

            )

            }
        />

    )
})

export default SelectComponent