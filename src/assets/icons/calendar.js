import React from "react";
import Svg, { Path } from "react-native-svg";

const Calendar = (props) => {
    return (
        <Svg viewBox="0 0 32 32" width={props.size} height={props.size}>
            <Path fill={props.color} d="M8 2a1.999 1.999 0 114 0v2h8V2a1.999 1.999 0 114 0v2h3a3 3 0 013 3v3H2V7a3 3 0 013-3h3V2zm22 27a3 3 0 01-3 3H5a3 3 0 01-3-3V12h28v17z"></Path>
        </Svg>
    );
}

export default Calendar;
