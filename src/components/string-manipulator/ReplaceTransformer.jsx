import {useState, useEffect} from "react";
import {TextField} from "@mui/material";

export default function ReplaceTransformer({onTransform}) {

    const [search, setSearch] = useState('');
    const [replace, setReplace] = useState('');

    const replaceTransform = str => str.replace(search, replace);

    useEffect(() => {
        onTransform(replaceTransform);
    }, [search, replace]);

    return (
        <>
            Replace
            <TextField
                size='small'
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            By
            <TextField
                size='small'
                value={replace}
                onChange={(event) => setReplace(event.target.value)}
            />
        </>
    );
}
