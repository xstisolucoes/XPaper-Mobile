import React from "react";
import Svg, { Path } from "react-native-svg";

const Back = (props) => {
    return (
        <Svg viewBox="-61 385 24 24" width={props.size} height={props.size}>
            <Path fill={props.color} d="M-44 409c-.5 0-1-.2-1.4-.6l-10-10c-.8-.8-.8-2 0-2.8l10-10c.8-.8 2-.8 2.8 0s.8 2 0 2.8l-8.6 8.6 8.6 8.6c.8.8.8 2 0 2.8-.4.4-.9.6-1.4.6z"></Path>
        </Svg>
    );
}

export default Back;
