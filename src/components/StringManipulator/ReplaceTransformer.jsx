import {useState, useEffect} from "react";
import {Checkbox, FormControlLabel, Icon, TextField} from "@mui/material";
import {green} from '@mui/material/colors';
import {Help, Info} from "@mui/icons-material";

/**
 * It will
 * @Todo Finalize the toLocaleLowerCase implementation
 * @param onTransform
 * @returns {JSX.Element}
 * @constructor
 */
export default function ReplaceTransformer({onTransform}) {
    const [search, setSearch] = useState('');
    const [replace, setReplace] = useState('');
    const [all, setAll] = useState(false);

    const replaceTransform = str => {
        if (all) {
            return str.replaceAll(search, replace)
        }

        return str.replace(search, replace)
    };

    useEffect(() => {
        onTransform(replaceTransform);
    }, [search, replace, all]);

    return (
        <>
            Replace
            <FormControlLabel control={<Checkbox checked={all} onChange={e => setAll(e.target.checked)}/>} label="all"/>
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
            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace"
               target="_blank"><Help sx={{color: green[500], align: 'left'}}/></a>
        </>
    );
}
