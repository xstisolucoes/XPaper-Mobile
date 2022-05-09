import React from "react";
import Svg, { Path } from "react-native-svg";

const Icon = (props) => {
    return (
        <Svg viewBox="622 6 12 12" width={props.size} height={props.size}>
            <Path fill={props.color} d="M628.9 7.2c.5 0 .9.4.9.9V9h1c.3 0 .6.1.8.4l1.4 1.4c.2.2.4.5.4.8v2.2c.3 0 .6.3.6.6s-.3.6-.6.6h-.6c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8h-2.4c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8h-.3c-.5 0-.9-.4-.9-.9v-6c0-.5.4-.9.9-.9h6zm.9 3V12h2.4v-.4l-1.4-1.4h-1zm-4.8 3.9c-.5 0-.9.4-.9.9s.4.9.9.9.9-.4.9-.9-.4-.9-.9-.9zm6 1.8c.5 0 .9-.4.9-.9s-.4-.9-.9-.9-.9.4-.9.9.4.9.9.9z"></Path>
        </Svg>
    );
}

export default Icon;
