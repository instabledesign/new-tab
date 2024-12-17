import {useEffect} from "react";

export default function SimpleTransformer({name, transformFn, onTransform}) {

    useEffect(() => {
        onTransform(transformFn);
    }, [transformFn]);

    return (
        <>{name}</>
    );
}
