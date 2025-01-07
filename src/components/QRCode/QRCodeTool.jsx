import useLocalStorage from "../useLocalStorage.jsx";
import {useEffect, useRef, useState} from "react";
import {
    Alert,
    Box, FormControl, FormControlLabel,
    Grid2, InputLabel,
    MenuItem, Paper,
    Select,
    Slider, Stack, styled,
    TextField,
} from "@mui/material";
import QRCodeLib from "qrcode";
import QRCode from "./QRCode.jsx";

export default function QRCodeTool() {
    const [inputData, setInputData] = useLocalStorage('QRCode-input', '👋');
    const [QRCodeOptions, setQRCodeOptions] = useLocalStorage('QRCode-options', {
        margin: 1,
        errorCorrectionLevel: 'M',
        color: {
            dark: "#000000",
            light: "#FFFFFF"
        },
        maskPattern: 0,
        scale: 4,
    });

    const [QRCodeError, setQRCodeError] = useState(null);

    const updateQRCodeOptionsField = (field) => (e) => {
        setQRCodeOptions((prevState) => ({
            ...prevState,
            [field]: e.target.value,
        }))
    };

    return (
        <Grid2 container spacing={1}>
            <Grid2 size={12}>
                {QRCodeError && <Alert severity="error" sx={{mb: 2}}>{QRCodeError.toString()}</Alert>}
                <TextField
                    error={!!QRCodeError}
                    label="Data / URL / Phone number"
                    required
                    fullWidth
                    multiline
                    minRows={4}
                    value={inputData}
                    onChange={event => setInputData(event.target.value)}
                    sx={{mb: 2}}
                />
                <Stack
                    spacing={2}
                    direction="row"
                    useFlexGap
                    sx={{flexWrap: 'wrap'}}
                >
                    <Box sx={{flexGrow: 1}}>
                        <Box sx={{mb: 1}}>
                            <InputLabel>Correction level :</InputLabel>
                            <Select size="small"
                                    value={QRCodeOptions.errorCorrectionLevel}
                                    onChange={updateQRCodeOptionsField('errorCorrectionLevel')}
                            >
                                <MenuItem value="L">Low ~7%</MenuItem>
                                <MenuItem value="M">Medium ~15%</MenuItem>
                                <MenuItem value="Q">Quartile ~25%</MenuItem>
                                <MenuItem value="H">High ~30%</MenuItem>
                            </Select>
                        </Box>
                        <Box sx={{mb: 1}}>
                            <InputLabel>Margin :</InputLabel>
                            <Slider size="small"
                                    marks
                                    value={QRCodeOptions.margin}
                                    min={0}
                                    max={20}
                                    valueLabelDisplay="auto"
                                    onChange={updateQRCodeOptionsField('margin')}
                            />
                        </Box>
                        <Box sx={{mb: 1}}>
                            <InputLabel>Mask pattern :</InputLabel>
                            <Slider size="small"
                                    marks
                                    value={QRCodeOptions.maskPattern}
                                    min={0}
                                    max={7}
                                    valueLabelDisplay="auto"
                                    onChange={updateQRCodeOptionsField('maskPattern')}
                            />
                        </Box>
                        <Box sx={{mb: 1}}>
                            <InputLabel>Scale :</InputLabel>
                            <Slider size="small"
                                    marks
                                    value={QRCodeOptions.scale}
                                    min={1}
                                    max={20}
                                    valueLabelDisplay="auto"
                                    onChange={updateQRCodeOptionsField('scale')}
                            />
                        </Box>
                    </Box>
                    <Box sx={{alignContent: 'center', justifyContent: 'center'}}>
                        <QRCode inputData={inputData} QRCodeOptions={QRCodeOptions} onError={setQRCodeError} />
                    </Box>
                </Stack>
            </Grid2>
        </Grid2>
    );
}
