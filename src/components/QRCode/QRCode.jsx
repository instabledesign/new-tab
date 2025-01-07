import {useEffect, useRef, useState} from "react";
import QRCodeLib from "qrcode";
import {styled} from "@mui/material";

export default function QRCode({inputData, QRCodeOptions, onError}) {
    const [QRCodeError, setQRCodeError] = useState(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        setQRCodeError(null)
        if (inputData) {
            QRCodeLib.toCanvas(
                canvasRef.current,
                inputData,
                QRCodeOptions,
            ).catch(err => {
                setQRCodeError(err)
                onError && onError(err);
            })
        }
    }, [inputData, QRCodeOptions, onError]);

    const StyledCanvas = styled("canvas")(({ theme }) => ({
        border: QRCodeError ? `2px solid ${theme.palette.error.main}` : "none",
        borderRadius: theme.shape.borderRadius,
        boxShadow: QRCodeError
            ? `0px 0px 5px ${theme.palette.error.main}`
            : theme.shadows[1],
        margin: theme.spacing(2),
    }));

    return (
        <StyledCanvas ref={canvasRef}/>
    );
}
