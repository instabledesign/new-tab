import {useState, useEffect} from "react";
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {CheckBox} from "@mui/icons-material";

export default function UppercaseTransformer({onTransform}) {

    const [locales, setLocales] = useState([]);

    const uppercaseTransform = str => {
        if (locales.length > 0) {
            return str.toLocaleUpperCase()
        }

        return str.toUpperCase()
    };

    useEffect(() => {
        onTransform(uppercaseTransform);
    }, [locales]);

    return (
        <>
            uppercase
        </>
    );
}
