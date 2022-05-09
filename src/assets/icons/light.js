import React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";

const Light = (props) => {
    return (
        <Svg viewBox="-61 385 24 24" width={props.size} height={props.size}>
            <Path d="M-61 385H-37V409H-61z"></Path>
            <G fill={props.color}>
                <Circle cx="-49" cy="397" r="6.6"></Circle>
                <Path d="M-49 385L-50.2 387.9 -47.8 387.9z"></Path>
                <Path d="M-49 409L-47.8 406.1 -50.2 406.1z"></Path>
                <Path d="M-37 397L-39.9 395.8 -39.9 398.2z"></Path>
                <Path d="M-61 397L-58.1 398.2 -58.1 395.8z"></Path>
                <Path d="M-55 386.6L-54.6 389.7 -52.5 388.5z"></Path>
                <Path d="M-43 407.4L-43.4 404.3 -45.5 405.5z"></Path>
                <Path d="M-38.6 391L-41.7 391.4 -40.5 393.5z"></Path>
                <Path d="M-59.4 403L-56.3 402.6 -57.5 400.5z"></Path>
                <Path d="M-59.4 391L-57.5 393.5 -56.3 391.4z"></Path>
                <Path d="M-38.6 403L-40.5 400.5 -41.7 402.6z"></Path>
                <Path d="M-43 386.6L-45.5 388.5 -43.4 389.7z"></Path>
                <Path d="M-55 407.4L-52.5 405.5 -54.6 404.3z"></Path>
            </G>
        </Svg>
    );
}

export default Light;
