import {Card, CardContent, Grid2} from "@mui/material";
import {StringManipulator} from "../components/StringManipulator/index.js";
import ColorTool from "../components/ColorTool/ColorTool.jsx";
import TextEditor from "../components/TextEditor/TextEditor.jsx";

export default function Tools() {
    return (
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
    );
}
