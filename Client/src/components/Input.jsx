import React from 'react';
import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const Input = forwardRef(function Input({
    name,
    control,
    type,
    Icon,
    label,
}, ref) {
    return (

        <>
            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange }, fieldState, formState }) =>
                (<TextField
                    label={label}
                    type={type}
                    InputProps={{
                        endAdornment: (Icon),
                        style: {
                            fontSize: { lg: 20, md: 15, xs: 10 },
                        },
                    }}
                    sx={{

                    }}
                    value={value}
                    onChange={onChange}
                />)
                }
            />
        </>

    )
})

export default Input