import {useState, useEffect} from "react";
import useLimitedArray from "./useLimitedArray.jsx";

// Helper function to get a nested value from an object using a path
function getValueByPath(obj, path) {
    return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

// Helper function to set a nested value in an object using a path
function setValueByPath(obj, path, value) {
    const keys = path.split(".");
    keys.reduce((acc, key, index) => {
        if (index === keys.length - 1) {
            acc[key] = value; // Set the value at the final key
        } else {
            acc[key] = acc[key] || {}; // Ensure the intermediate key exists
        }
        return acc[key];
    }, obj);
}

export function useStateFromLocalStorageBuilder(rootKey) {
    return [
        (path, initialValue) => {
            const [value, setValue] = useState(() => {
                const saved = localStorage.getItem(rootKey);
                const rootObject = saved ? JSON.parse(saved) : {};
                const nestedValue = getValueByPath(rootObject, path);
                return nestedValue !== undefined ? nestedValue : initialValue;
            });

            useEffect(() => {
                const saved = localStorage.getItem(rootKey);
                const rootObject = saved ? JSON.parse(saved) : {};

                setValueByPath(rootObject, path, value); // Update the nested value
                localStorage.setItem(rootKey, JSON.stringify(rootObject));
            }, [path, value]);

            return [value, setValue];
        },
        () => {
            const saved = localStorage.getItem(rootKey);
            return saved ? JSON.parse(saved) : {}; // Return the parsed object or an empty one
        },
        (newConfig) => {
            localStorage.setItem(rootKey, JSON.stringify(newConfig));
        }
    ]
}

export function useStateLocalStorageLimitedArrayBuilder(useStateLocalStorage) {
    return (key, initialArray = [], limit = Infinity) => {
        const [storedArray, setStoredArray] = useStateLocalStorage(key, initialArray);
        const {array, addElement, removeElement, clearArray} = useLimitedArray(storedArray, limit);

        // Sync changes in the limited array back to local storage
        useEffect(() => {
            setStoredArray(array);
        }, [array, setStoredArray]);

        return [array, addElement, removeElement, clearArray];
    }
}

