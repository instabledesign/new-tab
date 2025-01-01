# NewTab

This chrome extension replace the chrome newtab page with some developer utilities

> [!Note]
> ### 🚧🚧🚧 Work in progress 🚧🚧🚧

![screenshot.png](screenshot.png?raw=true)

## Installation

> [!NOTE]
> No release is out so to use this extension you should install it manually

1. Clone the repo or download as Zip
2. Install dependencies
    ```shell
    $ npm install
    ```
3. Build
    ```shell
    $ npm run build
    ```
4. Install extension in your Chrome/firefox browser

## String manipulator Tool [🔗 Source](/src/components/StringManipulator/string-functions.jsx#L22)

String manipulator allow you to apply a chain of string function to alter/compose the input data you put in

String functions: 

- `prefix`, `suffix`, `wrap`, `wrapInTags`
- `lowercase`, `UPPERCASE`, `camelCase`, `snake_case`, `kebab-case`, `PascalCase`, `dot.case`
- `l33t`
- `replace`, `split`,`join`
- `base64 encode`, `base64 decode`
- `md5`, `sha1`, `sha3`, `sha224`, `sha256`, `sha384`, `sha512`

## Color picker Tool [🔗 Source](/src/components/ColorTool/ColorTool.jsx)

Just a simple color picker with history.

## Text editor Tool [🔗 Source](/src/components/TextEditor/TextEditor.jsx)

A text editor powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/)
