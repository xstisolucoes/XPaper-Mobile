import React from "react";
import Svg, { G, Rect } from "react-native-svg";

const Home = (props) => {
    return (
        <Svg viewBox="0 0 32 32" width={props.size} height={props.size}>
            <G fill={props.color}>
                <Rect width="13.06" height="13.06" rx="3"></Rect>
                <Rect width="13.06" height="13.06" x="18.94" rx="3"></Rect>
                <Rect width="13.06" height="13.06" y="18.94" rx="3"></Rect>
                <Rect width="13.06" height="13.06" x="18.94" y="18.94" rx="3"></Rect>
            </G>
        </Svg>
    );
}

export default Home;
