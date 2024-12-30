import {Card, CardContent, Grid2} from "@mui/material";
import {StringManipulator} from "./components/StringManipulator";
// import PhpExecutor from "./components/PhpExecutor/PhpExecutor.jsx";
import TextEditor from "./components/TextEditor/TextEditor.jsx";
import ColorTool from "./components/ColorTool/ColorTool.jsx";

function App() {
    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 size={6}>
                    <Card raised>
                        <CardContent>
                            <StringManipulator/>
                        </CardContent>
                    </Card>
                </Grid2>
                {/*<Grid2 size={6}>*/}
                {/*    <Card raised>*/}
                {/*        <CardContent>*/}
                {/*    <PhpExecutor/>*/}
                {/*        </CardContent>*/}
                {/*    </Card>*/}
                {/*</Grid2>*/}
                <Grid2 size={6}>
                    <Card raised>
                        <CardContent>
                            <ColorTool/>
                        </CardContent>
                    </Card>
                </Grid2>
                <Grid2 size={12}>
                    <Card raised>
                        <CardContent>
                            <TextEditor/>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </>
    )
}

export default App
