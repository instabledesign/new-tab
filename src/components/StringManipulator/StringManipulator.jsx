import {useState, useEffect, useCallback} from "react";
import {
    TextField,
    Box,
    Button, Switch, IconButton,
    Grid2,
    Alert,
} from "@mui/material";
import {
    ArrowUpward,
    Clear,
} from "@mui/icons-material";
import TransformationsToolbar from "./TransformationsToolbar.jsx";
import useLocalStorage from "../useLocalStorage.jsx";

export default function StringManipulator() {
    const [inputData, setInputData] = useLocalStorage('StringManipulator-input', '');
    const [outputData, setOutputData] = useState('');

    const [transformations, setTransformations] = useState([]);
    const [steps, setSteps] = useState([]);

    const reduceTransformations = (...transformers) => (input) => {
        const steps = [];

        const result = transformers.reduce((acc, transformer, index, arr) => {
            const step = {step: index + 1, input: acc}
            if (!transformer.enabled) {
                steps.push(step);
                return acc;
            }
            try {
                step.result = Array.isArray(acc) && !transformer.transformFn.acceptsArray ? acc.map(transformer.transformFn) : transformer.transformFn(acc);
            } catch (e) {
                step.error = e;
                arr.splice(1);
                console.log("error occured", e);
                steps.push(step);
                return acc;
            }
            steps.push(step);
            return step.result;
        }, input);

        return {result, steps};
    };

    const applyTransformations = useCallback(reduceTransformations(...transformations), [inputData, transformations]);

    const handleAddTransformation = (Component) => {
        setTransformations([...transformations, {enabled: true, Component, transformFn: (text) => text}]);
    };

    const handleTransformationUpdate = useCallback((index, transformFn) => {
        setTransformations((prevTransformations) => {
            const updatedTransformations = [...prevTransformations];
            updatedTransformations[index] = {...updatedTransformations[index], transformFn};
            return updatedTransformations;
        });
    }, []);

    const toggleEnable = (index) => {
        setTransformations((prev) => prev.map((item, i) => (i === index ? {...item, enabled: !item.enabled} : item)));
    };

    const deleteFunction = (index) => {
        setTransformations((prev) => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const {result, steps} = applyTransformations(inputData);
        setSteps(steps);
        setOutputData(result);
        console.log(result, steps);
    }, [inputData, applyTransformations]);

    return (
        <Grid2 container spacing={1}>
            <Grid2 size={12}>
                <TransformationsToolbar handleAddTransformation={handleAddTransformation}/>
            </Grid2>
            <Grid2 size={12}>
                <TextField
                    name="input-data"
                    label="Input Data"
                    required
                    fullWidth
                    multiline
                    minRows={4}
                    value={inputData}
                    onChange={event => setInputData(event.target.value)}
                    sx={{mb: 1}}
                />
                <Box sx={{display: "flex", flexDirection: "column", gap: 1, mb: 1}}>
                    {transformations.map(({Component, enabled, error}, index) => (
                            <Box key={index}
                                 sx={{
                                     border: "1px solid lightgray",
                                     borderColor: steps[index] && steps[index].error ? 'red' : enabled ? 'blue' : 'lightgray',
                                     opacity: enabled ? '100%' : '50%',
                                     borderRadius: "4px",
                                 }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    gap: 1,
                                    padding: 1,
                                }}>
                                    <Switch onChange={() => toggleEnable(index)} checked={enabled}/>
                                    <Component
                                        onTransform={(transformFn) => handleTransformationUpdate(index, transformFn)}/>
                                    <IconButton sx={{marginLeft: 'auto'}} aria-label="delete"
                                                onClick={() => deleteFunction(index)}>
                                        <Clear/>
                                    </IconButton>
                                </Box>
                                {steps[index] && steps[index].error &&
                                    <Alert severity="error">{steps[index].error.toString()}</Alert>
                                }
                            </Box>
                        )
                    )}
                </Box>
                <Box>
                    <TextField
                        id="output-data"
                        label="Output Data"
                        fullWidth
                        multiline
                        minRows={4}
                        value={outputData}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px 8px 0 0",
                            },
                        }}
                    />
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{borderTopLeftRadius: 0, borderTopRightRadius: 0, bt: 0}}
                        onClick={() => setInputData(outputData)}
                        startIcon={<ArrowUpward/>}
                    >
                        To input
                    </Button>
                </Box>
            </Grid2>
        </Grid2>
    );
}
