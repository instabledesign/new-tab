import {Card, CardContent, Grid2, Typography} from "@mui/material";
import {Editor} from "@monaco-editor/react";
import {getNewTabConfig, getNewTabHistory, setNewTabConfig} from "../components/useStateNewTab.jsx";

export default function Settings() {
    const updateConfig = (v) => {
        try {
            const newCfg = JSON.parse(v);
            console.log(newCfg);
            setNewTabConfig(newCfg);
        } catch (e) {
            console.error("aaa", e)
        }
    }
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h4">New tab configuration</Typography>
                        <Editor
                            height="500px"
                            defaultLanguage="json"
                            onChange={updateConfig}
                            value={JSON.stringify(getNewTabConfig(), null, 4)}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="h4">New tab history</Typography>
                        <Editor
                            height="500px"
                            defaultLanguage="json"
                            // onChange={updateConfig}
                            value={JSON.stringify(getNewTabHistory(), null, 4)}
                        />
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    );
}
