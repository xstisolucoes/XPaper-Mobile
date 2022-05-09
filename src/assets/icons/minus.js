import React from "react";
import Svg, { Path } from "react-native-svg";

const Minus = (props) => {
    return (
        <Svg viewBox="420 -4 32 32" width={props.size} height={props.size}>
            <Path fill={props.color} d="M449.5 14.5h-27.1c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5h27.1c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5z"></Path>
        </Svg>
    );
}

export default Minus;
