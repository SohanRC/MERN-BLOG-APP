import React from 'react'
import HashLoader from "react-spinners/HashLoader"
import { useSelector } from "react-redux"

export default function Loader() {
    const theme = useSelector((state) => state.theme.theme);
    return (
        <HashLoader
            color={`${theme === 'dark' ? 'white' : null}`}
            loading={true}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )

}
