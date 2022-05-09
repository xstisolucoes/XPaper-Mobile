import React from "react";
import Svg, { G, Path } from "react-native-svg";

const Dark = (props) => {
    return (
        <Svg viewBox="-61 385 24 24" width={props.size} height={props.size}>
            <G fill={props.color}>
                <Path d="M-61 402.8c2 1.2 4.3 1.9 6.8 1.9 7.2 0 13-5.8 13-13 0-2.5-.7-4.8-1.9-6.8 3.7 2.3 6.2 6.4 6.2 11 0 7.2-5.8 13-13 13-4.7.1-8.8-2.4-11.1-6.1z"></Path>
                <Path d="M-56.8 392.7c2 0 3.5-1.6 3.5-3.5 0 2 1.6 3.5 3.5 3.5-2 0-3.5 1.6-3.5 3.5 0-1.9-1.5-3.5-3.5-3.5z"></Path>
                <Path d="M-50.3 397.3c1 0 1.8-.8 1.8-1.8 0 1 .8 1.8 1.8 1.8-1 0-1.8.8-1.8 1.8 0-1-.8-1.8-1.8-1.8z"></Path>
                <Path d="M-57.1 397.3c.4 0 .8-.4.8-.8 0 .4.4.8.8.8-.4 0-.8.4-.8.8 0-.5-.4-.8-.8-.8z"></Path>
            </G>
        </Svg>
    );
}

export default Dark;
