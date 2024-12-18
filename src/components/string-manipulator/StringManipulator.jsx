import {useState, useEffect, useCallback} from "react";
import {
    Card, CardHeader, CardContent, TextField, Box, Button, Switch, IconButton, Grid2
} from "@mui/material";
import {ArrowUpward, Clear} from "@mui/icons-material";
import SimpleTransformer from "./SimpleTransformer.jsx";
import {
    suffix,
    prefix,
    wrap,
    wrapInTags,
    toUpperCase,
    toLowerCase,
    camelCase,
    snakeCase,
    kebabCase,
    pascalCase,
    dotCase,
    l33tFilter,
    split,
    join,
} from "./string_functions.jsx";
import md5 from 'crypto-js/md5';
import sha1 from 'crypto-js/sha1';
import sha3 from 'crypto-js/sha3.js';
import sha224 from 'crypto-js/sha224.js';
import sha256 from 'crypto-js/sha256.js';
import sha384 from 'crypto-js/sha384.js';
import sha512 from 'crypto-js/sha512.js';
import hmacSha1 from 'crypto-js/hmac-sha1';
import hmacSha3 from 'crypto-js/hmac-sha3.js';
import hmacSha224 from 'crypto-js/hmac-sha224.js';
import hmacSha256 from 'crypto-js/hmac-sha256.js';
import hmacSha384 from 'crypto-js/hmac-sha384.js';
import hmacSha512 from 'crypto-js/hmac-sha512.js';
import SingleFieldTransformer from "./SingleFieldTransformer.jsx";
import ReplaceTransformer from "./ReplaceTransformer.jsx";

export default function StringManipulator() {
    const [inputData, setInputData] = useState('');
    const [outputData, setOutputData] = useState('');

    const [transformations, setTransformations] = useState([]);

    const availableTransformations = [{
        name: 'Prefix',
        component: props => <SingleFieldTransformer name="prefix" transformFn={prefix} {...props}/>
    }, {
        name: 'Suffix',
        component: props => <SingleFieldTransformer name="suffix" transformFn={suffix} {...props}/>
    }, {name: 'Wrap', component: props => <SingleFieldTransformer name="wrap" transformFn={wrap} {...props}/>}, {
        name: 'Wrap in tags',
        component: props => <SingleFieldTransformer name="wrapInTags" transformFn={wrapInTags} {...props}/>
    }, {
        name: 'lowercase',
        component: props => <SimpleTransformer name="lowerCase" transformFn={toLowerCase} {...props}/>
    }, {
        name: 'UPPERCASE',
        component: props => <SimpleTransformer name="upperCase" transformFn={toUpperCase} {...props}/>
    }, {
        name: 'camelCase', component: props => <SimpleTransformer name="camelCase" transformFn={camelCase} {...props}/>
    }, {
        name: 'snake_case',
        component: props => <SimpleTransformer name="snake_case" transformFn={snakeCase} {...props}/>
    }, {
        name: 'kebab-case',
        component: props => <SimpleTransformer name="kebab-case" transformFn={kebabCase} {...props}/>
    }, {
        name: 'PascalCase',
        component: props => <SimpleTransformer name="PascalCase" transformFn={pascalCase} {...props}/>
    }, {
        name: 'dot.case',
        component: props => <SimpleTransformer name="dot.case" transformFn={dotCase} {...props}/>
    }, {
        name: 'l33t',
        component: props => <SimpleTransformer name="l33t" transformFn={l33tFilter} {...props}/>
    }, {name: 'replace', component: props => <ReplaceTransformer {...props}/>}, {
        name: 'split',
        component: props => <SingleFieldTransformer name='split' transformFn={split} {...props}/>
    }, {name: 'join', component: props => <SingleFieldTransformer name='join' transformFn={join} {...props}/>}, {
        name: 'base64 encode',
        component: props => <SimpleTransformer name='base64 encode' transformFn={btoa} {...props}/>
    }, {
        name: 'base64 decode',
        component: props => <SimpleTransformer name='base64 decode' transformFn={atob} {...props}/>
    }, {
        name: 'md5', component: props => <SimpleTransformer name='md5' transformFn={md5} {...props}/>
    }, {
        name: 'sha1', component: props => <SimpleTransformer name='sha1' transformFn={sha1} {...props}/>
    }, {
        name: 'sha3', component: props => <SimpleTransformer name='sha3' transformFn={sha3} {...props}/>
    }, {
        name: 'sha224', component: props => <SimpleTransformer name='sha224' transformFn={sha224} {...props}/>
    }, {
        name: 'sha256', component: props => <SimpleTransformer name='sha256' transformFn={sha256} {...props}/>
    }, {
        name: 'sha384', component: props => <SimpleTransformer name='sha384' transformFn={sha384} {...props}/>
    }, {
        name: 'sha512', component: props => <SimpleTransformer name='sha512' transformFn={sha512} {...props}/>
    }, // {
        //     name: 'hmacSha1',
        //     component: props => <SimpleTransformer name='hmacSha1' transformFn={hmacSha1} {...props}/>
        // },
        // {
        //     name: 'hmacSha3',
        //     component: props => <SimpleTransformer name='hmacSha3' transformFn={hmacSha3} {...props}/>
        // },
        // {
        //     name: 'hmacSha224',
        //     component: props => <SimpleTransformer name='hmacSha224' transformFn={hmacSha224} {...props}/>
        // },
        // {
        //     name: 'hmacSha256',
        //     component: props => <SimpleTransformer name='hmacSha256' transformFn={hmacSha256} {...props}/>
        // },
        // {
        //     name: 'hmacSha384',
        //     component: props => <SimpleTransformer name='hmacSha384' transformFn={hmacSha384} {...props}/>
        // },
        // {
        //     name: 'hmacSha512',
        //     component: props => <SimpleTransformer name='hmacSha512' transformFn={hmacSha512} {...props}/>
        // },
    ];

    const reduceTransformations = (...transformers) => (input) => {
        const steps = [];
        const result = transformers.reduce((acc, transformer, index, arr) => {
            if (!transformer.enabled) {
                return acc;
            }
            const step = {step: index + 1, input: acc}
            try {
                step.result = Array.isArray(acc) && !transformer.transformFn.acceptsArray ? acc.map(transformer.transformFn) : transformer.transformFn(acc);
            } catch (e) {
                step.error = e;
                arr.splice(1);
            }
            steps.push(step);
            return step.result;
        }, input);

        return {result, steps};
    };

    const applyTransformations = useCallback(reduceTransformations(...transformations), [transformations]);

    const handleAddTransformation = (Component) => {
        setTransformations([...transformations, {enabled: true, Component, transformFn: (text) => text}]);
    };

    const handleTransformationUpdate = useCallback((index, transformFn) => {
        setTransformations((prevTransformations) => {
            const updatedTransformations = [...prevTransformations];
            updatedTransformations[index] = {...updatedTransformations[index], transformFn};
            return updatedTransformations;
        });
    }, []);

    const addTransformationError = useCallback((index, error) => {
        setTransformations((prevTransformations) => {
            const updatedTransformations = [...prevTransformations];
            updatedTransformations[index] = {...updatedTransformations[index], error};
            return updatedTransformations;
        });
    }, []);

    const toggleEnable = (index) => {
        setTransformations((prev) => prev.map((item, i) => (i === index ? {...item, enabled: !item.enabled} : item)));
    };

    const deleteFunction = (index) => {
        setTransformations((prev) => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const {result, steps} = applyTransformations(inputData);
        console.log(steps);
        setOutputData(result);

    }, [inputData, applyTransformations]);

    return (
        <Card raised>
            <CardHeader
                title="String Manipulation"
                titleTypographyProps={{variant: 'h6', fontWeight: 'bold'}}
                subheaderTypographyProps={{variant: 'body2', color: 'text.secondary'}}
            />
            <CardContent>
                <Grid2 container spacing={1}>
                    <Grid2 size={{sm: 10, xs: 8}}>
                        <TextField
                            name="input-data"
                            label="Input Data"
                            required
                            fullWidth
                            multiline
                            minRows={4}
                            value={inputData}
                            onChange={event => setInputData(event.target.value)}
                            sx={{mb: 1}}
                            // error={error}
                        />
                        <Box sx={{display: "flex", flexDirection: "column", gap: 1, mb: 1}}>
                            {transformations.map(({Component, enabled, error}, index) => (
                                <Box key={index}
                                     sx={{
                                         display: 'flex',
                                         flexDirection: 'row',
                                         alignItems: "center",
                                         gap: 1,
                                         padding: 1,
                                         border: "1px solid lightgray",
                                         borderColor: error ? 'red' : enabled ? 'blue' : 'lightgray',
                                         opacity: enabled ? '100%' : '50%',
                                         borderRadius: "4px",
                                     }}
                                >
                                    <Switch onChange={() => toggleEnable(index)} checked={enabled}/>
                                    <Component
                                        onTransform={(transformFn) => handleTransformationUpdate(index, transformFn)}/>
                                    <IconButton sx={{marginLeft: 'auto'}} aria-label="delete"
                                                onClick={() => deleteFunction(index)}>
                                        <Clear/>
                                    </IconButton>
                                </Box>)
                            )}
                        </Box>
                        <Box>
                            <TextField
                                id="output-data"
                                label="Output Data"
                                fullWidth
                                multiline
                                minRows={4}
                                value={outputData}
                                // error={error}
                                // helperText={helperText}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "8px 8px 0 0",
                                    },
                                }}
                            />
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{borderTopLeftRadius: 0, borderTopRightRadius: 0, bt: 0}}
                                onClick={() => setInputData(outputData)}
                                startIcon={<ArrowUpward/>}
                            >
                                To input
                            </Button>
                        </Box>
                    </Grid2>
                    <Grid2 size={{sm: 2, xs: 4}}>
                        {availableTransformations.map(({name, component}, index) => (
                            <Button key={index} variant="outlined" size="small" fullWidth
                                    sx={{mb: 1, textTransform: 'none'}}
                                    onClick={() => handleAddTransformation(component)}
                            >{name}</Button>
                        ))}
                    </Grid2>
                </Grid2>
            </CardContent>
        </Card>
    );
}
