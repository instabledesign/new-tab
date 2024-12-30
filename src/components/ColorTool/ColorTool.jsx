import {
    Box, Button,
    Card, CardContent,
    Grid2, IconButton, Tooltip,
} from "@mui/material";
import {ColorPicker, useColor} from "react-color-palette";
import "react-color-palette/css";
import usePersistentLimitedArray from "../usePersistentLimitedArray.js";
import {DeleteForever} from "@mui/icons-material";

//https://d3-graph-gallery.com/graph/custom_color.html
export default function ColorTool({startColor = "last", historyLength = 0}) {
    if (!historyLength || historyLength <= 0) {
        historyLength = 10;
    }

    const [colorHistory, addColorHistory, removeColorHistory, clearColorHistory] = usePersistentLimitedArray('ColorTool-history', [], historyLength);

    const [color, setColor] = useColor(undefined !== colorHistory[0] ? colorHistory[0].hex : "#ffffff");

    const onChangeComplete = value => {
        if (undefined !== colorHistory[0] && colorHistory[0].hex === value.hex) {
            return;
        }

        addColorHistory(value);
    };

    const onClearColorHistory = () => {
        const c = color;
        clearColorHistory();
        if (c && colorHistory.length > 1) {
            addColorHistory(c);
        }
    };

    return (
        <Grid2 container>
            <Grid2 size={12}>
                <Box sx={{mb: 1}}>
                    <ColorPicker color={color} onChange={setColor} onChangeComplete={onChangeComplete}/>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                }}>
                    {colorHistory.length > 0 &&
                        <IconButton color="primary" aria-label="clear color history"
                                    onClick={onClearColorHistory}>
                            <DeleteForever/>
                        </IconButton>
                    }
                    {colorHistory.map((c, i) => (
                        <Tooltip key={i} title={`${c.hex}`}>
                            <Button variant="outlined" onClick={() => setColor(c)} sx={{
                                backgroundColor: c.hex,
                                width: "20px",
                                height: "40px",
                                borderRadius: "8px",
                            }}></Button>
                        </Tooltip>
                    ))}
                </Box>
            </Grid2>
        </Grid2>
    );
}
