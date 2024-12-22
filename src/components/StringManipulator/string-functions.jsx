const expectsArray = (fn) => {
    const fn2 = data => Array.isArray(data) ? fn(data) : data;
    fn2.acceptsArray = true;
    return fn2;
};

export const smartPipeFunctions = (...functions) => (input) => {
    const steps = [];
    const result = functions.reduce((acc, fn, index) => {
        // array map or execute function
        const stepResult = Array.isArray(acc) && !fn.acceptsArray ? acc.map(fn) : fn(acc);
        steps.push({step: index + 1, input: acc, result: stepResult});
        return stepResult;
    }, input);

    return {result, steps};
};

export const base64Encode = v => btoa(v);
export const base64Decode = v => atob(v);

export const suffix = s => str => str + s;
export const prefix = p => str => p + str;
export const wrap = w => str => w + str + w;
export const wrapInTags = tag => str => `<${tag}>${str}</${tag}>`;

export const replace = (search, replace) => str => str.replace(search, replace);

export const toUpperCase = str => str.toUpperCase();
export const toLowerCase = str => str.toLowerCase();
export const toLocaleUpperCase = str => str.toLocaleUpperCase();
export const toLocaleLowerCase = str => str.toLocaleLowerCase();

export const kebabCase = str => str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to kebab-case
    .replace(/\s+|_|\./g, '-')                // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9-]/g, '')      // Remove non-alphanumeric characters
    .toLowerCase();                     // Convert all letters to lowercase;

export const camelCase = str => str
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, group1) => group1.toUpperCase()) // Convert non-alphanumeric characters to uppercase
    .replace(/^([A-Z])/, (match, group1) => group1.toLowerCase());         // Ensure the first character is lowercase


export const pascalCase = str => str
    .replace(/[^a-zA-Z0-9]+(.)/g, (match, group1) => group1.toUpperCase()) // Convert non-alphanumeric characters to uppercase
    .replace(/^([a-zA-Z])/, (match, group1) => group1.toUpperCase());         // Ensure the first character is uppercase

export const snakeCase = str => str
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Convert camelCase or PascalCase to snake_case
    .replace(/\s+|-|\./g, '_')               // Replace spaces, -, . with underscores
    .replace(/[^a-zA-Z0-9_]/g, '')      // Remove non-alphanumeric characters
    .toLowerCase();                    // Convert all letters to lowercase

export const dotCase = str => str
    .replace(/([a-z])([A-Z])/g, '$1.$2') // Convert camelCase or PascalCase to dot.case
    .replace(/\s+|-|_/g, '.')            // Replace spaces with dots
    .replace(/[^a-zA-Z0-9.]/g, '')       // Remove non-alphanumeric characters except dots
    .toLowerCase();

const leetDict = {
    'a': '4', 'A': '4',
    'e': '3', 'E': '3',
    'l': '1', 'L': '1',
    't': '7', 'T': '7',
    'o': '0', 'O': '0',
    's': '$', 'S': '$',
    'g': '9', 'G': '9'
};

export const l33tFilter = str => str
    .split('').map(char => leetDict[char] || char).join('');

export const join = sep => expectsArray((arr) => arr.join(sep));
export const split = sep => str => str.split(sep);

