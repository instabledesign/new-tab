import {useState} from "react";

export default function useLimitedArray(initialArray = [], limit = Infinity) {
    const [array, setArray] = useState(initialArray.slice(0, limit));

    const addElement = (element) => {
        setArray((prev) => [element, ...prev.slice(0, limit - 1)]);
    };

    const removeElement = (index) => {
        setArray((prev) => prev.filter((_, i) => i !== index));
    };

    const clearArray = () => {
        setArray([]);
    };

    return {array, addElement, removeElement, clearArray};
};
