import React from "react";
import Svg, { Path } from "react-native-svg";

const XMark = (props) => {
    return (
        <Svg viewBox="296 0 24 24" width={props.size} height={props.size}>
            <Path fill={props.color} d="M319.3 19.9c.9.9.9 2.5 0 3.4-.5.5-1.1.7-1.7.7-.6 0-1.2-.2-1.7-.7l-7.9-7.9-7.9 7.9c-.5.5-1.1.7-1.7.7s-1.2-.2-1.7-.7c-.9-.9-.9-2.5 0-3.4l7.9-7.9-7.9-7.9c-.9-.9-.9-2.5 0-3.4.9-.9 2.5-.9 3.4 0l7.9 7.9 7.9-7.9c.9-.9 2.5-.9 3.4 0 .9.9.9 2.5 0 3.4l-7.9 7.9 7.9 7.9z"></Path>
        </Svg>
    );
}

export default XMark;