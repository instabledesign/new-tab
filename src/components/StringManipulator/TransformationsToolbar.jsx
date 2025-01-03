import {Box, Button, Divider, Tooltip} from "@mui/material";
import SingleFieldTransformer from "./SingleFieldTransformer.jsx";
import {
    base64Decode,
    base64Encode,
    camelCase, dotCase, join,
    kebabCase, l33tFilter, pascalCase,
    prefix,
    snakeCase, split,
    suffix,
    wrap,
} from "./string-functions.jsx";
import md5 from "crypto-js/md5.js";
import sha1 from "crypto-js/sha1.js";
import sha3 from "crypto-js/sha3.js";
import sha224 from "crypto-js/sha224.js";
import sha256 from "crypto-js/sha256.js";
import sha384 from "crypto-js/sha384.js";
import sha512 from "crypto-js/sha512.js";
import SimpleTransformer from "./SimpleTransformer.jsx";
import ReplaceTransformer from "./ReplaceTransformer.jsx";
import LowercaseTransformer from "./LowercaseTransformer.jsx";
import UppercaseTransformer from "./UppercaseTransformer.jsx";
import WrapInTagsTransformer from "./WrapInTagsTransformer.jsx";


// @TODO implement hmacSha1 ,hmacSha3 ,hmacSha224 ,hmacSha256 ,hmacSha384 ,hmacSha512

export default function TransformationsToolbar({handleAddTransformation}) {
    return (
        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            '& > button': {
                textTransform: 'none',
            },
        }}>
            <Tooltip title="Add prefix">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SingleFieldTransformer name="prefix"
                                                                                                transformFn={prefix} {...props}/>)}>
                    ..T
                </Button>
            </Tooltip>
            <Tooltip title="Add suffix">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SingleFieldTransformer name="suffix"
                                                                                                transformFn={suffix} {...props}/>)}>
                    T..
                </Button>
            </Tooltip>
            <Tooltip title="Wrap with text">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SingleFieldTransformer name="wrap"
                                                                                                transformFn={wrap} {...props}/>)}>
                    ..T..
                </Button>
            </Tooltip>
            <Tooltip title="Wrap with tag">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <WrapInTagsTransformer {...props}/>)}>
                    &lt;T&gt;
                </Button>
            </Tooltip>

            <Divider orientation="vertical" flexItem/>

            <Tooltip title="lowercase">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <LowercaseTransformer {...props}/>)}>
                    T&gt;t
                </Button>
            </Tooltip>
            <Tooltip title="UPPERCASE">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <UppercaseTransformer {...props}/>)}>
                    t&gt;T
                </Button>
            </Tooltip>
            <Tooltip title="camelCase">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name="camelCase"
                                                                                           transformFn={camelCase} {...props}/>)}>
                    cCc
                </Button>
            </Tooltip>
            <Tooltip title="snake_case">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name="snake_case"
                                                                                           transformFn={snakeCase} {...props}/>)}>
                    a_a
                </Button>
            </Tooltip>
            <Tooltip title="kebab-case">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name="kebab-case"
                                                                                           transformFn={kebabCase} {...props}/>)}>
                    a-a
                </Button>
            </Tooltip>
            <Tooltip title="pascalCase">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name="PascalCase"
                                                                                           transformFn={pascalCase} {...props}/>)}>
                    Aa
                </Button>
            </Tooltip>
            <Tooltip title="dot.case">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name="dot.case"
                                                                                           transformFn={dotCase} {...props}/>)}>
                    a.a
                </Button>
            </Tooltip>


            <Divider orientation="vertical" flexItem/>

            <Tooltip title="l33Filter">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name="l33t"
                                                                                           transformFn={l33tFilter} {...props}/>)}>
                    l33t
                </Button>
            </Tooltip>


            <Tooltip title="Replace">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <ReplaceTransformer {...props}/>)}>
                    Replace
                </Button>
            </Tooltip>

            <Tooltip title="Split">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SingleFieldTransformer name='split'
                                                                                                transformFn={split} {...props}/>)}>
                    Split
                </Button>
            </Tooltip>

            <Tooltip title="Join">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SingleFieldTransformer name='join'
                                                                                                transformFn={join} {...props}/>)}>
                    Join
                </Button>
            </Tooltip>

            <Tooltip title="base64 encode">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name='base64 encode'
                                                                                           transformFn={base64Encode} {...props}/>)}>
                    base64 encode
                </Button>
            </Tooltip>
            <Tooltip title="base64 decode">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name='base64 decode'
                                                                                           transformFn={base64Decode} {...props}/>)}>
                    base64 decode
                </Button>
            </Tooltip>
            <Tooltip title="md5">
                <Button variant="outlined" onClick={() => handleAddTransformation(props => <SimpleTransformer name='md5'
                                                                                                              transformFn={md5} {...props}/>)}>
                    md5
                </Button>
            </Tooltip>
            <Tooltip title="sha1">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name='sha1'
                                                                                           transformFn={sha1} {...props}/>)}>
                    sha1
                </Button>
            </Tooltip>
            <Tooltip title="sha3">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name='sha3'
                                                                                           transformFn={sha3} {...props}/>)}>
                    sha3
                </Button>
            </Tooltip>
            <Tooltip title="sha224">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name='sha224'
                                                                                           transformFn={sha224} {...props}/>)}>
                    sha224
                </Button>
            </Tooltip>
            <Tooltip title="sha256">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name='sha256'
                                                                                           transformFn={sha256} {...props}/>)}>
                    sha256
                </Button>
            </Tooltip>
            <Tooltip title="sha384">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name='sha384'
                                                                                           transformFn={sha384} {...props}/>)}>
                    sha384
                </Button>
            </Tooltip>
            <Tooltip title="sha512">
                <Button variant="outlined"
                        onClick={() => handleAddTransformation(props => <SimpleTransformer name='sha512'
                                                                                           transformFn={sha512} {...props}/>)}>
                    sha512
                </Button>
            </Tooltip>
        </Box>
    );
}
