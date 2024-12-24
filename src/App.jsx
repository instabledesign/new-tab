import {Grid2} from "@mui/material";
import {StringManipulator} from "./components/StringManipulator";
import PhpExecutor from "./components/PhpExecutor/PhpExecutor.jsx";

function App() {
    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 size={12}>
                    <StringManipulator/>
                </Grid2>
                {/*<Grid2 size={12}>*/}
                {/*    <PhpExecutor/>*/}
                {/*</Grid2>*/}
            </Grid2>
        </>
    )
}

export default App
