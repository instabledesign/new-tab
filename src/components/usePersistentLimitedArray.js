import useLocalStorage from "./useLocalStorage";
import useLimitedArray from "./useLimitedArray";
import {useEffect} from "react";

export default function usePersistentLimitedArray(key, initialArray = [], limit = Infinity) {
    const [storedArray, setStoredArray] = useLocalStorage(key, initialArray);
    const {array, addElement, removeElement, clearArray} = useLimitedArray(storedArray, limit);

    // Sync changes in the limited array back to local storage
    useEffect(() => {
        setStoredArray(array);
    }, [array, setStoredArray]);

    return [array, addElement, removeElement, clearArray];
}
