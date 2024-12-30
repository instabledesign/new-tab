import {
    Box,
    Card, CardContent, CardHeader,
    Grid2,
} from "@mui/material";
import {useEffect, useState} from "react";
import * as monaco from "monaco-editor";
import {Editor, loader} from "@monaco-editor/react";
import {PhpWeb} from 'php-wasm/PhpWeb.mjs';

loader.config({monaco});


export default function PhpExecutor() {
    const [phpInstance, setPhpInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState('');
    const [code, setCode] = useState('<?php echo "Hello, World!";');

    let buffer = [];

    useEffect(() => {
        const initializePhp = async () => {
            console.log('initializePhp');
            try {
                setLoading(true);
                const php = await new PhpWeb();
                php.addEventListener('output', (event) => {
                    // console.log(event.detail);
                    buffer.push(event.detail);
                    console.log(buffer.length);
                });
                php.addEventListener('error', (event) => {
                    console.log(event.detail);
                    // setOutput()
                });
                setPhpInstance(php);
            } catch (error) {
                console.error('Error initializing PHP-Wasm:', error);
            } finally {
                setLoading(false);
            }
        };

        initializePhp();
    }, []);

    const runPhpCode = async () => {
        if (!phpInstance) return;
        try {
            buffer = [];
            const result = await phpInstance.run(code);
            console.log(result, buffer);
        } catch (error) {
            console.error('Error running PHP code:', error);
            setOutput('An error occurred.');
        }
    };

    return (
        <>
            {loading ? (
                <Box>
                    <p>Loading PHP-Wasm...</p>
                    <div className="loader"></div>
                </Box>
            ) : (
                <Grid2 container spacing={1}>
                    <Grid2 size={6}>
                        <button onClick={runPhpCode}>Run PHP Code</button>
                        <Box>
                            <Editor
                                height="500px"
                                defaultLanguage="php"
                                defaultValue="<?php // Start coding here!"
                                value={code}
                                onChange={(value, event) => setCode(value)}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={6}>
                        <Box sx={{border: "1px solid black"}}>
                            <iframe srcDoc={output} style={{border: 0}}/>
                        </Box>
                    </Grid2>
                </Grid2>
            )}
        </>
    );
}
