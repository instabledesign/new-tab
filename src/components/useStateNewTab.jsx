import {useStateFromLocalStorageBuilder, useStateLocalStorageLimitedArrayBuilder} from "./useStateFromLocalStorage.jsx";

export const [useStateFromNewTabConfig, getNewTabConfig, setNewTabConfig] = useStateFromLocalStorageBuilder("newtab_config");

export const [useStateFromNewTabHistory, getNewTabHistory, setNewTabHistory] = useStateFromLocalStorageBuilder("newtab_history");

export const useStateFromNewTabHistoryLimitedArray = useStateLocalStorageLimitedArrayBuilder(useStateFromNewTabHistory);
