import React from "react";
import Svg, { Path } from "react-native-svg";

const Hearth = (props) => {
    return (
        <Svg viewBox="0 0 32 32" width={props.size} height={props.size}>
            <Path fill={props.color} d="M16 30.17a1 1 0 01-.58-.17c-.52-.35-12.84-8.62-15-15.14C-.86 11 .93 6.05 4.48 3.51 7.85 1.09 12 1.29 16 4c4-2.74 8.15-2.94 11.52-.52 3.55 2.54 5.34 7.53 4.07 11.35C29.42 21.38 17.1 29.65 16.58 30a1 1 0 01-.58.17zM9.61 3.91A6.61 6.61 0 005.7 5.2c-2.81 2-4.3 6.05-3.31 9 1.7 5.11 11.16 12 13.61 13.67 2.45-1.71 11.91-8.56 13.61-13.67 1-2.95-.5-7-3.31-9s-6.23-1.67-9.67 1a1 1 0 01-1.26 0 9.66 9.66 0 00-5.76-2.29z"></Path>
        </Svg>
    );
}

export default Hearth;