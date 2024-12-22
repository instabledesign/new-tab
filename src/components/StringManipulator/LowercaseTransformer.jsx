import {useState, useEffect} from "react";
import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {CheckBox} from "@mui/icons-material";

/**
 * It will put the text to lowercase
 *
 * @Todo Finalize the toLocaleLowerCase implementation
 * @param onTransform
 * @returns {JSX.Element}
 * @constructor
 */
export default function LowercaseTransformer({onTransform}) {

    const [locales, setLocales] = useState([]);

    const lowercaseTransform = str => {
        if (locales.length > 0) {
            return str.toLocaleLowerCase()
        }

        return str.toLowerCase()
    };

    useEffect(() => {
        onTransform(lowercaseTransform);
    }, [locales]);

    return (
        <>
            lowercase
        </>
    );
}
