import React from "react";
import Svg, { Path } from "react-native-svg";

const BoxStacked = (props) => {
    return (
        <Svg viewBox="255 381 32 32" height={props.size} width={props.size}>
            <Path fill={props.color} d="M263.9 385.4c0-1.5 1.2-2.7 2.7-2.7h2.7v4.4c0 .5.4.9.9.9h1.8c.5 0 .9-.4.9-.9v-4.4h2.7c1.5 0 2.7 1.2 2.7 2.7v7.1c0 1.5-1.2 2.7-2.7 2.7h-8.9c-1.5 0-2.7-1.2-2.7-2.7v-7.1zm-3.6 13.4v4.4c0 .5.4.9.9.9h1.8c.5 0 .9-.4.9-.9v-4.4h2.7c1.5 0 2.7 1.2 2.7 2.7v7.1c0 1.5-1.2 2.7-2.7 2.7h-8.9c-1.5 0-2.7-1.2-2.7-2.7v-7.1c0-1.5 1.2-2.7 2.7-2.7h2.6zm17.8 0v4.4c0 .5.4.9.9.9h1.8c.5 0 .9-.4.9-.9v-4.4h2.7c1.5 0 2.7 1.2 2.7 2.7v7.1c0 1.5-1.2 2.7-2.7 2.7h-8.9c-1.5 0-2.7-1.2-2.7-2.7v-7.1c0-1.5 1.2-2.7 2.7-2.7h2.6z"></Path>
        </Svg>
    );
}

export default BoxStacked;
