import React from "react";
import Svg, { Path } from "react-native-svg";

const Trash = (props) => {
    return (
        <Svg viewBox="-289 381 32 32" width={props.size} height={props.size}>
            <Path fill={props.color} d="M-278.5 382.1c.3-.7 1-1.1 1.8-1.1h7.5c.8 0 1.4.4 1.8 1.1l.5.9h6c1.1 0 2 .9 2 2s-.9 2-2 2h-24c-1.1 0-2-.9-2-2s.9-2 2-2h6l.4-.9zm-6.6 6.9h24.1v20c0 2.2-1.8 4-4 4h-16.1c-2.2 0-4-1.8-4-4v-20zm5 5v14c0 .5.5 1 1 1 .6 0 1-.5 1-1v-14c0-.5-.4-1-1-1-.4 0-1 .5-1 1zm6 0v14c0 .5.5 1 1 1 .6 0 1.1-.5 1.1-1v-14c0-.5-.5-1-1.1-1-.4 0-1 .5-1 1zm6.1 0v14c0 .5.5 1 1 1s1-.5 1-1v-14c0-.5-.5-1-1-1s-1 .5-1 1z"></Path>
        </Svg>
    );
}

export default Trash;
