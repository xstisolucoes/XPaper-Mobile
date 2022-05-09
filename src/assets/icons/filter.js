import React from "react";
import Svg, { Path } from "react-native-svg";

const Filter = (props) => {
    return (
        <Svg viewBox="-61 385 24 24" width={props.size} height={props.size}>
            <Path fill={props.color} d="M-60.8 387.6c.3-.7 1-1.1 1.7-1.1h20.3c.7 0 1.4.4 1.7 1.1.3.7.2 1.4-.3 2L-46 400v6c0 .6-.3 1.1-.8 1.3-.5.3-1.1.2-1.6-.1l-3-2.3c-.4-.3-.6-.7-.6-1.2V400l-8.6-10.5c-.4-.5-.5-1.3-.2-1.9z"></Path>
        </Svg>
    );
}

export default Filter;
