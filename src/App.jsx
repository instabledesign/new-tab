import {Grid2} from "@mui/material";
import {StringManipulator} from "./components/StringManipulator";

function App() {
    return (
        <>
            <Grid2 container spacing={0}>
                <Grid2 size={12}>
                    <StringManipulator/>
                </Grid2>
            </Grid2>
        </>
    )
}

export default App
