import {useState, useEffect} from "react";
import {TextField} from "@mui/material";

export default function SingleFieldTransformer({name, transformFn, onTransform}) {
    const [data, setData] = useState('');

    useEffect(() => {
        onTransform(transformFn(data));
    }, [data]);

    return (
        <>
            {name}
            <TextField
                size='small'
                value={data}
                onChange={(event) => setData(event.target.value)}
            />
        </>
    );
}
