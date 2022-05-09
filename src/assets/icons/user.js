import React from "react";
import Svg, { Path } from "react-native-svg";

const User = (props) => {
    return (
        <Svg viewBox="0 0 32 32" width={props.size} height={props.size}>
            <Path fill={props.color} d="M16 15.3c-4.2 0-7.7-3.4-7.7-7.7S11.8 0 16 0s7.7 3.4 7.7 7.7-3.5 7.6-7.7 7.6zm0-13.5c-3.2 0-5.9 2.6-5.9 5.9s2.6 5.9 5.9 5.9 5.9-2.6 5.9-5.9-2.7-5.9-5.9-5.9zM22.8 32H9.2c-3 0-5.4-2.4-5.4-5.4v-.9c0-5 4-9 9-9h6.3c5 0 9 4 9 9v.9c.1 3-2.4 5.4-5.3 5.4zm-10-13.5c-4 0-7.2 3.2-7.2 7.2v.9c0 2 1.6 3.6 3.6 3.6h13.5c2 0 3.6-1.6 3.6-3.6v-.9c0-4-3.2-7.2-7.2-7.2h-6.3z"></Path>
        </Svg>
    );
}

export default User;
