import {useState} from "react";

export function X () {
    const [state, setState] = useState({});
    setState(prevState => {
        // Object.assign również zadziała
        return {...prevState, ...updatedValues};
    });
}
