import React from "react";
import Svg, { Path } from "react-native-svg";

const Check = (props) => {
    return (
        <Svg viewBox="424 0 24 24" width={props.size} height={props.size}>
            <Path fill={props.color} d="M447.5 3.9c.7.7.7 1.8 0 2.4L433.8 20c-.7.7-1.8.7-2.4 0l-6.9-6.9c-.7-.7-.7-1.8 0-2.4.7-.7 1.8-.7 2.4 0l5.6 5.6 12.6-12.5c.6-.5 1.7-.5 2.4.1z"></Path>
        </Svg>
    );
}

export default Check;
