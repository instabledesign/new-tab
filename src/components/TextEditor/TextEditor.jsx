import * as monaco from "monaco-editor";
import {Editor, loader} from "@monaco-editor/react";
import {useEffect, useRef, useState} from "react";
import hljs from 'highlight.js';
import {Box, Button, MenuItem, Select} from "@mui/material";
import themeList from "monaco-themes/themes/themelist.json";
import useLocalStorage from "../useLocalStorage.jsx";

loader.config({monaco});

export default function TextEditor() {
    const [code, setCode] = useLocalStorage('TextEditor-code', '<?php echo "Hello, World!";');
    const [language, setLanguage] = useLocalStorage('TextEditor-language', 'auto-detect');
    const [theme, setTheme] = useLocalStorage('TextEditor-theme', 'vs-dark');
    const editorRef = useRef(null);

    const loadTheme = (theme) => fetch(`assets/monaco-themes/themes/${themeList[theme]}.json`).then(res => {
        return res.json();
    });

    // Apply the selected theme
    useEffect(() => {
        if (theme !== "vs" && theme !== "vs-dark" && theme !== "hc-black") {
            // Load the selected theme
            loadTheme(theme).then((themeData) => {
                monaco.editor.defineTheme(theme, themeData);
                monaco.editor.setTheme(theme);
            });
        } else {
            // Use built-in Monaco themes
            monaco.editor.setTheme(theme);
        }
    }, [theme]);

    const autoDetect = (code, defaultValue = 'plaintext') => {
        return hljs.highlightAuto(code).language || defaultValue;
    }

    useEffect(() => {
        editorRef && editorRef.current && console.log(editorRef.current.getAction('editor.action.formatDocument'));
        if (language !== "auto-detect") {
            return;
        }
        const timeout = setTimeout(() => {
            const newLanguage = autoDetect(code, null);
            if (newLanguage !== null && newLanguage !== language) {
                const model = editorRef.current.getModel();
                monaco.editor.setModelLanguage(model, newLanguage);
            }
        }, 2000);

        return () => clearTimeout(timeout);
    }, [code]);

    useEffect(() => {
        let newLanguage = language;
        if (newLanguage === 'auto-detect') {
            newLanguage = autoDetect(code, 'plaintext');
        }

        if (editorRef.current) {
            const model = editorRef.current.getModel();
            monaco.editor.setModelLanguage(model, newLanguage);
        }
    }, [language]);

    const onMountEditor = (editor, monaco) => {
        editorRef.current = editor;
    }

    return (
        <Box>
            <Select size="small"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
            >
                <MenuItem value="auto-detect">Auto detect</MenuItem>
                {monaco.languages.getLanguages().map(({id}, index) => (
                    <MenuItem key={index} value={id}>{id}</MenuItem>
                ))}
            </Select>
            <Select size="small"
                    value={theme}
                    onChange={e => setTheme(e.target.value)}
            >
                <MenuItem value="vs">vs (Light)</MenuItem>
                <MenuItem value="vs-dark">vs-dark (Dark)</MenuItem>
                <MenuItem value="hc-black">hc-black (High Contract)</MenuItem>
                {Object.keys(themeList).map((themeName) => (
                    <MenuItem key={themeName} value={themeName}>{themeName}</MenuItem>
                ))}
            </Select>
            <Editor
                height="500px"
                defaultLanguage="php"
                defaultValue="<?php // Start coding here!"
                value={code}
                onChange={v => setCode(v)}
                onMount={onMountEditor}
                options={{
                    multiCursorModifier: 'ctrlCmd', // Enables multi-cursor with Ctrl/Cmd
                }}
            />
        </Box>
    );
}
