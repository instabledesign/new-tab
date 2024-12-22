import {useState, useEffect} from "react";
import {TextField} from "@mui/material";

export default function WrapInTagsTransformer({onTransform}) {
    const [tag, setTag] = useState('');

    // . @ [ ] { }
    // tagName.aaa,bbb          <tagName class="aaa bbb">data</tagName>
    // tagName#name             <tagName id="name">data</tagName>
    // tagName{attrName:value}  <tagName attrName="value">data</tagName>
    // tagName>childName  <tagName><childName>data</childName></tagName>
    // console.log(generateHtml('div.aaa,bbb#unique{style:color:red}>span'));

    function generateHtml(pattern) {
        return function (data) {
            if (pattern === '') {
                return data;
            }
            const regex = /([a-zA-Z0-9]+)(\.([a-zA-Z0-9\s\-]+))?(#([a-zA-Z0-9\-]+))?(\{([a-zA-Z0-9\-]+:[a-zA-Z0-9\s\-]+)\})?(\>([a-zA-Z0-9]+))?/;

            const match = pattern.match(regex);
            console.log("MATCH", match);
            if (!match) {
                throw new Error('Invalid pattern format');
            }

            const tagName = match[1];  // The tag name (e.g., div, p, etc.)
            const classNames = match[3];  // The classes (optional)
            const idName = match[5];  // The id (optional)
            const attrString = match[7];  // The attributes (optional)
            const childName = match[9];  // The child tag name (optional)

            let result = `<${tagName}`;

            // Add class if available
            if (classNames) {
                result += ` class="${classNames}"`;
            }

            // Add id if available
            if (idName) {
                result += ` id="${idName}"`;
            }

            // Add custom attributes if available
            if (attrString) {
                const attrs = attrString.split(',').map(attr => {
                    const [attrName, value] = attr.split(':');
                    return `${attrName}="${value}"`;
                }).join(' ');

                result += ` ${attrs}`;
            }

            result += `>`;

            // Add child element if available
            if (!childName) {
                result += data
            } else {
                result += `<${childName}>${data}</${childName}>`;
            }

            result += `</${tagName}>`;

            return result;
        }
    }

    const wrapInTagsTransform = str => {
        return generateHtml(tag)(str);
    };

    useEffect(() => {
        onTransform(wrapInTagsTransform);
    }, [tag]);

    return (
        <>
            Wrap with html tag
            <TextField
                size='small'
                value={tag}
                onChange={(event) => setTag(event.target.value)}
            />
        </>
    );
}
