import {Card, CardContent, Grid2} from "@mui/material";
import StringManipulatorTool from "../components/StringManipulator/StringManipulatorTool.jsx";
import ColorTool from "../components/Color/ColorTool.jsx";
import TextEditorTool from "../components/TextEditor/TextEditorTool.jsx";
import QRCodeTool from "../components/QRCode/QRCodeTool.jsx";

export default function Tools() {
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={6}>
                <Card raised>
                    <CardContent>
                        <QRCodeTool/>
                    </CardContent>
                </Card>
            </Grid2>
            <Grid2 size={6}>
                <Card raised>
                    <CardContent>
                        <StringManipulatorTool/>
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
                        <TextEditorTool/>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    );
}
