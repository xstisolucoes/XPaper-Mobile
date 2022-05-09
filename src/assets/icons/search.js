import React from "react";
import Svg, { Path } from "react-native-svg";

const Search = (props) => {
    return (
        <Svg viewBox="0 0 32 32" width={props.size} height={props.size}>
            <Path fill={props.color} d="M31.7 30L23 21.4c1.9-2.3 3-5.2 3-8.3 0-7.2-5.8-13-13-13S0 5.8 0 13s5.8 13 13 13c3.2 0 6.1-1.1 8.3-3l8.6 8.6c.2.2.5.3.8.3.3 0 .6-.1.8-.3.6-.4.6-1.2.2-1.6zM2.4 13C2.4 7.2 7.2 2.4 13 2.4S23.7 7.2 23.7 13 18.9 23.7 13 23.7 2.4 18.9 2.4 13z"></Path>
        </Svg>
    );
}

export default Search;
